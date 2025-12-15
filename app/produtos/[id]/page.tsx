'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import ProdutoDetalhe from '@/components/ProdutoDetalhe/ProdutoDetalhe';
import { Product } from '@/models/interfaces';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProdutoPage() {
  const params = useParams();
  const { id } = params;

  const { data, error, isLoading } = useSWR<Product>(
    `https://deisishop.pythonanywhere.com/products/${id}`,
    fetcher
  );

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro ao carregar o produto.</p>;
  if (!data) return <p>Produto não encontrado.</p>;

  return <ProdutoDetalhe produto={data} />;
}