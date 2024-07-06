import React ,{FC , useState , useEffect} from 'react'
import {useGetUsersAllCoursesQuery} from "@/redux/features/courses/coursesAPI"
import CourseCard from "../Course/CourseCard"
interface Course {
   id: string;
   name: string;
   description: string;
   // Add more properties as needed
}


const Courses = () =>{
    const {data , isLoading } = useGetUsersAllCoursesQuery({})
    const [courses , setCourses] = useState<any[]>([])
 useEffect(()=>{
    setCourses(data?.courses)

 },[data])
     return (
        <div className="border border-[#0000000e] dark:border-[#ffffff1e]">
           <div className={`w-[90%] 800px:w-[80%] m-auto mt-[30px]  `}>
            <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-xl lg:text-2xl dark:text-white 800px:!leading-[40px] text-[#000] font-[700] tracking-tight ">
                Expand Your Career {" "}
                <span className="text-gradient">Opportunity</span> <br/>
                 with Our Courses
                </h1>
                <br/>
                <br/>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0 ">
                {courses?.map((item: Course, index: number) => (
                   <>
                   <CourseCard item={item} key={index} />
                   


                   </>
          ))}
                </div>
           </div>
        </div>
     )
}

export default Courses