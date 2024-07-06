"use client";
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Ratings from "../../utils/Ratings";

type Props = {
  item: any;
  isProfile: boolean;
};

const CourseLink: React.FC<Props> = ({ item, isProfile }) => (
  <Link href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}>
    <div className="flex flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium transition-transform-background motion-reduce:transition-none w-full md:min-h-[35vh] h-min rounded-lg p-3 bg-opacity-[.7] bg-[#ffffff25] dark:bg-slate-500 dark:bg-opacity-[.2] hover:shadow-lg hover:bg-opacity-100 dark:hover:bg-opacity-50 transition ease-in-out duration-300">
      <Image
        src={item?.thumbnail?.url || "/path/to/default/image.jpg"} // Add a default image if URL is not provided
        width={400}
        height={200}
        style={{ objectFit: "contain" }}
        className="rounded w-full"
        alt="Course Thumbnail"
      />
      <br />
      <h1 className="font-Poppins text-[16px] text-black dark:text-white p-2">
        {item.name}
      </h1>
      <div className="flex justify-between p-2">
        <h5>
          <Ratings rating={item.ratings} />
        </h5>
        <h5 className={`text-black dark:text-[#fff] ${isProfile && "hidden 800px:inline"}`}>
          {item.purchase} students
        </h5>
      </div>
      <div className="w-full flex items-center justify-between p-2">
        <div className="flex">
          <h3 className="text-black dark:text-white">
            {item.price === 0 ? "Free" : `${item.price}$`}
          </h3>
          <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-white">
            {item.estimatedPrice ? `${item.estimatedPrice}$` : ""}
          </h5>
        </div>
        <div className="flex items-center pb-3">
          <AiOutlineUnorderedList size={20} fill="#fff" />
          <h5 className="pl-2 text-black dark:text-white">
            {item.courseData?.length} lectures
          </h5>
        </div>
      </div>
    </div>
  </Link>
);

export default CourseLink;
