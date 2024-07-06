'use client';

import React from 'react';
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import UserAnalytic from "../../components/Admin/Analytics/UserAnalytic";
import DashboardHeader from '../../components/Admin/DashboardHeader';

const Page = () => {
  return (
    <div>
      <Heading 
        title={`Elearning- Admin`}
        description="Elearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, AI-ML"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar/>
        </div>
        <div className="w-[85%]">
          <DashboardHeader/>
          <UserAnalytic/>
        </div>
      </div>
    </div>
  );
};

export default Page;
