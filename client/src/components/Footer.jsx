import React from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FileText, Shield, Copyright } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white mt-16 md:mt-24 font-poppins text-white py-8">
      <div className="max-w-7xl text-black mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Company Info */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Sabgumo</h2>
            <p className="text-gray-700 text-sm md:text-base mb-2">
              Explore the world with ease. Your journey begins here.
            </p>
            <div className="flex items-center space-x-2 text-gray-700">
              <Copyright className="w-4 h-4" />
              <p className="text-sm md:text-base">
                2023 Sabgumo. All rights reserved.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-700 hover:text-blue-600 transition duration-300 text-sm md:text-base"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/destinations"
                  className="text-gray-700 hover:text-blue-600 transition duration-300 text-sm md:text-base"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="/IForm"
                  className="text-gray-700 hover:text-blue-600 transition duration-300 text-sm md:text-base"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Information */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-700" />
                <a
                  href="#terms"
                  className="text-gray-700 hover:text-blue-600 transition duration-300 text-sm md:text-base"
                >
                  Terms and Conditions
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-700" />
                <a
                  href="#privacy"
                  className="text-gray-700 hover:text-blue-600 transition duration-300 text-sm md:text-base"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media & Newsletter */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Stay Connected
            </h3>
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="font-medium text-sm md:text-base">
                Contact No.: 8239498447 
              </h3>
              <a href="https://wa.me/918239498447">
              <IoLogoWhatsapp className="text-black text-2xl cursor-pointer hover:text-[#46c030] transition duration-300" />
              </a>

              <a href="https://www.instagram.com/sabgumo/">
              <FaInstagram className="text-black cursor-pointer hover:text-pink-600 text-2xl" />
              </a>
            </div>

            
            
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;