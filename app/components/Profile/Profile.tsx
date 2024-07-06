'use client'

import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideBarProfile from './SideBarProfile';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesAPI';
import CourseCard from '../../components/Course/CourseCard';

type Props = {
  user: any;
  
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const filteredCourses = user.course
        ?.map((userCourse: any) =>
          data.course?.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  const logOutHandler = () => {
    setLogout(true);
  };

  useEffect(() => {
    const handleLogout = async () => {
      if (logout) {
        await signOut({ redirect: false });
        toast.success('Logout successfully');
        router.push('/');
        setLogout(false); // Reset the logout state
      }
      
    };

    handleLogout();
  }, [logout]);

  return (
    <div className="w-[85%] flex mx-auto mt-[-80px]">
      <div
        className={`sm:w-[50px] md:w-[300px] lg:w-[450px] xl:w-[310px] h-[450px] bg-slate-900 bg-opacity-90 border border-[#ffffff1d] rounded-[5px] shadow-sm mt-[180px] mb-[80px] sticky ${
          scroll ? 'top-[128px]' : 'top-[30px]'
        }`}
      >
        <SideBarProfile
          user={user}
          avatar={avatar}
          active={active}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[150px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[150px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full flex justify-start mt-[150px] 800px:px-10 800px:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
            {data?.courses &&
              data?.courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} user={user} isProfile={true} />
              ))}
          </div>
          {data?.courses?.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins">
              You Don not have any Purchased Courses!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
