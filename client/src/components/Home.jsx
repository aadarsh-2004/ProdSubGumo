import React from "react";
import HeroSection from "./HeroSection";
import Services from "./Services";
import Destinations from "./Destinations";
import { Footer } from "./Footer";
import Testimonial from "./Testimonials";

function Home() {
  return (
    <>
      <HeroSection />
      <Services />
      <Destinations />
      <Testimonial />
    </>
  );
}

export default Home;
