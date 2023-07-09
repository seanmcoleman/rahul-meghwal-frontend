import React from 'react';

function ProductCard({product, setSelectedProduct,setScrollableModal}) {
    function getDiscount(newPrice, oldPrice){
        var diff = oldPrice - newPrice;
        return Math.round(diff*100/oldPrice);
    }
  return (
        <div className="col">
            <div className="card custom-card shadow-sm" onClick={() => {setSelectedProduct(product); setScrollableModal(true);}}>
                { product.variant_price < product.variant_compare_at_price ?
                    <p className="badge bg-dim text-white position-absolute"
                            style={{ bottom: "12rem", right: "0.5rem" }}>
                            {getDiscount(product.variant_price,product.variant_compare_at_price)}% OFF
                    </p>
                    :
                    ''
                }
                <img
                    className="card-img-top"
                    height="auto"
                    alt=""
                    src={product.images.split("|")[0]}
                />
                <div className="card-body">
                <h6 className="card-title card-title-custom text-center text-dark text-truncate-custom">
                    {product.title}
                </h6>
                <p className="card-text text-center text-muted mb-0">
                    <span className="card-price-new">${product.variant_price}</span>
                    <span className="card-price-old">
                        <del>{product.variant_price !== product.variant_compare_at_price ? '$' + product.variant_compare_at_price : ''}</del>
                    </span>
                    
                </p>
                <p className="card-text available-in text-center mb-0">
                    Available In
                </p>
                <div className="d-grid d-block text-center ">
                    {/* <button className="btn btn-outline-dark mt-3">
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
                    </button> */}
                    <p className="available-sizes ">{product.size.split("|").map( 
                        size => (size.length < 3 || product.size.length < 12) ? <span key={size} className="btn available-size-button btn-outline-dark size-buttons text-dark bg-light ">{size}</span> : ''
                        )}
                    </p>        
                </div>
                </div>
            </div>
        </div>
  );
}

export default ProductCard;
