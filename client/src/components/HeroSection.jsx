import React, { useState } from "react";
import herobg from "./hero-bg.svg";
import HeroSectionImg from "../assets/HeroSectionImg.svg";
// import HeroSectionVideo from "../assets/video.mp4";
const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative top-14  w-full flex justify-center">
      <img
        src={herobg}
        className="absolute md:top-0 md:left-0 w-full h-full z-0"
        alt="Hero Background"
      />

      <div className="z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-start relative">
        <div className="flex flex-wrap items-center justify-between w-full py-8 md:py-12">
          {/* Text Section */}
          <div className="w-full md:w-6/12 flex flex-col items-start text-left mb-8 md:mb-0 md:pr-8">
            <h4 className="text-sm md:text-lg font-bold text-red-600 mb-2 md:mb-3 animate-fade-in">
              #SabkeSabGumenge
            </h4>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 md:mb-6 animate-slide-in">
              Discover new <span className="bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-clip-border text-transparent ">destinations</span>, experiences, and cultures with us
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4">
              Your gateway to{' '}
              <span className=" font-semibold">unparalleled</span>{' '}
              travel experiences. We're a team of{' '}
              <span className=" font-semibold">passionate</span>{' '}
              travelers, explorers, and storytellers dedicated to helping you discover the{' '}
              <span className="text-purple-600 font-semibold">hidden gems</span>{' '}
              of our world.
            </p>
            
            {/* This second paragraph seems redundant or incomplete, consider removing or completing it */}
            {/* <p className="text-sm sm:text-base lg:text-lg text-gray-600">
               We believe that travel is more than just seeing new places; it's about connecting with the world and creating memories that last a lifetime.
            </p> */}

            {/* Buttons */}
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
              {/* Button section if needed */}
            </div>
          </div>

          {/* Animated Image Section */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-end items-center mt-8 md:mt-0">
            <div className="">
            <img
            className="ml-2 animate-bounce-slow rounded-full pt-0 w-[700px] md:pt-0 max-w-full transition-transform hover:scale-105 duration-300"
            src={HeroSectionImg} // Replace this with your video source file path
            // autoPlay
            // muted
            // loop
            // playsInline // Ensures compatibility on mobile browsers
    />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-orange-500 rounded-full animate-bounce-slow opacity-50" />
            <div className="absolute bottom-1/4 left-1/4 w-9 h-9 bg-blue-400 rounded-full animate-ping-slow opacity-50" />
            <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-purple-400 rounded-full animate-pulse opacity-50" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.25;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 4s infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-slide-in {
          animation: slide-in 1s ease-out forwards;
        }

        .animate-fade-up {
          animation: fade-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
