"use client";
import React , {FC , useEffect} from 'react'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import {redirect} from 'next/navigation'
import Loader from '@/app/components/Loader/Loader';
import CourseContent from '../../components/Course/CourseContent'
type Props ={
    params?:any
}

const Page:FC<Props> = ({params}) =>{
    const id = params.id
    const {isLoading , error , data} = useLoadUserQuery(undefined,{})
    useEffect(()=>{
        if(data){
            const isPurchased = data.user.courses.find((item:any)=>item._id === id)
            if(!isPurchased){
                redirect("/")
            }
            if(error){
                redirect("/")
            }
        }

    },[data, error])
    console.log("name" , data)
     return (
        <>
        {
            isLoading ? (<Loader/>) :(
                <div>
                    <CourseContent id={id} user={data.user}/>
                </div>
            )
        }
        </>
     )
}

export default Page