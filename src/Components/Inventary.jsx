import React, { useState, useEffect } from "react";
import { loadDocument } from "../CustomHooks/useProvider.js";
import { useNavigate } from 'react-router-dom'; // Asumiendo que estás utilizando react-router-dom para manejar la navegación
import filterProducts from "../CustomHooks/filterProducts.js";
import { ɵɵdeferPrefetchOnImmediate } from "@angular/core";
export default function Inventary() {

  const [prod, setProd] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    genre: '',
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
      genre: '',
      price: '',
      size: '',
      color: '',
    })
  }

  const filteredShirts = prod.filter(shirt => {
    return (
      (filters.genre === '' || shirt.genre === filters.genre) &&
      (filters.size === '' || shirt.size === filters.size)
      && (filters.color === '' || shirt.color === filters.color)
    );
  });

  const redirectArticle = (obj) => {
    const object = JSON.stringify(obj);
    localStorage.setItem('object', object)
    navigate(`/Article/${obj.name}`);
  }
  const calculateInventary = () => {
    try {
      if (!prod) {
        console.error('No se han cargado los datos del inventario.');
        return;
      }
  
      let dinero = 0;
      prod.forEach(item => {
        const itemPrice = parseInt(item.price);
  
        if (isNaN(itemPrice)) {
          console.error(`Precio no válido para el artículo: ${item.name}`);
        } else {
          dinero += itemPrice;
        }
      });
  
      console.log('Precio total de todos los artículos:', dinero);
    } catch (error) {
      console.error('Error al calcular el inventario: ', error);
    }
  }
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
          name="genre"
          className="bg-gray-600 text-white rounded-lg h-8 "
          onChange={handleFilterChange}
          value={filters.genre}>
          <option value="">Genero </option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>


        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 mx-4 gap-4  py-6">
        {filteredShirts.map((obj) => (
          obj.state !== 'vendida' ? (
            <button
              onClick={() => redirectArticle(obj)}
              key={obj.id}
            >
              <div className="" key={obj.id}>
                <img src={obj.imageUrl} alt="ropa-caballero" className="w-full h-52 sm:h-72 rounded-t-lg object-cover" key={`${obj.id}`} />
                <div className="w-full py-2 bg-gray-400 rounded-b-xl bg-opacity-30 px-2 h-40 space-y-4">
                  <h2 className="text-xl font-bold md:text-lg font-Thin">{obj.name.length > 20 ? `${obj.name.slice(0, 20)}...` : `${obj.name} ${obj.brand}${''.repeat(20 - obj.name.length)}`}</h2>
                  <p className="text-gray-600 text-sm font-medium">{obj.size.charAt(0).toUpperCase() + obj.size.slice(1)}</p>
                  <p className="text-2xl font-Geologica text-slim">${obj.price}</p>
                </div>
              </div>
            </button>
          ) : null
        ))}

      </div>


    </>
  );
}

