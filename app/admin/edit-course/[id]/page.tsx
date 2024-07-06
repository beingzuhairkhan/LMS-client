'use-client'
import React from 'react'
import AdminSidebar from "../../../components/Admin/Sidebar/AdminSidebar"
import Heading from "../../../../app/utils/Heading"
import EditCourse from "../../../components/Admin/Course/EditCourse"
import DashboardHeader from '../../../components/Admin/DashboardHeader'
// import Header from "../../../../app/components/Header"

type Props ={}

const Page = ({params}:any) =>{
    const id  = params?.id
    
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
               <EditCourse id={id}/>

            </div>
         </div>
        </div>
     )
}

export default Page