import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import whatsapp from '../imgs/whatsapp.png'
export default function Article() {
    const [data, setData] = useState()
    useEffect(() => {
        const loadObject = async () => {
            const object = await localStorage.getItem('object');
            const obj = JSON.parse(object);

            setData(obj)
        }
        loadObject();
    }, [])

    return (
        <div className=' sm:flex w-full space-x-5'>
            <div className='px-5 py-5 space-y-8 sm:flex sm:space-x-5 '>
                <div className=' justify-center flex items-center'>
                    {data ?
                        <img src={data.imageUrl} className=' rounded-xl h-96 sm:w-80 w-80' />
                        :
                        "Sin foto"}
                </div>
                {data ?
                    <div className=' h-20 w-full sm:hidden'>
                        <p className='font-Geologica text-2xl'>{data.name}</p>
                        <h1 className='font-Geologica text-2xl'> <strong>Precio : </strong> {data.price} </h1>
                        <h1 className='font-Geologica text-2xl'> <strong>Marca : </strong> {data.brand} </h1>
                        <h1 className='font-Geologica text-2xl'> <strong>Talla : </strong> {data.size} </h1>


                    </div>
                    :
                    "Loading"}

            </div>
            <div className='flex justify-center items-center pt-6 pb-6 sm:block'>
                <div className=' h-20 w-full hidden sm:block sm:h-64'>
                    {data ?
                        <div className=' h-20 w-full hidden sm:block'>
                            <p className='font-Geologica text-2xl'>{data.name}</p>
                            <h1 className='font-Geologica text-2xl'> <strong>Precio : </strong>  ${data.price} </h1>
                            <h1 className='font-Geologica text-2xl'> <strong>Marca : </strong> {data.brand} </h1>
                            <h1 className='font-Geologica text-2xl'> <strong>Talla : </strong> {data.size} </h1>


                        </div>
                        :
                        "Loading"}


                </div>
                <a href="https://api.whatsapp.com/send?phone=8441307540&text=Hola,%20me%20gusto%20un%20articulo,%20me%20podrias%20dar%20informacion%20sobre">
                    <button className='border-2 border-green-600 rounded-lg px-3 py-2 text-white cursor-pointer bg-green-600 hover:bg-white hover:text-green-600 flex '>
                    <img src={whatsapp} alt="" className='h-5 w-5 mr-3' />
                        Pedir Informacion
                    </button>
                </a>
            </div>

        </div>
    )
}
