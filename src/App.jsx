import { useRef, useState } from 'react'
import Header from './Components/Header';
import Inventary from './Components/Inventary';
import Stock from './Components/Stock';
import AddProduct from './Components/AddProduct';
import Article from './Components/Article';
// import { ref } from "firebase/storage"
import { Route } from 'react-router-dom';


function App() {
  
  return (
    <>
      <Header /> 
      {/* <Stock/>   */}
      {/* <Inventary/> */}
      <Article/>
      {/* <AddProduct/> */}
  
    </>
  )
}

export default App
