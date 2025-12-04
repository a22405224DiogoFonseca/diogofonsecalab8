import Tecnologia from "@/components/Tecnologia/Tecnologia";
import tecnologias from "../data/tecnologias.json";
import Link from "next/link";
import ContadorPersonalizado from "@/components/contadorPersonalizado/contadorPesonalizado";



export default function TecnologiasPage() {
    return (
        <>
            <h2>Tecnologias Exploradas</h2>

            {tecnologias.map((tecnologia, index) => (
                <div 
                    key={index} 
                    className="border p-4 my-4 rounded-xl shadow"
                >
                    <Link href={`/tecnologias/${index}`}>
                        <Tecnologia 
                            title={tecnologia.title}
                            image={tecnologia.image}
                        />
                    </Link>

                    <ContadorPersonalizado title={tecnologia.title} />
                </div>
                
            ))}
        </>
    );
}
