import React from 'react';
import Tuitor from '../../public/assets/tuitor.jpg';
import Image from 'next/image';

const Tutors: React.FC = () => {
  return (
    <div className="p-6 dark:text-white text-black text-justify w-full">
         <hr className="mt-4 w-full mb-4" />
      <div className="max-w-7xl mx-auto flex flex-wrap items-center">
        {/* Left Side Content */}
        <div className="w-full md:w-1/2 pr-8 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Experienced Tutors for Institutions and Personal Tuitions</h2>
          <p className="mb-4">
            We are committed to providing you with experienced tutors who can help you achieve your academic goals.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Personalized Tutoring Services</h3>
          <p className=" mb-4">
            Why search for the best tuition near me when you can access a network of top-notch tutors online who are experts in their respective fields? Our team helps you discover an experienced and affordable tutor as per your needs who teaches online or at your doorstep according to your convenient timing. Study from the comfort of your home with our online and personalized home tuition services. Whether you are looking for tutors for all subjects, exam preparations, or boards for any city or location, you get the best mentors for your children.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Competent and experienced tutors for every subject</li>
            <li>Study from the comfort of your home - online or offline</li>
            <li>Affordable and Convenient Timing</li>
            <li>Engaging Learning Experience</li>
          </ul>
          <h3 className="text-2xl mb-4">Tutors for Academic Institutions</h3>
          <p className="mb-4">
            Looking to take Garuda Institute to new heights? Look no further! Our innovative and personalized tutoring services connect you with the best tutors in your area, ensuring that your students receive the one-on-one attention and support they need to excel. With Garuda Institute, you'll enjoy competitive pricing and a team of experienced educators dedicated to helping your students succeed. So stop searching for home tutors near me! Hire the best tutors for your academic institution with Garuda Institute today and watch your students soar!
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Affordable yet reliable tutoring services</li>
            <li>Access to top-notch tutors</li>
            <li>Presence in top-tier Cities</li>
            <li>Achieve high academic excellence with handpicked tutors</li>
          </ul>
        </div>

        {/* Right Side Image */}
        <div className="w-full md:w-1/2">
          <Image src={Tuitor} alt="Right Side Image" className="w-full h-auto rounded-lg shadow-md hover:opacity-90 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Tutors;
