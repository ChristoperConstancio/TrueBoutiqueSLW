import React, { useState, useEffect } from "react";
import { loadDocument } from "../CustomHooks/useProvider.js";

export default function Inventary() {

  const [prod, setProd] = useState([])
  useEffect(() => {
    
      const fetchData = async () => {
        try {
          const stock = await loadDocument();
          console.log(stock); // Haz algo con el array de stock obtenido
          setProd(stock)
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      fetchData();
    

  }, [])

  return (

    <div className="grid grid-cols-2 sm:grid-cols-5 mx-4 gap-4 max-w-5xl  py-6">

      {prod.map((obj) => (
        <div className="flex-row" key={obj.id}>
          
            <img src={obj.imageUrl} alt="ropa-caballero" className=" h-64 rounded-lg " key={`${obj.id}`} />
         
          <div className="w-full" >
            <h2 className="text-xl font-bold mb-4">{obj.name}</h2>
            <p className="text-gray-600 text-sm font-medium mb-2" >Talla: {obj.size}</p>
            <p className="text-gray-600 text-sm font-medium mb-2">Precio</p>
            <p className="text-2xl font-sans font-medium text-slim">${obj.price}</p>
          </div>
        </div>
        

      ))}
       

    </div>
  );
}

