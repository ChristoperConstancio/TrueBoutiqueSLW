import React, { useEffect, useState } from 'react'
import {  updateDoc, deleteDoc, collection, getDocs, doc } from "firebase/firestore";
import { ref, deleteObject} from "firebase/storage"
import { db, storage } from '../firebase-config';
import { loadDocument } from "../CustomHooks/useProvider.js";

export default function Stock() {



    useEffect(() => {

        const fetchData = async () => {
            try {
                const stock = await loadDocument(); // Haz algo con el array de stock obtenido
                setProducts(stock)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        const updatePrices = async () => {
            // Obtener una referencia a la colección "Stack" en Firestore
            const querySnapshot = await getDocs(collection(db, "Stack"));
        
            // Iterar sobre cada documento en la colección
            querySnapshot.forEach(async (docu) => {
                // Obtener el documento y los datos del producto
                const productData = docu.data();
        
                // Verificar si el precio del producto es igual a 650
                if (productData.name.substring(0,11) == 'Rompeviento') {
                    const productRef = doc(db, "Stack", docu.id);
                    updateDoc(productRef, {name : 'Rompeviento'})
                    console.log(productData.name.substring(0,9) )
                }
            });
        };
        // updatePrices();
        fetchData();

    }, [])
    const [alert, setalert] = useState(false)
    //Productos que se mostraran vienen del firebase
    const [products, setProducts] = useState([]);
    //Estado auxiliar para agregarlos


    const handleNameChange = (id, value) => {
        const newProducts = [...products];
        newProducts[id].name = value;
        setProducts(newProducts);
        saveProduct(id);
    };

    const handleGenre = (id, value) => {
        const newProducts = [...products];
        newProducts[id].genre = value;
        setProducts(newProducts);
        saveProduct(id);
    };

    const handleSizeChange = (id, value) => {
        const newProducts = [...products];
        newProducts[id].size = value;
        setProducts(newProducts);
        saveProduct(id);
    };

    const handlePriceChange = (id, value) => {
        const newProducts = [...products];
        newProducts[id].price = value;
        setProducts(newProducts);
        saveProduct(id);
    };
    const handleStateChanged = (id, value) => {
        const newProducts = [...products];
        newProducts[id].state = value;
        setProducts(newProducts);
        saveProduct(id);
    };

    const saveProduct = async (index) => {
        const productRef = doc(db, "Stack", products[index].id);
        const updatedProduct = {
            name: products[index].name,
            color: products[index].color,
            genre: products[index].genre,
            size: products[index].size,
            price: products[index].price,
            state: products[index].state
        };
        await updateDoc(productRef, updatedProduct);
    }
    const eliminar = (index, imageUrl) => {
        // Obtener la referencia del documento que se desea eliminar
        const docRef = doc(db, "Stack", index);
        const newProducts = products.filter((articulo) => articulo.imageUrl !== imageUrl);
        setProducts(newProducts)
        // Eliminar el documento
        deleteDoc(docRef)
            .then(() => {
                

            })
            .catch((error) => {
                console.error("Error al eliminar el documento: ", error);
            });
        imageUrl = imageUrl + ".jpg";
        const imageRef = ref(storage, imageUrl);
        // Borra el objeto de Firebase Storage
        deleteObject(imageRef)
            .then(() => {
                
            })
            .catch((error) => {
                console.error('Error al eliminar la imagen:', error);
            });
    }


    return (
        <>
            <div className="   sm:grid-cols-4 grid">
                {products.map((product, index) => (
                    <div key={index} className="w-full p-2 px-5">
                        <label htmlFor={`name-${index}`} className="text-gray-700 font-medium block mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id={`name-${index}`}
                            className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={`${product.name} ${product.brand}`}
                            onChange={(e) => handleNameChange(index, e.target.value)}
                        />
                        <label htmlFor={`size-${index}`} className="text-gray-700 font-medium block mb-1">
                            Color
                        </label>
                        <select
                            id={`size-${index}`}
                            className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={product.color}
                            onChange={(e) => handleSizeChange(index, e.target.value)}
                        >
                            <option value="">Selecciona el color</option>
                            <option value="rojo">Rojo</option>
                            <option value="azul">Azul</option>
                            <option value="blanco">Blanco</option>
                            <option value="negro">Negro</option>
                            <option value="amarillo">Amarillo</option>
                            <option value="rosa">Rosa</option>
                            <option value="naranja">Naranja</option>
                            <option value="cafe">Marron</option>

                        </select>
                        <label htmlFor={`genre-${index}`} className="text-gray-700 font-medium block mb-1">
                            Genero
                        </label>
                        <select
                            id={`genre-${index}`}
                            className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={product.genre}
                            onChange={(e) => handleGenre(index, e.target.value)}
                        >
                            <option value="">Selecciona el genero </option>
                            <option value="hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                        </select>

                        <label htmlFor={`size-${index}`} className="text-gray-700 font-medium block mb-1">
                            Talla
                        </label>
                        <select
                            id={`size-${index}`}
                            className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={product.size}
                            onChange={(e) => handleSizeChange(index, e.target.value)}
                        >
                            <option value="">Selecciona la Talla</option>
                            <option value="chica">Chica</option>
                            <option value="mediana">Mediana</option>
                            <option value="grande">Grande</option>
                            <option value="extragrande">XL</option>


                        </select>

                        <label htmlFor={`price-${index}`} className="text-gray-700 font-medium block mb-1">
                            Precio
                        </label>
                        <input
                            type="number"
                            id={`price-${index}`}
                            className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={product.price}
                            onChange={(e) => handlePriceChange(index, e.target.value)}
                        />
                        <label htmlFor={`size-${index}`} className="text-gray-700 font-medium block mb-1">
                            Estado
                        </label>
                        <select
                            id={`state-${index}`}
                            className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={product.state}
                            onChange={(e) => handleStateChanged(index, e.target.value)}
                        >
                            <option value="">Selecciona el estado</option>
                            <option value="vendida">Vendida</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="disponible">Disponible</option>
                            <option value="oferta">Oferta</option>



                        </select>
                        <div className='justify-center flex'>
                            <img src={`${product.imageUrl}`} className=' h-62 w-44 py-5 rounded-lg' />
                        </div>
                        <div className=' w-24 mx-auto space-y-2 '>
                            <button
                                className='bg-red-500 text-white font-bold w-full rounded-lg'
                                onClick={() => eliminar(product.id, product.imageUrl)}
                            >
                                Eliminar
                            </button>
                            {alert &&
                                <div className=" text-red-500 p-4 rounded-md py-2">
                                    Eliminado
                                </div>
                            }
                        </div>

                    </div>


                ))}

            </div>


        </>
    )
}
