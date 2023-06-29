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
        {/* <ProductsView searchString={searchString}/> */}
        {/* <Content> */}
        <Content searchString={searchString} showCart={showCart} setShowCart={setShowCart}/>
        <Routes>
          {/* <Route exact path='/' element={< ProductsView searchString={this.searchString}/>}></Route> */}
          {/* <Route exact path='/' element={<Content searchString={searchString}/>}></Route> */}
          {/* <Route exact path='/product/:productId' element={< Product changeSearchString = {setSearchString}/>}></Route> */}
          {/* <Route exact path='/modalDemo' element={< ModalDemo />}></Route> */}
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
        {/* </Content> */}
      </>
   );
}

export default App;
