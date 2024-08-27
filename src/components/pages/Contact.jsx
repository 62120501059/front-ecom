import React from "react";
import Navbar from "../layouts/Navbar";
import image2 from "../pages/imager/menu2.png";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-white py-20 lg:py-[120px] px-10 flex justify-center items-center">
        <img src={image2} alt="" />
      </section>
    </div>
  );
};

export default Contact;
