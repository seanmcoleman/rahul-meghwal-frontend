import Product from "./Product";
import { useState } from "react";
import ProductCard from "./ProductCard";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from 'mdb-react-ui-kit';

function ModalProductCard({cart, setCart,product,setSelectedProduct,scrollableModal, setScrollableModal}) {
  
  return (
      <MDBModal className="custom-modal" show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
        <MDBModalDialog className="custom-modal-body" scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className="product-modal-title">{product.title}</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => {setScrollableModal(!scrollableModal);}}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Product cart={cart} setCart={setCart} key={product.product_id} productInfo={product}/>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  );
}

function ProductsView({cart, setCart, products}) {

  const [selectedProduct,setSelectedProduct] = useState({});
  const [scrollableModal, setScrollableModal] = useState(false);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 row-cols-xl-5">
        {products.map( product => <ProductCard key={product.product_id} product = {product} setSelectedProduct={setSelectedProduct} setScrollableModal={setScrollableModal}/> )}
      </div>
      {selectedProduct.product_id &&
        <ModalProductCard cart={cart} setCart={setCart} product={selectedProduct} scrollableModal={scrollableModal} setScrollableModal={setScrollableModal} setSelectedProduct={setSelectedProduct}/>
      }
    </>
  );
}

export default ProductsView;