import Image from 'next/image'
import { Product } from '@/models/interfaces'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Props {
  product: Product
  isCart?: boolean
  onCartChange?: (product: Product) => void
}

export default function ProdutoCard({ product, isCart = false, onCartChange }: Props) {
  const imageUrl = `https://deisishop.pythonanywhere.com${product.image}`

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center bg-white">
      <div className="w-40 h-40 relative mb-4">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-contain rounded"
        />
      </div>
      <h2 className="font-bold text-lg text-center mb-1">{product.title}</h2>
      <p className="text-gray-700 font-semibold mb-3">{product.price} €</p>

      {/* Botão +info */}
      <Link href={`/produtos/${product.id}`}>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-2 w-full">
          +info
        </Button>
      </Link>

      {/* Botão de carrinho */}
      {isCart ? (
        <Button
          onClick={() => onCartChange && onCartChange(product)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
        >
          Remover do carrinho
        </Button>
      ) : (
        <Button
          onClick={() => onCartChange && onCartChange(product)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          Adicionar ao carrinho
        </Button>
      )}
    </div>
  )
}
