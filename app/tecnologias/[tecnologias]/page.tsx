"use client"

import tecnologias from "../../data/tecnologias.json";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";


export default function TecnologiaPage() {
    const params = useParams();
    const id = Number(params.tecnologias);

     // Se não existir, mostra uma mensagem simples
    if (!tecnologias[id]) {
        return <h2>Tecnologia não encontrada</h2>;
    }

    return <>  
        <h2>{tecnologias[id].title}</h2>
        <p>{tecnologias[id].description}</p>
        
        <Image 
            src={tecnologias[id].image} 
            alt={tecnologias[id].title} 
            width={500} 
            height={300} 
        />
        
        <p>Rating: {tecnologias[id].rating} / 5</p>

        <Link 
                href="/tecnologias"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                ← Voltar
        </Link>
    </>
    
}