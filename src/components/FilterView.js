import * as CONSTANT from '../constants/filterConstants'

function FilterView({loading, filters, updateFilters}) {

  function onFilterChange(e, filter, v){

    if(filter === CONSTANT.FILTER_MIN_PRICE || filter === CONSTANT.FILTER_MAX_PRICE){
      updateFilters({ ...filters, [filter] : v});
    } else {
      const {checked} = e.target;
      if(checked){
        updateFilters({...filters, [filter] : [...filters[filter],v]});
      } else {
        updateFilters({...filters, [filter] : filters[filter].filter((value)=> value !== v)});
      }
    }
  }
 
 
  return (
    <ul className="list-group list-group-flush filters-view">
      <li className="list-group-item">
        <div className="mt-1 mb-1 filter-name">Top Brands</div>
        <div className="d-inline-flex flex-column">
          {CONSTANT.TOP_BRANDS.map((v) => {
            return (
              <div key={v} className="form-check">
                <input className="form-check-input" type="checkbox" disabled={loading} onChange={(e) => onFilterChange(e,CONSTANT.FILTER_BRAND,v)} value={filters[CONSTANT.FILTER_BRAND].includes(v)}/>
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
          {CONSTANT.SIZE.map((v) => {
            return (
              <div key={v} className="form-check">
                <input className="form-check-input" type="checkbox" disabled={loading} onChange={(e) => onFilterChange(e,CONSTANT.FILTER_SIZE,v)} value={filters[CONSTANT.FILTER_SIZE].includes(v)}/>
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
          {CONSTANT.IDEAL_FOR.map((v) => {
            return (
              <div key={v} className="form-check">
                <input className="form-check-input" type="checkbox"  disabled={loading} onChange={(e) => onFilterChange(e,CONSTANT.FILTER_IDEAL_FOR,v)} value={filters[CONSTANT.FILTER_IDEAL_FOR].includes(v)}/>
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
              className="form-control border-radius-0"
              type="number"
              disabled={loading} 
              value = {filters[CONSTANT.FILTER_MIN_PRICE]}
              onChange={(e) => onFilterChange(e, CONSTANT.FILTER_MIN_PRICE,e.target.value)}
            />
            <label htmlFor="floatingInput">Min Price</label>
          </div>
          <div className="form-floating mb-2">
            <input
              className="form-control border-radius-0"
              type="number"
              disabled={loading} 
              value = {filters[CONSTANT.FILTER_MAX_PRICE]}
              onChange={(e) => onFilterChange(e, CONSTANT.FILTER_MAX_PRICE,e.target.value)}
            />
            <label htmlFor="floatingInput">Max Price</label>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default FilterView;