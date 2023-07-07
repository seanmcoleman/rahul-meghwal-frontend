import { useState } from "react";


const idealFor  = [ 'Boys', 'Girls', 'Men', 'Unisex', 'Women' ];
const size      = ['S', 'M' , 'L' , 'XXL', 'XXXL'];
const topBrands = ['IMARA', 'Biba' , 'Libas' , 'Manyavar', 'KISAH'];


const FILTER_BRAND     = 'brand';
const FILTER_SIZE      = 'size';
const FILTER_IDEAL_FOR = 'ideal_for';
const FILTER_MIN_PRICE = 'minPrice';
const FILTER_MAX_PRICE = 'maxPrice';

function FilterView({updateFilters}) {

  const initialFilterState = {};
  initialFilterState[FILTER_BRAND] = new Set([]);
  initialFilterState[FILTER_IDEAL_FOR] = new Set([]);
  initialFilterState[FILTER_SIZE] = new Set([]);
  initialFilterState[FILTER_MIN_PRICE] = 0;
  initialFilterState[FILTER_MAX_PRICE] = 1000;

  const [filters, setFilters] = useState(initialFilterState);

  function onFilterChange(e, filter, v){

    if(filter === FILTER_MIN_PRICE || filter === FILTER_MAX_PRICE){
      setFilters((prev) => ({ ...prev, [filter] : v}));
    } else {
      const {checked} = e.target;
      if(checked){
          setFilters((prev) => { prev[filter].add(v); return {...prev};});
        } else {
          setFilters((prev) => { prev[filter].delete(v); return {...prev};});
        }
    }
    // console.log("filters : ");
    // console.log(filters);
    //console.log(filters[FILTER_SIZE].has('S'));
  }
 
 
  return (
    <ul className="list-group list-group-flush filters-view">
      <li className="list-group-item">
        <div className="mt-1 mb-1 filter-name">Top Brands</div>
        <div className="d-inline-flex flex-column">
          {topBrands.map((v) => {
            return (
              <div key={v} className="form-check">
                <input className="form-check-input" type="checkbox" onChange={(e) => onFilterChange(e,FILTER_BRAND,v)} value={filters[FILTER_BRAND].has(v)}/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                <span className="filter-element">{v}</span>
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
      <div className="mt-1 mb-1 filter-name">Size</div>
        <div className="d-flex flex-column">
          {size.map((v) => {
            return (
              <div key={v} className="form-check">
                <input className="form-check-input" type="checkbox" onChange={(e) => onFilterChange(e,FILTER_SIZE,v)} value={filters.size}/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  <span className="filter-element">{v}</span>
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
      <div className="mt-1 mb-1 filter-name">Ideal For</div>
        <div className="d-flex flex-column">
          {idealFor.map((v) => {
            return (
              <div key={v} className="form-check">
                <input className="form-check-input" type="checkbox"  onChange={(e) => onFilterChange(e,FILTER_IDEAL_FOR,v)} value={"a"}/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                <span className="filter-element">{v}</span>
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
      <div className="mt-1 mb-1 filter-name">Price Range</div>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              type="number"
              className="form-control border-radius-0"
              value = {filters[FILTER_MIN_PRICE]}
              onChange={(e) => onFilterChange(e, FILTER_MIN_PRICE,e.target.value)}
            />
            <label htmlFor="floatingInput">Min Price</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="number"
              className="form-control border-radius-0"
              value = {filters[FILTER_MAX_PRICE]}
              onChange={(e) => onFilterChange(e, FILTER_MAX_PRICE,e.target.value)}
            />
            <label htmlFor="floatingInput">Max Price</label>
          </div>
          <button className="btn btn-dark border-radius-0" onClick={()=>{updateFilters(filters)}}>Apply</button>
        </div>
      </li>
    </ul>
  );
}

export default FilterView;