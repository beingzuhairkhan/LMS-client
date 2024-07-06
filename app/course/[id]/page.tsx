'use-client'
import React , {FC} from 'react'
import CourseDetailPage from '../../components/Course/CourseDetailPage'
type Props ={
    params:any
}

const Page:FC<Props> = ({params}) =>{
     return (
        <div>
            <CourseDetailPage id={params.id} />
        </div>
     )
}

export default Page