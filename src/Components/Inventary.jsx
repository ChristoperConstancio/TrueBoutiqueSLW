import React, { useState, useEffect } from "react";
import { loadDocument } from "../CustomHooks/useProvider.js";
import { Link } from 'react-router-dom'; // Asumiendo que estás utilizando react-router-dom para manejar la navegación
import filterProducts from "../CustomHooks/filterProducts.js";
export default function Inventary() {

  const [prod, setProd] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    price: '',
    size: '',
    color: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,

    }));
  }

  const resetFilterChange = () => {
    setFilters({
      brand: '',
      price: '',
      size: '',
      color: '',
    })
  }

  const filteredShirts = prod.filter(shirt => {
    return (
      (filters.brand === '' || shirt.brand === filters.brand) &&
      (filters.brand === '' || shirt.brand === shirt.brand) &&
      (filters.size === '' || shirt.size === filters.size)
      && (filters.color === '' || shirt.color === filters.color)
    );
  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        const stock = await loadDocument();
        setProd(stock);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();

  }, [])


  return (
    < >

      <div className="my-3 ml-3 flex gap-x-2 ">

        <select
          name="size"
          className="bg-gray-600 text-white rounded-lg  h-8 not-italic"
          onChange={handleFilterChange}
          value={filters.size}>
          <option value="">Talla </option>
          <option value="chica">Chica</option>
          <option value="mediana">Mediana</option>
          <option value="grande">Grande</option>
          <option value="extragrande">XL</option>

        </select>

        <select
          name="color"
          className="bg-gray-600 text-white rounded-lg  h-8"
          onChange={handleFilterChange}
          value={filters.color}>
          <option value="">Color </option>
          <option value="negro" >Negro</option>
          <option value="azul" >Azul</option>
          <option value="blanco" >Blanco</option>
          <option value="rojo" >Rojo</option>
        </select>
        <select
          name="brand"
          className="bg-gray-600 text-white rounded-lg h-8 "
          onChange={handleFilterChange}
          value={filters.brand}>
          <option value="">Marca </option>
          <option value="calvinklein">Calvin Klein</option>
          <option value="guess">Guess</option>
          <option value="nautica">Nautica</option>
          <option value="tommy">Tommy H</option>
          <option value="penguin">Penguin</option>
          <option value="karl">Karl Lage</option>
          <option value="michael">Michael Kors</option>
          <option value="lacoste">Lacoste</option>

        </select>
      </div>
      <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 mx-4 gap-4 max-w-5xl   py-6">
            {filteredShirts.map((obj) => (
              obj.state !== 'vendida' ? (
                <div className="" key={obj.id}>
                  <img src={obj.imageUrl} alt="ropa-caballero" className="w-full h-52 sm:h-52 rounded-t-lg object-cover" key={`${obj.id}`} />
                  <div className="w-full py-2 bg-gray-400 rounded-b-xl bg-opacity-30 px-2 h-40 space-y-4">
                    <h2 className="text-xl font-bold md:text-lg font-Thin">{obj.name.length > 20 ? `${obj.name.slice(0, 20)}...` : `${obj.name}${''.repeat(20 - obj.name.length)}`}</h2>
                    <p className="text-gray-600 text-sm font-medium">{obj.size.charAt(0).toUpperCase() + obj.size.slice(1)}</p>
                    <p className="text-2xl font-sans font-medium text-slim">${obj.price}</p>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        
      </div >

    </>
  );
}

