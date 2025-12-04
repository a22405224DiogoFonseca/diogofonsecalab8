import Link from "next/link"
import Projeto from "../Projeto/Projeto";

export default function DescricaoProjetos() {
    return (
        <>
            <h2>Projetos</h2>
            <p>Já fiz muitos projetos em HTML, JavaScript e CSS</p>
            
            <p>Estão disponíveis no meu GitHub &nbsp; 
                <Link 
                    href="https://github.com/a22405224DiogoFonseca" 
                    className= "font-bold underline" 
                    target= "_blank"
                >
                    website
                </Link>
            </p> 

            <Projeto
                nome = "loja"
                url = "https://a22405224diogofonseca.github.io/"
            />

            
        </>
    );
}
