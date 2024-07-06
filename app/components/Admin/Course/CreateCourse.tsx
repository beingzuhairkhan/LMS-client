'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation } from '../../../../redux/features/courses/coursesAPI'
import { toast } from 'react-hot-toast';
import { redirect } from 'next/navigation'
import Loader from '../../../components/Loader/Loader';
type Props = {}

const CreateCourse = () => {
   const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation()
   useEffect(() => {
      if (isSuccess) {
         redirect('/admin/courses')
         toast.success("Course created successfully")
      }
      if (error) {
         if ("data" in error) {
            const errorMsg = error as any
            toast.error(errorMsg.data.message)
         }
      }
   }, [isLoading , isSuccess , error])
   const [active, setActive] = useState(2)
   const [courseInfo, setCourseInfo] = useState({
      name: "",
      description: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      level: "",
      categories: "",
      demoUrl: "",
      thumbnail: "",
   })
console.log("categories" , courseInfo)
   const [benefits, setBenefits] = useState([{ title: "" }])
   const [prerequisites, setPrerequisites] = useState([{ title: "" }])
   const [courseContentData, setCourseContentData] = useState([
      {
         videoUrl: "",
         title: "",
         description: "",
         videoSection: "Untitled Section",
         videoLength:"",
         links: [
            {
               title: "",
               url: "",
            }
         ],
         suggestion: ""
      }
   ]);


   const [courseData, setCourseData] = useState({})
   console.log(courseData)

   const handleSubmit = async () => {
      const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
      const formattedPrerequisites = prerequisites.map((prerequisites) => ({ title: prerequisites.title }));

      const formattedContentData = courseContentData.map((courseContent) => ({
         videoUrl: courseContent.videoUrl,
         title: courseContent.title,
         description: courseContent.description,
         videoLength:courseContent.videoLength,
         videoSection: courseContent.videoSection,
         links: courseContent.links.map((link) => ({
            title: link.title,
            url: link.url,
         })),
         suggestion: courseContent.suggestion
      }))

      const data = {
         name: courseInfo.name,
         description: courseInfo.description,
         price: courseInfo.price,
         estimatedPrice: courseInfo.estimatedPrice,
         tags: courseInfo.tags,
         thumbnail: courseInfo.thumbnail,
         level: courseInfo.level,
         // categories: courseInfo.categories,
         demoUrl: courseInfo.demoUrl,
         totalVideos: courseContentData.length,
         benefits: formattedBenefits,
         prerequisites: formattedPrerequisites,
         courseData: formattedContentData
      }
      setCourseData(data)
   }
   // console.log(courseData.categories)

   const handleCourseCreate = async (e: any) => {
      const data = courseData;
      if(!isLoading){
         await createCourse(data)
      }
      
   }


   return (
      <>{
         isLoading ? (<Loader/>) : (

            <div className="w-full flex min-h-screen">
         <div className="w-[80%]">
            {
               active === 0 && (
                  <CourseInformation
                     courseInfo={courseInfo}
                     setCourseInfo={setCourseInfo}
                     active={active}
                     setActive={setActive}

                  />
               )
            }
            {
               active === 1 && (
                  <CourseData
                     benefits={benefits}
                     setBenefits={setBenefits}
                     prerequisites={prerequisites}
                     setPrerequisites={setPrerequisites}
                     active={active}
                     setActive={setActive}

                  />
               )
            }
            {
               active === 2 && (
                  <CourseContent
                     courseContentData={courseContentData}
                     setCourseContentData={setCourseContentData}
                     active={active}
                     setActive={setActive}
                     handleSubmit={handleSubmit}

                  />
               )
            }
            {
               active === 3 && (
                  <CoursePreview
                     courseData={courseData}
                     active={active}
                     setActive={setActive}
                     handleCourseCreate={handleCourseCreate}
                     isEdit={true}
                  />
               )
            }
         </div>
         <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
            <CourseOptions active={active} setActive={setActive} />

         </div>

      </div>
         )
      }
      </>
   )
}

export default CreateCourse