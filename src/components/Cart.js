import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Cart({cart, setCart}) {

    const [purchaseValue, setPurchaseValue] = useState(0);

    function handleUpdateQuantity(value, key){
        const cartQuantity = value < 1 ? 1 : value;
        setCart((prev)=>({...prev,[key]:{...prev[key], quantity:cartQuantity}}));
    }

    function handleDeleteCartItem(key){
        setCart((prev)=>{ delete prev[key]; return {...prev};});
    }
    
    useEffect(()=>{
        const cartValue = Object.keys(cart)
            .map((k)=> {return cart[k].price * cart[k].quantity;})
            .reduce((cartTotal, itemTotal)=> cartTotal + itemTotal, 0);

        setPurchaseValue(cartValue);
    },[cart]);
    
    return (<div className="row">
                {
                    cart && Object.keys(cart).length === 0 ?<div className="col cart-items-text-display">Empty Cart</div>
                :
                <div className="cart-tile-container">
                    <div className="row">
                        <div className="col-lg-2 cart-items-text-display">Items In Your cart</div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-7 cart-tiles">
                            {Object.keys(cart).map((k)=>
                                <div className="cart-tile" key={k}>
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <div className="row">
                                                <img src={cart[k].image}/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-9 cart-item-detail">
                                            <div className="row cart-item-details cart-item-title">
                                                <p>{cart[k].title}</p>
                                            </div>
                                            <div className="row cart-item-details cart-item-price">
                                                <p><span>Price</span> : <span><b>${cart[k].price}</b></span></p>
                                            </div>
                                            <div className="row cart-item-details cart-item-size">
                                                <p><span>Size</span> : <span><b>{cart[k].size}</b></span></p>
                                            </div>
                                            <div className="row cart-item-details cart-item-quantity">
                                                <p><span>Quantity</span> : <span><input className="cart-item-quantity-field" type="number" value={cart[k].quantity} onChange={(e)=>handleUpdateQuantity(e.target.value, k)}></input></span></p>
                                            </div>
                                            <div className="row cart-item-details cart-item-price">
                                            <p><span>Total Price</span> : <span><b>${(cart[k].price*cart[k].quantity).toFixed(2)}</b></span></p>
                                            </div>
                                        </div>
                                        <div className="col-lg-1 ">
                                            <FontAwesomeIcon className="cart-item-delete" onClick={()=>{handleDeleteCartItem(k)}} icon={["fas", "trash"]} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-4 cart-total-section">
                            <div className="row purchase-summary">
                                <div className="col">
                                Purchase Summary
                                </div>
                            </div>
                            <hr className="purchase-details-hr"/>
                            <div className="row purchase-details">
                                <div className="row purcahse-item">
                                    <div className="col-lg-10 purcahse-item-key">
                                        <p>Total Purchase</p>
                                    </div>
                                    <div className="col-lg-2 purcahse-item-value">
                                        ${purchaseValue.toFixed(2)}
                                    </div>
                                </div>
                                <div className="row purcahse-item">
                                    <div className="col-lg-10 purcahse-item-key">
                                        <p>Tax To be Collected(6%)</p>
                                    </div>
                                    <div className="col-lg-2 purcahse-item-value">
                                        ${(purchaseValue*0.06).toFixed(2)}
                                    </div>
                                </div>
                                <div className="row purcahse-item"> 
                                    <div className="col-lg-10 purcahse-item-key">
                                        <p>Total Purchase(Incl. Taxes)</p>
                                    </div>
                                    <div className="col-lg-2 purcahse-item-value">
                                        ${(purchaseValue*1.06).toFixed(2)}
                                    </div>
                                </div>
                                <div className="row finalize-puchase">
                                    <div className="col proceed-to-checkout " >
                                        <button className="btn btn-warning final-purchase-button mt-3" >
                                        <FontAwesomeIcon icon={["fas", "credit-card"]} /> Proceed To Checkout !
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>);
}