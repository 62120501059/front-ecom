import React from "react";
import Navbar from "../layouts/Navbar";
import Hero from "../layouts/Hero";
import HeadlineCards from "../layouts/HeadlineCards.";
import CardSlider from "../layouts/CardSlider";
import Footer from "../layouts/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HeadlineCards />
      <CardSlider />
      <Footer />
    </div>
  );
}
