'use client';

import React from 'react';
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import CourseAnalytic from "../../components/Admin/Analytics/CourseAnalytic";
import DashboardHeader from '../../components/Admin/DashboardHeader';

const Page = () => {
  return (
    <div>
      <Heading 
        title={`Garuda Institute - Admin`}
        description={"Garuda Institute is a leading educational institution providing quality education to students. Our expert faculty, state-of-the-art infrastructure, and student-centric approach make us a top choice for students seeking academic excellence. "}
        keywords={"Garuda Institute"}
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar/>
        </div>
        <div className="w-[85%]">
          <DashboardHeader/>
          <CourseAnalytic/>
        </div>
      </div>
    </div>
  );
};

export default Page;
