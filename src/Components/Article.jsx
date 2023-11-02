import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Article() {
    const [data, setData] = useState()
    useEffect(() => {
        const loadObject = async () => {
            const object = await localStorage.getItem('object');
            const obj = JSON.parse(object);
            setData(obj)
            console.log(obj)
            console.log(data)

        }

        loadObject();

    }, [])

    return (
        <div className=' sm:flex w-full space-x-5'>
            <div className='px-5 py-5 space-y-8 sm:flex sm:space-x-5 '>
                <div className=''>
                    {data ?
                        <img src={data.imageUrl} className=' rounded-xl h-80 sm:h-44 ' />
                        :
                        "Sin foto"}
                </div>
                {data ?
                    <div className='bg-gray-200 h-20 w-full'>
                        <p className='font-bold '>{data.name}</p>
                        <h1> <strong>Precio : </strong> {data.price} </h1>
                        <h1> <strong>Marca : </strong> {data.brand} </h1>
                        <h1> <strong>Talla : </strong> {data.size} </h1>


                    </div>
                    :
                    "Loading"}

            </div>
            <div className='flex justify-center items-center pt-6 pb-6'>
                <a href="https://api.whatsapp.com/send?phone=8441307540&text=Hola,%20me%20gusto%20un%20articulo,%20me%20podrias%20dar%20informacion?">
                    <button className='border-2 border-green-600 rounded-lg px-3 py-2 text-white cursor-pointer bg-green-600 hover:bg-white hover:text-green-600'>
                        Pedir Informacion
                    </button>
                </a>
            </div>

        </div>
    )
}
