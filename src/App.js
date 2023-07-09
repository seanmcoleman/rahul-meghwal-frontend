import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.js'
import { useState } from "react";
import './App.css';
import Content from './components/Content';

function App() {

const [showCart, setShowCart] = useState(false);
const [searchString, setSearchString] = useState('');

  
  return (
      <>
        <Header changeSearchString = {setSearchString} setShowCart={setShowCart}/>
        <Content searchString={searchString} showCart={showCart} setShowCart={setShowCart}/>
        <Routes>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </>
   );
}

export default App;
