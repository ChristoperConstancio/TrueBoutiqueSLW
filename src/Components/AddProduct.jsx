import React, { useState } from 'react'
import { db, storage } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import heic2any from 'heic2any';
export default function AddProduct() {

    const [alert, setalert] = useState(false)
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const color = document.getElementById('color').value;
        const genre = document.getElementById('genero').value;
        const size = document.getElementById('size').value;
        const price = document.getElementById('price').value;
        const imageFiles = document.getElementById('image').files;
        const brand = document.getElementById('brand').value;

        let imageUrl = [];
        for (let i = 0; i < imageFiles.length; i++) {
          const imageFile = imageFiles[i];
          const imageName = imageFile.name.split('.')[0]; // Obtén el nombre del archivo sin extensión
          console.log(imageFile.name)
          try {
            // Comprimir la imagen antes de subirla
            const compressedBlob = await compressImage(imageFile);
            const jpegBlob = await convertirHEICaJPEG(compressedBlob);

            // Sube la imagen comprimida a Firebase Storage
            const shirtImagesRef = ref(storage, `playeras/${imageName}.jpeg`);
            await uploadBytes(shirtImagesRef, jpegBlob);
      
            imageUrl.push(await getDownloadURL(shirtImagesRef));
          } catch (error) {
            console.error('Error al comprimir o subir la imagen:', error);
          }
        }
      
        // Obtiene la URL de descarga de la imagen subida
      
              // Crea un nuevo documento en la colección "stock" de Firebase Firestore con los valores de los inputs y la URL de la imagen
              const stockRef = collection(db, 'Stack');
              await addDoc(stockRef, {
                  name,
                  color,
                  genre,
                  size,
                  price: parseFloat(price),
                  state : 'disponible',
                  imageUrl,
                  brand
              });
              // Limpia los valores de los inputs
              document.getElementById('name').value = '';
              document.getElementById('color').value = '';
              document.getElementById('genero').value = '';
              document.getElementById('size').value = '';
              document.getElementById('price').value = '';
              document.getElementById('image').value = '';
              document.getElementById('brand').value = '';
      
              showAlert();
      };
      const convertirHEICaJPEG = async (heicBlob) => {
        try {
          // Convierte el blob HEIC a un blob JPEG
          const jpegBlob = await heic2any({ blob: heicBlob, toType: 'image/jpeg', quality: 0.8 });
          return jpegBlob;
        } catch (error) {
          console.error('Error al convertir HEIC a JPEG:', error);
          throw error;
        }
      };
      const compressImage = async (imageFile) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = async (event) => {
            const compressedBlob = await compressBlob(event.target.result);
            resolve(compressedBlob);
          };
      
          reader.readAsArrayBuffer(imageFile);
        });
      };
      
      const compressBlob = async (blob) => {
        // Aquí puedes usar Imagemin u otra biblioteca de compresión
        // por ejemplo, utilizando createImageBitmap y canvas para ajustar la calidad de la imagen.
        const img = new Image();
        img.src = URL.createObjectURL(new Blob([blob]));
      
        return new Promise((resolve) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
      
            // Ajusta la calidad de la imagen (puedes cambiar el valor)
            const quality = 0.5
      
            canvas.width = img.width;
            canvas.height = img.height;
      
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.toBlob((resultBlob) => {
              resolve(resultBlob);
            }, 'image/jpeg', quality);
          };
        });
      };
 
    const showAlert = () => {
        setalert(true);
        setTimeout(() => {
            setalert(false);
        }, 500); // 5000 milisegundos = 5 segundos
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
                        <option value="verde">Verde</option>
                        <option value="gris">Gris</option>
                        <option value="negro">Negro</option>
                        <option value="amarillo">Amarillo</option>
                        <option value="rosa">Rosa</option>
                        <option value="naranja">Naranja</option>
                        <option value="cafe">Marron</option>

                    </select>
                    <label className="text-gray-700 font-medium block mb-1">
                        Genero
                    </label>
                    <select
                        id='genero'
                        className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>

                    </select>

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
                        <option value="extragrande">XL</option>


                    </select>
                    <label className="text-gray-700 font-medium block mb-1">
                        Marca
                    </label>
                    <select
                        id='brand'
                        className="w-full border-gray-300 border rounded px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Selecciona la Marca</option>
                        <option value="Calvin Klein">Calvin Klein</option>
                        <option value="Guess">Guess</option>
                        <option value="Nautica">Nautica</option>
                        <option value="Tommy Hilfiger">Tommy Hilfiger</option>
                        <option value="Penguin">Penguin</option>
                        <option value="Karl">Karl Lagerfeld</option>
                        <option value="Michael Kors">Michael Kors</option>
                        <option value="Ralph Lauren">Ralph Lauren</option>
                        <option value="Lacoste">Lacoste</option>
                        <option value="Adidas">Adidas</option>
                        <option value="DKNY">DKNY</option>
                        <option value="True Religion">True Religion</option>
                        <option value="Kenneth Cole">Kenneth Cole</option>
                        <option value="columbia">Columbia</option>
                        <option value="Psycho Bunny">Psycho Bunny</option>
                        <option value="North Face">North Face</option>
                        <option value="Champion">Champion</option>
                        <option value="Reebok">Reebok</option>
                        <option value="Steve Madden">Steve Madden</option>
                        <option value="Puma">Puma</option>
                        <option value="American Eagle">American Eagle</option>
                        <option value="Magellan">Magellan</option>
                        <option value="Nike">Nike</option>

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
