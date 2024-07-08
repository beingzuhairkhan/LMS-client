'use-client'
import React from 'react';
import Link from 'next/link';
import { AiFillYoutube, AiFillInstagram, AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="mt-7">
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">

            {/* About Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-black dark:text-white">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-base text-black dark:text-gray-300 ">Our Story</Link>
                </li>
                <li>
                  <Link href="/policy" className="text-base text-black dark:text-gray-300 ">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/faq" className="text-base text-black dark:text-gray-300">FAQ</Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-black dark:text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses" className="text-base text-black dark:text-gray-300 ">Courses</Link>
                </li>
                <li>
                  <Link href="/profile" className="text-base text-black dark:text-gray-300">My Account</Link>
                </li>
                <li>
                  <Link href="/course-dashboard" className="text-base text-black dark:text-gray-300">Course Dashboard</Link>
                </li>
              </ul>
            </div>

            {/* Social Links Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-black dark:text-white">Social Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://www.instagram.com/garuda_institute/" className="text-base text-black dark:text-gray-300">
                    <AiFillYoutube className="inline-block h-6 w-6" /> Youtube
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/garuda_institute/" className="text-base text-black dark:text-gray-300 ">
                    <AiFillInstagram className="inline-block h-6 w-6" /> Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/garuda_institute/" className="text-base text-black dark:text-gray-300">
                    <AiFillGithub className="inline-block h-6 w-6" /> GitHub
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-3 dark:text-white text-black">
              <h3 className="text-lg font-semibold text-black dark:text-white ">Contact Info</h3>
              <p className="text-base text-black dark:text-gray-300">
  Call Us: <a href="tel:+917400216888" className="text-blue-500 underline-none">+91 7400216888</a>
</p>
              <p className="text-base text-black dark:text-gray-300 ">Address: Gr floor Room Number 13:14, Hira Nandani, Samrat, Lallu Bhai Compound, near Shankar mandir, Mumbai, Maharashtra 400043</p>
              <p className="text-base text-black dark:text-gray-300 ">Mail Us: garudainstitute32@gmail.com</p>
            </div>

          </div>
        </div>
      </div>
      <br />
      <div className="text-center text-black dark:text-white font-semibold">
        Copyright © 2024 GARUDA INSTITUTE. All Rights Reserved.
      </div>
      <br />
    </footer>
  );
};

export default Footer;
