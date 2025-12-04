'use client'
import { useState } from 'react'

export default function Tarefas() {

  // estados
  const [tarefas, setTarefas] = useState<string[]>([])
  const [novaTarefa, setNovaTarefa] = useState<string>("")

  // event handlers
  function adicionarTarefa() {
    setTarefas([...tarefas, novaTarefa])
    setNovaTarefa("")
  }

  // renderização
  return (
    <section className="bg-blue-300 p-2 pb-4 mt-6 rounded-xl">

      <h2>Tarefas</h2>

      <input
        type="text"
        placeholder="Escreva algo..."
        className="bg-green-500 hover:bg-green-600 active:bg-green-700 hover:pointer text-white font-bold py-2 px-4 m-2 border border-green-700 rounded"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
      />
      <p>Texto digitado: {novaTarefa}</p>

      <button
        className="bg-green-500 hover:bg-green-600 active:bg-green-700 hover:pointer text-white font-bold py-2 px-4 m-2 border border-green-700 rounded"
        onClick={adicionarTarefa}
      >
        Adicionar
      </button>

      <p>Tarefas:</p>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>{tarefa}</li>
        ))}
      </ul>
    </section>
  )
}
