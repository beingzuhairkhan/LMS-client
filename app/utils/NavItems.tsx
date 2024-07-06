import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { RiHome2Line, RiBook2Line, RiInformationLine, RiFileList2Line, RiQuestionLine } from 'react-icons/ri';
import icon2 from '../../public/assets/icon2.jpeg';

export const navItemsData = [
  {
    name: 'Home',
    url: '/',
    icon: RiHome2Line,
  },
  {
    name: 'Courses',
    url: '/courses',
    icon: RiBook2Line,
  },
  {
    name: 'About',
    url: '/about',
    icon: RiInformationLine,
  },
  {
    name: 'Policy',
    url: '/policy',
    icon: RiFileList2Line,
  },
  {
    name: 'FAQ',
    url: '/faq',
    icon: RiQuestionLine,
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className='hidden md:flex'>
        {navItemsData.map((item, index) => (
          <Link href={item.url} key={index} passHref>
            <span
              className={`${
                activeItem === index ? 'dark:text-[#37a39a] text-[crimson]' : 'dark:text-white text-black'
              } text-[18px] px-6 font-Poppins font-[400] flex items-center space-x-2 cursor-pointer transition-colors duration-300 hover:text-[crimson]`}
            >
              {isMobile && <item.icon className='text-xl' />}
              <span>{item.name}</span>
            </span>
          </Link>
        ))}
      </div>
      {isMobile && (
        <div className='md:hidden mt-5'>
          <div className='text-center py-6'>
            <Link href='/' passHref>
              <span className='animate-bounce flex items-center justify-center text-black dark:text-white'>
                <Image className='rounded-r-[50%] rounded-l-[50%]' width={120} height={120} src={icon2} alt='icon' />
              </span>
            </Link>
          </div>
          <div className='w-full text-center py-6'>
            {navItemsData.map((item, index) => (
              <Link href={item.url} key={index} passHref>
                <span className='flex items-center justify-center py-2 cursor-pointer transition-colors duration-300 hover:text-[crimson] dark:text-white text-black'>
                  <item.icon className='text-xl' />
                  <span
                    className={`ml-3 ${
                      activeItem === index ? 'dark:text-[#37a39a] text-[crimson]' : 'dark:text-white text-black'
                    } text-[18px] font-Poppins font-[400]`}
                  >
                    {item.name}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
