
// const [selectedBrands, setSelectedBrands]     = useState(new Set([]));
  // const [selectedSize, setSelectedSize]         = useState(new Set([]));
  // const [selectedIdealFor, setSelectedIdealFor] = useState(new Set([]));


  // const [minCost, setMinCost] = useState(0);
  // const [maxCost, setMaxCost] = useState(1000);

  // function onFilterChange(e,v,filter){
  //   const changeSelector = () => {console.warn(e,v)};
  //   switch(filter) {
  //     case FILTER_BRAND:changeSelector = selectedBrands; break;
  //     case FILTER_SIZE:changeSelector = selectedSize; break;
  //     case FILTER_SIZE:changeSelector = selectedIdealFor; break;
  //     default:console.warn('Invalid Field')
  //   }
  //   const {checked} = e.target;
  //   if(checked){
  //     changeSelector((prev) => {prev.add(v); return prev;});
  //   } else {
  //     changeSelector((prev) => {prev.delete(v); return prev;});
  //   }
  //   console.log(selectedBrands);
  //   console.log(selectedBrands);
  //   console.log(selectedBrands);


  // }

  // function onBrandChange(e,v){
  //   const {checked} = e.target;
  //   if(checked){
  //     setSelectedBrands((prev) => {prev.add(v); return prev;});
  //   } else {
  //     setSelectedBrands((prev) => {prev.delete(v); return prev;});
  //   }
  //   console.log(selectedBrands);
  // }

  // function onSizeChange(e,v){
  //   const {checked} = e.target;
  //   if(checked){
  //     setSelectedSize((prev) => {prev.add(v); return prev;});
  //   } else {
  //     setSelectedSize((prev) => {prev.delete(v); return prev;});
  //   }
  //   console.log(selectedSize);
  // }

  // function onIdealForChange(e,v){
  //   const {checked} = e.target;
  //   if(checked){
  //     setSelectedIdealFor((prev) => {prev.add(v); return prev;});
  //   } else {
  //     setSelectedIdealFor((prev) => {prev.delete(v); return prev;});
  //   }
  //   console.log(selectedIdealFor);
  // }