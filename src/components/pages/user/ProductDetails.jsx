import React, { useState } from "react";
import Footer from "../../layouts/Footer";

const ProductDetails = () => {
  const [images, setImages] = useState({
    img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
  });

  const [activeImg, setActiveImage] = useState(images.img1);
  const [amount, setAmount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (index) => {
    setCurrentIndex(index);
    setActiveImage(Object.values(images)[index]);
  };

  const handlePrevImage = () => {
    const newIndex =
      (currentIndex - 1 + Object.keys(images).length) %
      Object.keys(images).length;
    handleImageChange(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (currentIndex + 1) % Object.keys(images).length;
    handleImageChange(newIndex);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-8 py-20">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={activeImg}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify-between h-24">
              <div className="w-1/6">
                <button
                  className="w-full h-full rounded-md cursor-pointer"
                  onClick={handlePrevImage}
                >
                  &lt;
                </button>
              </div>
              {Object.values(images).map((img, index) => (
                <div
                  key={index}
                  className={`w-2/6 ${
                    index === currentIndex ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-24 h-24 rounded-md cursor-pointer"
                    onClick={() => handleImageChange(index)}
                  />
                </div>
              ))}
              <div className="w-1/6">
                <button
                  className="w-full h-full rounded-md cursor-pointer"
                  onClick={handleNextImage}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className="text-violet-600 font-semibold text-xl lg:text-2xl">
                Special Sneaker
              </span>
              <h1 className="text-2xl lg:text-3xl font-bold">
                Nike Invincible 3
              </h1>
            </div>
            <p className="text-gray-700 text-sm lg:text-base">
              Con un'ammortizzazione incredibile per sostenerti in tutti i tuoi
              chilometri, Invincible 3 offre un livello di comfort elevatissimo
              sotto il piede per aiutarti a dare il massimo oggi, domani e
              oltre. Questo modello incredibilmente elastico e sostenitivo, è
              pensato per dare il massimo lungo il tuo percorso preferito e fare
              ritorno a casa carico di energia, in attesa della prossima corsa.
            </p>
            <h6 className="text-lg lg:text-2xl font-semibold">$ 199.00</h6>
            <div className="flex flex-row items-center gap-4 lg:gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-xl lg:text-2xl"
                  onClick={() => setAmount((prev) => prev - 1)}
                >
                  -
                </button>
                <span className="py-2 px-4 rounded-lg text-xl lg:text-2xl">
                  {amount}
                </span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-xl lg:text-2xl"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button className="bg-sky-950 text-white font-semibold py-2 px-8 lg:py-3 lg:px-16 rounded-xl h-full hover:bg-gray-500">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
