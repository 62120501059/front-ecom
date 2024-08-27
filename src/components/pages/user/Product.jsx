import React, { useState, useEffect, useContext } from "react";
//import product contexts
import { ProductContext } from "./contexts/ProductContext";
//import component shop
import Shop from "./Shop";
import SidebarLayout from "./SidebarLayout";
import { useSelector } from "react-redux";
import { listCategory } from "../../function/category"
const Product = () => {
  //get products from product context
  const { user } = useSelector((state) => ({ ...state }));
  const [cate, setCate] = useState([])
  const { products } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadData(user.user.token);
  }, [user]);

  const loadData = async (authtoken) => {
    await listCategory(authtoken)
      .then((res) => {
        setCate(res.data);
      })
      .catch((err) => console.log(err));
  }

  const handleCategoryChange = (loadData) => {
    setSelectedCategory(loadData);
  };

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
  console.log(selectedCategory);

  return (
    <div>
      <section className="flex ">
        <SidebarLayout cate={cate} onCategoryChange={handleCategoryChange} />
        <div className="container mx-auto px-10 py-5 mt-20">
          <div
            className="grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md"
          >
            {products
              .filter(product => selectedCategory ? product.category?._id === selectedCategory._id : true)
              .map((product) => {
                return <Shop product={product} selectedCategory={selectedCategory} cate={cate} key={product._id} />;
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
