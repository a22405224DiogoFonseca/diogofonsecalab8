import React from "react";
import Image from "next/image";


interface TecnologiaProps {
    title: string
    image: string
}

export default function Tecnologia({title, image}: TecnologiaProps){
  
    return(
      <div className="bg-yellow-500 p-2 m-2 rounded-xl">
        <div className="w-16 h-16 relative rounded overflow-hidden">
                <Image 
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
        </div>
        <h2 >{title}</h2> 
        
      </div>
       
    )
}
