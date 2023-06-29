import { useEffect, useState } from 'react';
import ProductsView from './ProductsView';
import FilterView from './FilterView';
import Cart from './Cart';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from 'mdb-react-ui-kit';


function ModalCart({showCart,setShowCart,cart,setCart}) {
  // const [scrollableModal, setScrollableModal] = useState(true);
  
  return (
      <MDBModal className="custom-modal" show={showCart} setShow={setShowCart} tabIndex='-1'>
        <MDBModalDialog className="custom-modal-body" scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className="cart-modal-title">{"Cart"}</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => {setShowCart(!showCart)}}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Cart cart={cart} setCart={setCart}/>
              {console.log("cart2")}
              {console.log(cart)}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  );
}

function Content({showCart, setShowCart,searchString}) {
  
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [cart, setCart] = useState({});
  const [resultMessage, setResultMessage] = useState('Showing All Products');
  const [pageNo, setPageNo] = useState(1);

  const fetchProductsData = (page,filters,searchString) => {
    var brands = filters.brand ? Array.from(filters.brand) : [];
    var params = { brand: brands, searchString:searchString};
    var url = '?' + ( new URLSearchParams( params ) ).toString();
    
    fetch("http://3.86.87.11:8080/getProducts/" + page + url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.log(err.message);
      })

      return () => {
        // cleanup here
      };
  }
  
  useEffect(() => {
    console.log("AA");
    fetchProductsData(1,{},"");
    setPageNo(1);
  },[]);

  useEffect(() => {
    fetchProductsData(1,filters,searchString);
    console.log("AA");
    setPageNo(1);
    
    if(searchString !== ''){  
      setResultMessage("Showing results for '" + searchString + "' with below filters.");
    } else {
      setResultMessage("Showing producs with below filters.");
    }
    
  },[searchString,filters]);

  useEffect(() => {
    console.log("AA");
    fetchProductsData(1,filters,searchString);
  },[filters,searchString]);

  useEffect(() => {
    console.log("AA");
    window.scrollTo(0, 0);
  }, [pageNo]);

  
  

  return (
    
    <>
      <div className="container-fluid mt-5 py-4 px-4">
        <nav aria-label="breadcrumb" className="bg-custom-light">
          <ol className="breadcrumb p-3 mb-0">
            {resultMessage}
          </ol>
        </nav>
        <div className="row mb-0 mt-lg-3">
          <div className="col-lg-2">
            <div className="border shadow-sm flex-column">
                <FilterView updateFilters = {setFilters}/>
            </div>
          </div>
          <div className="col-lg-10">
            {products.length > 0 ?
            <>
            <div className="d-flex flex-column">
              <ProductsView cart={cart} setCart={setCart} products={products}/>
            </div>
            <div className="d-flex align-items-center mt-auto">
              <span className="text-muted small d-none d-md-inline">
                Showing {products.length} of 1224
              </span>
              <nav aria-label="Page navigation example" className="ms-auto">
                <ul className="custom-page-bar pagination my-0">
                  <li className="page-item">
                  <button className="page-link" onClick={()=> {setPageNo((prev)=>prev-1)}}>
                      Previous
                    </button>
                  </li>
                  <li className="page-item active">
                  <button className="page-link" onClick={()=> {}}>
                      {pageNo}
                    </button>
                  </li>
                  <li className="page-item">
                  <button className="page-link" onClick={()=> {setPageNo((prev)=>prev+1)}}>
                    {pageNo+1}
                    </button>
                  </li>
                  <li className="page-item">
                  <button className="page-link" onClick={()=> {setPageNo((prev)=>prev+2)}}>
                    {pageNo+2}
                    </button>
                  </li>
                  <li className="page-item">
                  <button className="page-link" onClick={()=> {setPageNo((prev)=>prev+3)}}>
                      Next
                  </button>
                  </li>
                </ul>
              </nav>
            </div>
            </>
            :
            "No Results."
            }
          </div>
        </div>
      </div>
      <ModalCart cart={cart} setCart={setCart} showCart={showCart} setShowCart={setShowCart}/>
      
      
    
    </>
  );
}
export default Content;
