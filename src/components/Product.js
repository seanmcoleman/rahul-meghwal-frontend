import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from '@fortawesome/fontawesome-free-solid';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


function Product({cart, setCart, productInfo}) {

    const [product, setProduct] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    

    const fetchProductData = (product_id) => {
      fetch("http://3.86.87.11:8080/getProductDetails/" + product_id)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setProduct(data[0]);
          console.log("AA");
          console.log(data);
          setLoaded(true);
        })
    }

    function getDiscount(newPrice, oldPrice){
      var diff = oldPrice - newPrice;
      return Math.round(diff*100/oldPrice);
    }
    
    useEffect(() => {
      fetchProductData(productInfo.product_id);
      console.log("AA");
    },[productInfo.product_id]);

    function addItemToCartHandler(){
      
      console.log(selectedQuantity);
      console.log(product.product_id);
      console.log(selectedSize);
      var productSku = product.product_id.toString() + '#' + selectedSize.toString();
      console.log("typeof")
      console.log(typeof(productSku))
      var newCartItem = {};
      if(cart[productSku]){
        newCartItem = {...cart[productSku], quantity: cart[productSku].quantity + parseInt(selectedQuantity)};
      } else {
        newCartItem = {size:selectedSize, quantity:parseInt(selectedQuantity), image:product.images.split('|')[0], title:product.title, price:product.variant_price};
      }
      setCart((prev)=>({...prev , [productSku]:newCartItem}));
    }

    return (
      <div key={product.product_id} className="product-modal-view">
        {loaded &&
        <div className='row'>
        <div className="col-lg-6 product-modal-images">
          <Carousel useKeyboardArrows={true}>
            {product.images.split("|").slice(0, 3).map((URL, index) => (
              <div key={index} className="slide">
                <img alt="sample_file" src={URL} key={index} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="col-lg-1 product-modal-pad">
          <div className="d-flex product-modal-vr">
            <div className='vr'></div>
          </div>
        </div>
        <div className="col-lg-5 product-modal-data">
          <div className="row">
            <p className="product-modal-brand-name">
              {product.brand}
            </p>
          </div>
          <div className="row ">
            <h3 className="product-view-title">{product.title}</h3>
          </div>
          <hr/>
          <div className="row">
            <div>
              {
                product.variant_compare_at_price !== product.variant_price ?
                <p className="badge bg-dim text-white position-relative badge-prod-page">
                  {getDiscount(product.variant_price,product.variant_compare_at_price)}% OFF
                </p>
                :
                ''
              }
              <p className="price-data">
                <span className="price-icon">
                  <FontAwesomeIcon icon={faDollarSign} size="2x" /> 
                </span>
                <span className="price-value">{product.variant_price}</span>
                {
                  product.variant_compare_at_price > product.variant_price ?
                  <span className="price-value-original"><del>${product.variant_compare_at_price}</del></span>
                  :
                  ''
                }
              </p>
            </div>
          </div>
          <div className="row select-size-field">
            <p><b>Select Size</b></p>
            <p className="select-size-buttons">{product.size.split("|").map( size =>
                    <span key={size} className={"btn btn-outline-dark size-buttons" + (selectedSize === size ? " text-light bg-dark " : "")} onClick={()=> setSelectedSize(size)}>{size}</span>
                )}
            </p>
          </div>
          <div className="row select-size-field">
            <p><b>Quantity</b></p>
            <p >
                <input className="select-quantity" type="number" value={selectedQuantity} onChange={(e)=>setSelectedQuantity(e.target.value)}></input>
            </p>
          </div>
          <div className="row">
                <div className="d-grid d-block">
                  <button className="btn btn-outline-warning custom-add-cart-button mt-3" disabled={selectedSize === ''} onClick={()=> {addItemToCartHandler()}}>
                  <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
                  </button>
                </div> 
               
          </div>
          <hr/>
          <div className="row">
            <p><b>Product Details</b></p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="row product-attribute">
                <p className="product-attribute-name">Ideal For</p>
                <p className="product-attribute-value">{product.ideal_for}</p>
              </div>
              <div className="row product-attribute">
                <p className="product-attribute-name">Color</p>
                <p className="product-attribute-value">{product.dominant_color}</p>
              </div>

          </div>
            <div className="col-lg-6">
              <div className="row product-attribute">
                <p className="product-attribute-name">Material</p>
                <p className="product-attribute-value">{product.dominant_material}</p>
              </div>
              <div className="row product-attribute">
                <p className="product-attribute-name">Category</p>
                <p className="product-attribute-value">{product.product_type}</p>
              </div>

            </div>
          </div>
         
          <div className="row product-attribute">
            <p className="product-attribute-name">Fit Check</p>
            <p className="product-attribute-value">{product.size_fit}</p>
          </div>

          <div className="row product-attribute">
            <p className="product-attribute-name">Care Instructions</p>
            <p className="product-attribute-value">{product.care_instructions}</p>
          </div>

          <div className="row product-attribute">
            <p className="product-attribute-name">Description</p>
            <p className="product-attribute-value">{product.body}</p>
          </div>          


        </div>
        </div>
        }
        
      </div>
    );
}
export default Product;
