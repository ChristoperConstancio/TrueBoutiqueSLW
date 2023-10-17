import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useHistory

function Login() {
    
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate(); // Inicializa useHistory

    const logear = (e) => {
        e.preventDefault();

        if (user === 'admin' && password === 'admin') {
            history('/add-product'); // Reemplaza '/inicio' con la ruta a la que deseas redirigir
        } else {
            alert('Error: Correo o contraseña incorrectos');
          }
    }
    return (
        <div className="min-h-screen flex justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Usuario</label>
                        <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" 
                        onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Contraseña</label>
                        <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded"
                          onChange={(e) => setPassword(e.target.value)}
                          />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                        onClick={logear}
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
