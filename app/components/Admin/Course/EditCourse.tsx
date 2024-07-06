'use client'

import React , {FC} from 'react'
import { useState, useEffect } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation , useGetAllCoursesQuery , useEditCourseMutation } from '@/redux/features/courses/coursesAPI'
import { toast } from 'react-hot-toast';
import { redirect } from 'next/navigation'
type Props = {
    id:string
}

const EditCourse:FC<Props> = ({id}) => {
    const [editCourse , {isSuccess , error}] = useEditCourseMutation()
  
   const {isLoading,  data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true })

   const editCourseData = data && data.course.find((i:any)=> i._id === id)
   console.log("edit data" , editCourseData)

   useEffect(() => {
      if (isSuccess) {
         refetch()
         toast.success("Course updated successfully")
         redirect('/admin/courses')
      }
      if (error) {
          if ("data" in error) {
            const errorMsg = error as any
            toast.error("Course updated Failed")
         }
      }
   }, [isLoading , isSuccess , error])


   const [active, setActive] = useState(0);

   useEffect(()=>{
    if(editCourseData){
        setCourseInfo({
            name: editCourseData.name,
            description: editCourseData.description,
            price: editCourseData.price,
            estimatedPrice: editCourseData.estimatedPrice,
            tags: editCourseData.tags,
            categories:editCourseData.categories,
            level: editCourseData.level,
            demoUrl:editCourseData.demoUrl,
            thumbnail: editCourseData?.thumbnail?.url,
        })
        setBenefits(editCourseData.benefits);
        setPrerequisites(editCourseData.prerequisites);
        setCourseContentData(editCourseData.courseData)
    }

   },[editCourseData])

   const [courseInfo, setCourseInfo] = useState({
      name: "",
      description: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      categories:"",
      level: "",
      demoUrl: "",
      thumbnail: "",
   })

   const [benefits, setBenefits] = useState([{ title: "" }])
   const [prerequisites, setPrerequisites] = useState([{ title: "" }])
   const [courseContentData, setCourseContentData] = useState([
      {
         videoUrl: "",
         title: "",
         description: "",
         videoSection: "Untitled Section",
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

   const handleSubmit = async () => {
      const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
      const formattedPrerequisites = prerequisites.map((prerequisites) => ({ title: prerequisites.title }));

      const formattedContentData = courseContentData.map((courseContent) => ({
         videoUrl: courseContent.videoUrl,
         title: courseContent.title,
         description: courseContent.description,
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
         demoUrl: courseInfo.demoUrl,
         totalVideos: courseContentData.length,
         benefits: formattedBenefits,
         prerequisites: formattedPrerequisites,
         courseContent: formattedContentData
      }
      setCourseData(data)
   }
   console.log(courseData)

   const handleCourseCreate = async (e: any) => {
      const data = courseData;
      await editCourse({id:editCourseData?._id , data})
      
   }


   return (
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

export default EditCourse