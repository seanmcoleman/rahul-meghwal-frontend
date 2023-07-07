import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import { faShoppingCart } from '@fortawesome/fontawesome-free-solid';



function Header({cartSize, setShowCart, changeSearchString}) {

    const [searchStringPlaceHolder, setSearchStringPlaceHolder] = useState('');
    
    function onKeyUpFromSearch(event){
        if(event.key==='Enter'){
            changeSearchString(searchStringPlaceHolder);
        }
    }
    return (
        <header>
            <nav className="navbar fixed-top navbar-light bg-white border-bottom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                                    <span className="ms-2 h5">MyStore</span>
                    </Link>
                    <div className="col-lg-9">
                        <div className="input-group">
                        <input
                            className="form-control search-bar"
                            type="text"
                            value={searchStringPlaceHolder}
                            placeholder="Search products..."
                            aria-label="search input"
                            onKeyUp={(e)=>{onKeyUpFromSearch(e)}}
                            onChange={(e) => setSearchStringPlaceHolder(e.target.value) }
                        />
                        <button className="btn search-bar btn-outline-dark" onClick={()=>{changeSearchString(searchStringPlaceHolder)}}>
                            <FontAwesomeIcon icon={["fas", "search"]} />
                        </button>
                        </div>
                        
                    </div>
                    <button type="button" className="btn show-cart-button btn-warning text-dark me-3 d-inline" onClick={()=>{setShowCart(true)}}>
                                {" Cart "}
                                <FontAwesomeIcon icon={faShoppingCart} />
                                {/* <span className="ms-3 badge">{" "}</span> */}
                                {' '}
                                <span className="navbar-toggler-icon"></span>
                    </button>
                    
                </div>
            </nav>
        </header>
    );
}
export default Header;

