'use client';

import { Product } from '@/models/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ProdutoDetalheProps {
  produto: Product;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
  const imageUrl = produto.image.startsWith('http')
    ? produto.image
    : `https://deisishop.pythonanywhere.com${produto.image}`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Botão para voltar à lista */}
      <div className="mb-6">
        <Link href="/produtos">
          <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200">
            Voltar à lista
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagem do produto */}
        <div className="flex-shrink-0 w-full md:w-1/2 border rounded-lg p-2 bg-gray-50 shadow-inner">
          <Image
            src={imageUrl}
            alt={produto.title}
            width={400}
            height={400}
            className="object-contain rounded"
          />
        </div>

        {/* Detalhes do produto */}
        <div className="flex-1 flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{produto.title}</h1>
          <p className="mb-4 text-gray-700 leading-relaxed">{produto.description}</p>
          <p className="mb-2 font-semibold text-gray-800">Categoria: {produto.category}</p>
          <p className="mb-2 font-bold text-lg text-green-600">Preço: ${produto.price}</p>
          <p className="text-gray-600">Rating: {produto.rating.rate} ({produto.rating.count} avaliações)</p>
        </div>
      </div>
    </div>
  );
}
