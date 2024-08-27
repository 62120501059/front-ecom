import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { listProduct } from "../function/product";
import { useSelector } from "react-redux";


function CardSlider() {
  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 400;
  };

  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 400;
  };
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadData = async (authtoken) => {
    setLoading(true);

    await listProduct(authtoken)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setLoading(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="relative">
      <div className="text-center py-4 text-4xl font-bold md:text-4xl lg:text-5xl">
        New Arrivals
      </div>
      <div className="absolute right-0 top-5 ">
        <button onClick={scrollLeft} className="p-2 m-2 rounded-full bg-white">
          <FiChevronLeft />
        </button>
        <button onClick={scrollRight} className="p-2 m-2 rounded-full bg-white">
          <FiChevronRight />
        </button>
      </div>
      <div
        id="content"
        className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide"
      >
        {data.map((product, index) => (
          <div key={index}>
            <Card
              title={product.title}
              imageUrl={product.images.length > 0 ? product.images[0].url : "fallbackImageUrl"}
              category={product.category?.name}
              price={product.price}
              discountedPrice={product.discountedPrice}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardSlider;
