import { useEffect, useState, useRef } from 'react';
import ProductsView from './ProductsView';
import FilterView from './FilterView';
import Cart from './Cart';
import * as CONSTANT from '../constants/filterConstants'

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
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  );
}


function Content({showCart, setShowCart,searchString}) {
  
  const initialFilterState = {
    [CONSTANT.FILTER_BRAND]     : [],
    [CONSTANT.FILTER_IDEAL_FOR] : [],
    [CONSTANT.FILTER_SIZE]      : [],
    [CONSTANT.FILTER_MIN_PRICE] : 0,
    [CONSTANT.FILTER_MAX_PRICE] : 1000
  };
  

  const [state, setState] = useState({
    filters : initialFilterState,
    searchString : searchString,
    pageNo : 1
  });

  const productsPerPage = 100;
  const initialRender = useRef(true);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [resultMessage, setResultMessage] = useState('Showing All Products.');
  const [totalProducts, setTotalProducts] = useState(0);
  
  const fetchProductsData = async (page,filters,searchString) => {
    const brands = filters.brand ? filters.brand : [];
    const params = { brand: brands, searchString: searchString};
    const urlParams = new URLSearchParams(params).toString();
    
    const response = await fetch(`http://3.86.87.11:8080/getProducts/${page}?${urlParams}`)
    if(!response.ok){
      throw new Error(`An error has occured: ${response.status}`);
    }
    const products = await response.json();
    return products;

  }

  useEffect(() => {
    setLoading(true);
    fetchProductsData(state.pageNo,state.filters,state.searchString)
      .then((products)=> {
        setProducts(products.data);
        setTotalProducts(products.total_records)
      })
      .catch((error)=>{console.log(error.resultMessage)})
      .finally(()=>{
        setLoading(false);
        window.scrollTo(0, 0);
      });
      setResultMessage(`Showing results ${state.searchString.length > 0 ? ` for '${state.searchString}'` : `` } with below filters.`);
      return () => {
        setLoading(false);
      }

  },[state]);

  const handleFilterUpdate = (filters) => {
    setState((prev)=> ({...prev, filters:filters, pageNo:1}));
  }

  const handlePageUpdate = (pageNo) => {
    
    setState((prev)=> ({...prev, pageNo:pageNo}));
  }

  useEffect(()=>{
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setState((prev)=> ({...prev, searchString:searchString}));
    }
  },[searchString]);

  const getRangeForPage = () => {
    const start = Math.floor((state.pageNo-1)/5)*5 + 1;
    const range = [...Array(5).keys()].map(x => (x + start));
    return range;
  }

  return (
    
    <>
      <div className="container-fluid mt-5 py-4 px-4">
        <div className="search-result-info">
          <ol className="p-3 mb-0">
            {resultMessage}
          </ol>
          </div>
        <div className="row mb-0 mt-lg-3">
          <div className="col-lg-2">
            <div className="border shadow-sm flex-column">
                <FilterView loading={loading} filters = {state.filters} updateFilters = {handleFilterUpdate}/>
            </div>
          </div>
          <div className="col-lg-10">
            { loading ?
              <>
                <div className="loading-text">
                  <h5>Loading Products ...</h5>
                </div>
              </>
              :
              <>
                {products.length > 0 ?
                <>
                <div className="d-flex flex-column">
                  <ProductsView cart={cart} setCart={setCart} products={products}/>
                </div>
                <div className="d-flex align-items-center mt-auto">
                  <span className="text-muted small d-none d-md-inline">
                    Showing {(state.pageNo-1)*productsPerPage + 1} - {(state.pageNo-1)*productsPerPage + products.length} of {totalProducts}
                  </span>
                  <nav aria-label="Page navigation example" className="ms-auto">
                    <ul className="custom-page-bar pagination my-0">
                      <li className="page-item">
                      <button 
                        className="page-link"
                        title={ state.pageNo === 1 ? `` : `Go to page ${state.pageNo-1}`}
                        disabled={state.pageNo === 1} 
                        onClick={()=> {handlePageUpdate(state.pageNo-1)}}>
                          {"<"}
                        </button>
                      </li>
                      {getRangeForPage().map((page)=>
                        <li className={`page-item ${page===state.pageNo ? `active` : ``}`}>
                          <button className="page-link" 
                            title={`Go to page ${page}`} 
                            hidden={totalProducts <= ((page-1)*productsPerPage)} 
                            onClick={()=> {handlePageUpdate(page)}}>
                            {page}
                          </button>
                        </li>
                      )}
                      
                      <li className="page-item">
                        <button className="page-link" 
                          title={`Go to page ${state.pageNo+1}`}
                          disabled={totalProducts <= ((state.pageNo)*productsPerPage)} 
                          onClick={()=> {handlePageUpdate(state.pageNo+1)}}>
                          {">"}
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
                </>
                :
                <div className="no-results-text">
                  <h5>No Results.</h5>
                </div>
                }
              </>
            }
          </div>
        </div>
      </div>
      <ModalCart cart={cart} setCart={setCart} showCart={showCart} setShowCart={setShowCart}/>
      
      
    
    </>
  );
}
export default Content;


/* <li className="page-item active">
                        <button className="page-link" onClick={()=> {}}>
                          {state.pageNo}
                        </button>
                      </li>
                      <li className="page-item">
                        <button className="page-link"
                          title={`Go to page ${state.pageNo+1}`} 
                          disabled={totalProducts <= ((state.pageNo-1)*productsPerPage + products.length)} 
                          onClick={()=> {handlePageUpdate(state.pageNo+1)}}>
                          {state.pageNo+1}
                        </button>
                      </li>
                      <li className="page-item">
                        <button className="page-link" 
                          title={`Go to page ${state.pageNo+2}`}
                          disabled={totalProducts <= ((state.pageNo)*productsPerPage + products.length)} 
                          onClick={()=> {handlePageUpdate(state.pageNo+2)}}>
                          {state.pageNo+2}
                          </button>
                        </li> */