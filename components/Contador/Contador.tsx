'use client'
import react, { useEffect } from 'react';
import { useState } from 'react';


export default function Contador() {
    
    const [count, setCount] = useState(() => {
        const countStored = localStorage.getItem('count')
        return countStored ? parseInt(countStored) : 0
    })

    useEffect( () => {
        localStorage.setItem('count', `${count}`);
    }, [count]);


    const [historico, setHistorico] = useState(() => {
        const historicoStored = localStorage.getItem('historico')
        return historicoStored ? JSON.parse(historicoStored) : []
    });

    useEffect( () => {
        localStorage.setItem('historico', JSON.stringify(historico));
    }, [historico]);


    useEffect(() => {
	 document.title = `${count}`;
    }, [count]);
    
    
    
    return (
       <section className='bg-blue-300 p-2 pb-4 mt-6 rounded-xl'>

        <h2>Contador</h2>
        <p>Valor atual: {count}</p>

        <button
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 hover:pointer text-white font-bold py-2 px-4 mx-2 border border-green-700 rounded"
                onClick={() => { 
                    const novo = count < 10 ? count + 1 : 10
                    setCount(novo);
                    if (count < 10){
                        setHistorico([...historico, novo]);
                    }
                    
                }}
            >
                Aumentar
                
            </button>

            <button
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 hover:pointer text-white font-bold py-2 px-4 mx-2 border border-green-700 rounded"
                onClick={() => {
                    const novo = count > 0 ? count - 1 : 0;
                    setCount(novo);
                    if (count > 0){
                        setHistorico([...historico, novo]);
                    }
                }}
            >
                Diminuir
            </button>


            <button
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 hover:pointer text-white font-bold py-2 px-4 mx-2 border border-green-700 rounded"
                onClick={() => {
                    setCount(0);
                    setHistorico([...historico, 0]);
                }}
            >
                Reset
            </button>

            <p>Lista de numeros</p>
            <ul>
                {historico.map((num: number, index: number) => (
                    <li key={index}>{num}</li>
                ))}
            </ul>


       </section> 
    )
}