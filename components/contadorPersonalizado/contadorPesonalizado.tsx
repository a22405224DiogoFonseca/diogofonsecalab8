'use client'

import { useEffect, useState } from "react";

interface ContadorPersonalizadoProps {
    title: string;
}
export default function ContadorPersonalizado({title}: ContadorPersonalizadoProps) {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem(title);
        if (stored) setLikes(parseInt(stored));
    }, [title]);


    useEffect(() => {
        localStorage.setItem(title, String(likes));
    }, [likes, title]);

    function incrementar() {
        setLikes(likes + 1);
    }

    return (
        <button 
            onClick={incrementar}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2"
        >
            ❤️{likes}

        </button>
    

    );
}    
    