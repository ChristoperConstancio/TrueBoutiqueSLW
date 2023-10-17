import React, { useState } from 'react'
import { db, storage } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
export default function AddProduct() {

    const [alert, setalert] = useState(false)
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const color = document.getElementById('color').value;
        const quantity = document.getElementById('quantity').value;
        const size = document.getElementById('size').value;
        const price = document.getElementById('price').value;
        const state = document.getElementById('state').value;
        const imageFiles = document.getElementById('image').files;
        const brand = document.getElementById('brand').value;

        let imageUrl = [];
        for (let i = 0; i < imageFiles.length; i++) {
            const imageFile = imageFiles[i];
            const imageName = imageFile.name.split('.')[0]; // Obtén el nombre del archivo sin extensión

            // Sube la imagen a Firebase Storage
            const shirtImagesRef = ref(storage, `playeras/${imageName}.jpg`);
            await uploadBytes(shirtImagesRef, imageFile);

            imageUrl.push(await getDownloadURL(shirtImagesRef));

        }
        // Obtiene la URL de descarga de la imagen subida

        // Crea un nuevo documento en la colección "stock" de Firebase Firestore con los valores de los inputs y la URL de la imagen
        const stockRef = collection(db, 'Stack');
        await addDoc(stockRef, {
            name,
            color,
            quantity: parseInt(quantity),
            size,
            price: parseFloat(price),
            state,
            imageUrl,
            brand
        });
        // Limpia los valores de los inputs
        document.getElementById('name').value = '';
        document.getElementById('color').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('size').value = '';
        document.getElementById('price').value = '';
        document.getElementById('state').value = '';
        document.getElementById('image').value = '';
        document.getElementById('brand').value = '';

        showAlert();
    };

    const showAlert = () => {
        setalert(true);
        setTimeout(() => {
            setalert(false);
        }, 3000); // 5000 milisegundos = 5 segundos
    }

    return (
        <>
            <div className=" sm:w-1/3 md:w-1/4 p-2 mx-6">
                <Link to={"/stock"} >
                    <button className=' bg-amber-600 h-10 w-16 text-white rounded-lg '>
                        Editar
                    </button>
                </Link>
                <form onSubmit={handleFormSubmit}>
                    <label className="text-gray-700 font-medium block mb-1">
                        Nombre
                    </label>
                    <input
                        id='name'
                        type="text"
                        className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <label className="text-gray-700 font-medium block mb-1">
                        Color
                    </label>
                    <select
                        id='color'
                        className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                    <label className="text-gray-700 font-medium block mb-1">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        min={0}
                        max={10}
                        id='quantity'
                    />

                    <label className="text-gray-700 font-medium block mb-1">
                        Talla
                    </label>
                    <select
                        id='size'
                        className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Selecciona la Talla</option>
                        <option value="chica">Chica</option>
                        <option value="mediana">Mediana</option>
                        <option value="grande">Grande</option>

                    </select>
                    <label className="text-gray-700 font-medium block mb-1">
                        Marca
                    </label>
                    <select
                        id='brand'
                        className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Selecciona la Marca</option>
                        <option value="calvinklein">Calvin Klein</option>
                        <option value="guess">Guess</option>
                        <option value="nautica">Nautica</option>
                        <option value="tommy">Tommy Hilfiger</option>
                        <option value="penguin">Penguin</option>
                        <option value="karl">Karl Lagerfeld</option>
                        <option value="michael">Michael Kors</option>
                        <option value="ralph">Ralph Lauren</option>
                        <option value="lacoste">Lacoste</option>
                        <option value="nike">Adidas</option>
                        <option value="dkny">DKNY</option>
                        <option value="true">True Religion</option>
                        <option value="kenneth">Kenneth Cole</option>
                        <option value="columbia">Columbia</option>
                        <option value="psycho">Psycho Bunny</option>
                        <option value="north">North Face</option>
                        <option value="champion">Champion</option>
                        <option value="reebok">Reebok</option>
                        <option value="steve">Steve Madden</option>
                        <option value="puma">Puma</option>
                        <option value="american">American Eagle</option>
                    </select>
                    <label className="text-gray-700 font-medium block mb-1">
                        Precio
                    </label>
                    <input
                        id='price'
                        type="number"
                        className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <label className="text-gray-700 font-medium block mb-1">
                        Estado
                    </label>
                    <select
                        id='state'
                        className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Selecciona el estado</option>
                        <option value="vendida">Vendida</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="disponible">Disponible</option>

                    </select>
                    <input type="file" id='image' multiple />
                    <hr />
                    <div className="w-full sm:w-full p-2 space-x-2 flex items-center">
                        {alert &&
                            <div className="bg-green-500 text-white p-4 rounded-md py-2">
                                Guardado!
                            </div>
                        }
                        <button
                            type='submit'
                            className='h-10  bg-green-500 hover:bg-green-800 text-white font-bold px-4 rounded'
                        >
                            Guardar
                        </button>
                    </div>
                    <div>

                    </div>

                </form>

            </div>


        </>
    )
}
