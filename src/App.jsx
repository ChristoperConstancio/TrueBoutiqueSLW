import { useRef, useState } from 'react'
import Header from './Components/Header';
import Inventary from './Components/Inventary';
import Stock from './Components/Stock';
import AddProduct from './Components/AddProduct';
import Article from './Components/Article';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';

function App() {

  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Inventary/>} />
        <Route path="/stock" element={<Stock/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path='/Article/*' element={<Article/>}/>
      </Routes>
    </Router>

  )
}

export default App
