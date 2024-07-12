import React from 'react';
import Image from 'next/image';
import T1 from '../../public/assets/T1.jpeg';
import T2 from '../../public/assets/T2.jpeg';
import T3 from '../../public/assets/T3.jpeg';

type Props = {};

const Toppers = (props: Props) => {
  return (
    <div>
       <h1 className="text-3xl font-bold mb-4 flex justify-center dark:text-white text-black"><span className="text-gradient">Garuda&apos;s </span> Toppers</h1>
      <div className="w-full flex flex-wrap justify-center gap-4 p-1">
        {[T1, T2, T3].map((image, index) => (
          <div
            key={index}
            className="group relative w-full sm:w-96 h-64 md:w-120 md:h-72 lg:w-174 lg:h-80 overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <Image
              src={image}
              alt={`Topper ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-white text-lg font-bold">Topper {index + 1}</h2>
            </div>
          </div>
        ))}
      </div>
      <hr className="mt-2 mb-2" />
    </div>
  );
};

export default Toppers;
