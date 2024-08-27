import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

function Hero() {
  const slides = [
    {
      url: "https://image.bestreview.asia/wp-content/uploads/2021/02/seafood-menus.jpg",
    },
    {
      url: "https://d1imgdcsrvbfip.cloudfront.net/attachment_images/10f38954571c6c46f7da6b5c41d3fedaec06fc14.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXVZDCJJC5AJQ47UT%2F20210617%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20210617T150952Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Security-Token=FwoGZXIvYXdzEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDNULeBC%2FEJ4%2FjzrCyiKbAwAax%2Fs6FeHEWfaxl7VNbWb%2FoJfswQpvNJIKiQj2BdKqglqd%2Bse9ux6Wqoq6FUyllFnNL7SiroMj8MhluoULu0PVW0W5WPrxzbrIow06desSh1QBfGdqFrUdbdfNy1GRYOwKXeKCRr5T9eJBmsVNfMxrol7y0KGEZ%2FegAIg0VoXvQqBuo3Y5JV0Ag94H61iLv6vNq%2BwgbTzRda68ta494705aMwz6bF2aigXHIEWCvrEHviAmXS8K1uOPJ6auBLkVVa%2Bv9gdhQcUDDwSZU073Rs%2BafNQHSmwwuwZ1ybXgeBZREm6ac3QiLmAe0D8xjPOsnONRKaBoswdes1dY12bjpzae%2FnbvPtEI5QjQ3km3XyFAO6003u%2BTs8ByKvRYnJyOe9kDokpAW1uDyc0Y6nopgLSHu%2BBp63UEl%2BQCDQpDsdCht5tF2qbFAgmcL8Q3g8SqnMao6ULT7MxL5Szf84LMSKvvTtR8EGnq0dNrcK7kBouqPe6h3jAyoeRr1kwD5%2Bc5dbn%2B3glrPK%2BOUIcCo4%2BxRKBWDVEcJ3FRyYQvijHya2GBjI1FgNGm2nxIyJafRgxih4x4ec14civqQG9yQ%2BOMPPPjwFse5HcJd6%2FsYnUAmYtrlizOGNufcE%3D&X-Amz-Signature=7029a829eec7b0a22a136c54c7ae5ff0907fbe9e255e0ad62b97550130befcb8,",
    },
    {
      url: "https://www.salika.co/wp-content/uploads/2018/08/140844.jpg",
    },

    {
      url: "https://d1imgdcsrvbfip.cloudfront.net/attachment_images/249e94fad7b7f7fd58eea09f9bd74da99e089522.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXVZDCJJC5AJQ47UT%2F20210617%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20210617T150952Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Security-Token=FwoGZXIvYXdzEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDNULeBC%2FEJ4%2FjzrCyiKbAwAax%2Fs6FeHEWfaxl7VNbWb%2FoJfswQpvNJIKiQj2BdKqglqd%2Bse9ux6Wqoq6FUyllFnNL7SiroMj8MhluoULu0PVW0W5WPrxzbrIow06desSh1QBfGdqFrUdbdfNy1GRYOwKXeKCRr5T9eJBmsVNfMxrol7y0KGEZ%2FegAIg0VoXvQqBuo3Y5JV0Ag94H61iLv6vNq%2BwgbTzRda68ta494705aMwz6bF2aigXHIEWCvrEHviAmXS8K1uOPJ6auBLkVVa%2Bv9gdhQcUDDwSZU073Rs%2BafNQHSmwwuwZ1ybXgeBZREm6ac3QiLmAe0D8xjPOsnONRKaBoswdes1dY12bjpzae%2FnbvPtEI5QjQ3km3XyFAO6003u%2BTs8ByKvRYnJyOe9kDokpAW1uDyc0Y6nopgLSHu%2BBp63UEl%2BQCDQpDsdCht5tF2qbFAgmcL8Q3g8SqnMao6ULT7MxL5Szf84LMSKvvTtR8EGnq0dNrcK7kBouqPe6h3jAyoeRr1kwD5%2Bc5dbn%2B3glrPK%2BOUIcCo4%2BxRKBWDVEcJ3FRyYQvijHya2GBjI1FgNGm2nxIyJafRgxih4x4ec14civqQG9yQ%2BOMPPPjwFse5HcJd6%2FsYnUAmYtrlizOGNufcE%3D&X-Amz-Signature=a9b9eb39f547eccb063be266329185d94a9a2ba84f626b9eb912bd3ea95c8bac",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="max-w-full h-[600px] m-auto relative group ">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      ></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={20} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={20} />
      </div>
    </div>
  );
}

export default Hero;
