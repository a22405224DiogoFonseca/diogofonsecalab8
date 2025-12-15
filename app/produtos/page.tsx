'use client'

import useSWR from 'swr'
import { Product } from '@/models/interfaces'
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard'
import { useEffect, useState } from 'react'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Erro ao obter produtos')
  return res.json()
}

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(
    'https://deisishop.pythonanywhere.com/products/',
    fetcher
  )

  const [search, setSearch] = useState<string>("")
  const [filteredSearch, setFilteredSearch] = useState<Product[]>([])
  const [sortOption, setSortOption] = useState<string>("relevancia")
  const [cart, setCart] = useState<Product[]>([])
  const [isStudent, setIsStudent] = useState<boolean>(false)
  const [coupon, setCoupon] = useState<string>("")
  const [purchaseInfo, setPurchaseInfo] = useState<{ totalCost?: string, reference?: string } | null>(null)

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  // Atualizar localStorage sempre que o cart mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Filtrar e ordenar produtos
  useEffect(() => {
    if (data) {
      let filtered = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )

      if (sortOption !== "relevancia") {
        filtered.sort((a, b) => {
          switch (sortOption) {
            case 'name-asc':
              return a.title.localeCompare(b.title)
            case 'name-desc':
              return b.title.localeCompare(a.title)
            case 'price-asc':
              return Number(a.price) - Number(b.price)
            case 'price-desc':
              return Number(b.price) - Number(a.price)
            default:
              return 0
          }
        })
      }

      setFilteredSearch(filtered)
    }
  }, [search, data, sortOption])

  // Adicionar produto ao carrinho
  const handleAddToCart = (product: Product) => {
    if (!cart.find(p => p.id === product.id)) {
      setCart([...cart, product])
    }
  }

  // Remover produto do carrinho
  const handleRemoveFromCart = (product: Product) => {
    setCart(cart.filter(p => p.id !== product.id))
  }

  // Total do carrinho
  const total = cart.reduce((sum, p) => sum + Number(p.price), 0)

  // Função de compra conforme o enunciado
  const buy = () => {
    fetch("https://deisishop.pythonanywhere.com/buy/", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map(product => product.id),
        name: "",
        student: isStudent,
        coupon: coupon
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(response => {
        setCart([])
        setPurchaseInfo({
          totalCost: response.totalCost,
          reference: response.reference
        })
        console.log("Compra realizada:", response)
        alert("Compra efetuada com sucesso!")
      })
      .catch(() => {
        console.log("error ao comprar")
        alert("Erro ao realizar a compra")
      })
  }

  if (isLoading) return <p className="text-center mt-10 text-gray-500">A carregar...</p>
  if (error) return <p className="text-center mt-10 text-red-500">Erro ao carregar os produtos.</p>

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Produtos</h1>

      {/* Filtros */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="relevancia">Relevância</option>
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="price-asc">Preço (Crescente)</option>
          <option value="price-desc">Preço (Decrescente)</option>
        </select>
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {filteredSearch.map(product => (
          <ProdutoCard
            key={product.id}
            product={product}
            onCartChange={handleAddToCart}
          />
        ))}
      </div>

      {/* Carrinho */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Carrinho</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">O carrinho está vazio.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {cart.map(product => (
                <ProdutoCard
                  key={product.id}
                  product={product}
                  isCart
                  onCartChange={handleRemoveFromCart}
                />
              ))}
            </div>

            {/* Total e opções de compra */}
            <p className="text-right font-bold text-xl mb-4">Total: {total.toFixed(2)} €</p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              {/* Checkbox estudante */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isStudent}
                  onChange={e => setIsStudent(e.target.checked)}
                  className="w-5 h-5"
                />
                Estudante DEISI
              </label>

              {/* Cupão de desconto */}
              <input
                type="text"
                placeholder="Cupão de desconto"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-1/3"
              />
            </div>

            {/* Botão Comprar */}
            <button
              onClick={buy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded w-full md:w-auto transition"
            >
              Comprar
            </button>

            {/* Informações da compra */}
            {purchaseInfo && (
              <div className="mt-4 p-4 border border-green-400 rounded bg-green-50">
                <p>Total com descontos: <strong>{purchaseInfo.totalCost} €</strong></p>
                <p>Referência: <strong>{purchaseInfo.reference}</strong></p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
