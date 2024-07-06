'use client'

import React from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../../hooks/adminProtected'
import DashboardHero from "../../components/Admin/DashboardHero"
import AllUsers from '../../components/Admin/Users/AllUsers'
type Props ={}

const Page = () =>{
    return (
        <div>
          <AdminProtected>
               <Heading
          title={`Garuda Institute - Admin`}
          description={"Garuda Institute is a leading educational institution providing quality education to students. Our expert faculty, state-of-the-art infrastructure, and student-centric approach make us a top choice for students seeking academic excellence. "}
          keywords={"Garuda Institute"}
        />
        <div className="flex h-screen">
            <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar/>
            </div>
            <div className="w-[85%]">
                <DashboardHero/>
                <AllUsers/>
            </div>
        </div>
        </AdminProtected>
        </div>
     )
}

export default Page

