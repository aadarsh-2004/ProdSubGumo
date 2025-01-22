import React, { useState } from "react";
import herobg from "./hero-bg.svg";
import HeroSectionImg from "../assets/HeroSectionImg.svg";
const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative top-14  w-full flex justify-center">
      <img
        src={herobg}
        className="absolute md:top-0 md:left-0 w-full h-full z-0"
        alt="Hero Background"
      />

      <div className="z-10  container m-2 p-0 md:px-20 h-full flex items-center justify-start relative">
        <div className="flex   flex-wrap p-1 md:p-2 items-center justify-between w-full">
          {/* Text Section */}
          <div className="w-1/2 md:w-6/12 font-Volkhov flex flex-col items-start text-left md:text-left md:py-6">
            <h4 className="text-[12px] md:text-[22px] font-bold text-red-600 mb-3 animate-fade-in">
              Sabgumo - Explore the Unexplored
            </h4>
            <h1 className="text-[25px] md:text-[60px] font-extrabold leading-tight mb-6 animate-slide-in">
              Discover new <span className="bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-clip-border text-transparent ">destinations</span>, experiences, and cultures with us
            </h1>
            <p className="text-[7px] md:text-[17px]">
        Your gateway to{' '}
        <span className=" font-semibold">unparalleled</span>{' '}
        travel experiences. We're a team of{' '}
        <span className=" font-semibold">passionate</span>{' '}
        travelers, explorers, and storytellers dedicated to helping you discover the{' '}
        <span className="text-purple-600 font-semibold">hidden gems</span>{' '}
        of our world.
      </p>
      
      <p className="text-[7px] md:text-[17px]">
        We'll take you on a journey that will leave you with{' '}
        <span className="text-amber-600 font-semibold">unforgettable</span>{' '}
        memories.
      </p>
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Button section if needed */}
            </div>
          </div>

          {/* Animated Image Section */}
          <div className="w-1/2 md:w-6/12 relative text-center md:text-right overflow-hidden">
            <div className="animate-bounce-slow">
              <img
                className="ml-8 pt-0  w-[600px] md:pt-0 max-w-full transition-transform hover:scale-105 duration-300"
                src={HeroSectionImg}
                alt="hero-header"
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