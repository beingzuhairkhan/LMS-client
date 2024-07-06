import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Image from 'next/image';
import Link from 'next/link';
import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import Bot from "../../../public/assets/bot.png";
import Banner from '../../../public/assets/banner.svg';

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <section className="hero flex flex-col lg:flex-row items-center justify-between overflow-hidden scroll-smooth">
      <div className="hero-image rounded-full lg:rounded-none overflow-hidden relative lg:w-[650px] lg:h-[650px] lg:pl-5 md:w-[50%] w-full sm:p-2">
        <Image
          src={data?.layout?.banner?.image?.url || Banner}
          width={400}
          height={400}
          alt="Banner Image"
          className="object-contain w-full h-full sm:mt-4 sm:p-4"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-[30px]">
        <h2 className="dark:text-white text-[#000000c7] text-[24px] mt-[50px] sm:text-[30px] sm:font-[100] md:text-[40px] lg:text-[50px] lg:font-[100] font-Josefin py-2 leading-tight mt-[110px] lg:leading-[75px]">
          Transform Your Learning Journey with <span className="text-gradient">Garuda</span>
          <br />
          <span className="text-gradient">Institute </span> !
          {/* {data?.layout?.banner?.title} */}
        </h2>
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[16px] sm:text-[18px] w-full lg:w-[80%] mt-4">
          We have 50+ courses & 10K+ registered students. Find your desired Courses from them.
          {/* {data?.layout?.banner?.subTitle} */}
        </p>

        <div className="w-full lg:w-[80%] h-[50px] bg-transparent relative mt-6 dark:text-white text-black">
          <input
            type="search"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border dark:border-none dark:bg-[#575757] text-black dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[16px] sm:text-[18px] font-[500]"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]" onClick={handleSearch}>
            <BiSearch className="text-white" size={30} />
          </div>
        </div>

        <div className="w-full lg:w-[80%] flex items-center mt-10">
          <Image
            src={require('../../../public/assets/avt1.jpeg')}
            alt="Client 1"
            className="rounded-full"
            width={50}
            height={50}
          />
          <Image
            src={require('../../../public/assets/avt2.png')}
            alt="Client 2"
            className="rounded-full ml-[-20px]"
            width={50}
            height={50}
          />
          <Image
            src={require('../../../public/assets/avt3.png')}
            alt="Client 3"
            className="rounded-full ml-[-20px]"
            width={50}
            height={50}
          />
          <p className="ml-[20px] mb-[20px] font-Josefin dark:text-[#edfff4] text-[#00000063] text-[16px] sm:text-[18px] font-[600] mt-4">
            20K+ People already trusted us.
            <Link href="/courses" className="dark:text-[#46e256] text-[crimson] ml-2">
              View Courses
            </Link>
          </p>
        </div>

        <div className="fixed bottom-5 right-10 800px:bottom-4 800px:right-4 animate-bounce">
          <a href="https://mediafiles.botpress.cloud/250d0195-0d6e-4132-9c5e-ac69d54d78ca/webchat/bot.html">
            <Image className="rounded-full" src={Bot} width={70} height={70} alt="Bot" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
