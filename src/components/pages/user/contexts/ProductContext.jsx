import React ,{createContext, useState, useEffect} from 'react'
import {listProduct} from '../../../function/product'
//create context
export const  ProductContext = createContext();
const ProductProvider = ({children}) => {
 //products state
const [products,setProduct] = useState([]);
const [loading, setLoading] = useState(false);
 //fetch products
 useEffect(() => {
    //
    loadData(100);
}, []);

const loadData = (count) => {
    setLoading(true);
    listProduct(count)
        .then((res) => {
            setLoading(false);
            setProduct(res.data);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        });
};
// console.log(products);
 return <ProductContext.Provider value={{products}}>
    {children}</ProductContext.Provider>
};

export default ProductProvider