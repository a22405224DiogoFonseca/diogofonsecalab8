'use client'
import { useEffect } from "react";
import { useState } from "react";

export default function Relogio() {
    const [hora, setHora] = useState("");

    useEffect(() => {
        setHora(new Date().toLocaleTimeString());
        const id = setInterval(() => {
            setHora(new Date().toLocaleTimeString());
        }, 1000);
    return () => clearInterval(id);
    }, []);
    return <span>{hora}</span>;
}
