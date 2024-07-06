'use-client'
import React, { FC, useState , useEffect} from 'react'
import Ratings from '@/app/utils/Ratings'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { IoCloseOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import CoursePlayer from "../../utils/CoursePlayer"
import Link from 'next/link'
import { style } from '../../styles/style'
import CourseContentList from '../Course/CourseContentList'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from '../Payment/CheckOutForm'
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice"
import Image from 'next/image'
import { VscVerifiedFilled } from 'react-icons/vsc';
type Props = {
    data: any;
    clientSecret: string;
    stripePromise: any;
    setRoute:any;
    setOpen:any
}

const CourseDetails: FC<Props> = ({ data, clientSecret, stripePromise , setRoute , setOpen:openAuthModel }) => {
    // const { user } = useSelector((state: any) => state.auth)
    const { data: userData } = useLoadUserQuery(undefined, {})
    const user = userData?.user
    const [open, setOpen] = useState(false)
    const discountPercentage = ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
    const discountPercentagePrice = discountPercentage.toFixed(0)
    const isPurchased = user && user?.courses?.find((item: any) => item._id === data._id);
    const [authUser , setAuthUser] = useState<any>()

    useEffect(()=>{
        setAuthUser(userData?.user)

    },[userData])


    console.log(data)
    const handleOrder = (e: any) => {
        if (user) {
            setOpen(true);
        }else{
            setRoute("Login")
            openAuthModel(true)
        }
    }
    return (
        <div>
            <div className="w-[90%] 800px:w-[90%] m-auto py-5 ">
                <div className="w-full flex flex-col-reverse 800px:flex-row justify-text">
                    <div className="w-full 800px:w-[65%]  800px:pr-5 ">
                        <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
                            {data.name}
                        </h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                                <Ratings rating={data.ratings} />
                                <h1 className="text-black dark:text-white">{data.reviews?.length} Reviews</h1>
                            </div>
                            <h5 className="text-black dark:text-white ">{data.purchase} Students</h5>

                        </div>
                        <br />
                        {/* benefits */}
                        <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                            What you will learn from this course?
                        </h1>
                        <div>
                            {data.benefits?.map((item: any, index: number) => (
                                <div className="w-full flex 800px:items-center py-2 " key={index}>
                                    <div className="w-[15px] mr-1">
                                        <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                                    </div>
                                    <p className="pl-2 text-black dark:text-white text-justify">{item.title}</p>
                                </div>
                            ))}
                            <br />
                            <br />
                        </div>
                        {/* preques */}
                        <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                            What are the Prerequisites for starting this course ?
                        </h1>
                        <div>
                            {data.prerequisites?.map((item: any, index: number) => (
                                <div className="w-full flex 800px:items-center py-2" key={index}>
                                    <div className="w-[15px] mr-1">
                                        <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white " />
                                    </div>
                                    <p className="pl-2 text-black dark:text-white text-justify">{item.title}</p>

                                </div>
                            ))}
                            <br />
                            <br />
                            <div>
                                <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white " >
                                    Course Overview
                                </h1>
                                {/* courseContentlist */}
                                <CourseContentList data={data?.courseData} isDemo={true} />
                            </div>
                            <br />
                            <br />
                            <div className="w-full">
                                <h1 className="text-[18px] font-Poppins font-[600]   text-black dark:text-white ">
                                    Course Details
                                </h1>
                                <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden  text-black dark:text-white text-justify">
                                    {data.description}
                                </p>
                            </div>
                            <br />
                            <br />
                            <div className="w-full">
                                <h1 className="dark:text-white text-black font-[400px] text-[25px]"  >Reviews and Rating</h1>
                                <div className="800px:flex items-center">
                                    <Ratings rating={data?.ratings} />
                                    <div className="mb-2 800px:mb-[unset]">
                                        <h5 className="text-[18px] font-Poppins   text-black dark:text-white ">
                                            {Number.isInteger(data?.ratings) ? data?.ratings.toFixed(1) : data?.ratings.toFixed(2)}{" "}
                                            Course Rating . {data?.reviews?.length} Reviews
                                        </h5>
                                    </div>
                                    <br />
                                    {(data.reviews && [...data.reviews].reverse()).map((item: any, index: number) => (
                                        <div className="w-full pb-4" key={index}>
                                            <div className="flex">
                                                <div className="w-[50px] h-[50px] ">
                                                    <div className="w-[50px] h-[50px]">
                                                        <Image src={user?.avatar?.url} alt="Avatar" width={50} height={50} className="w-[50px] h-[50px] border-[3px] border-[#37a39a] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="hidden 800px:block pl-2 ">
                                                    <div className="flex items-center">
                                                        <h5 className=" text-[18px] pr-2  text-black dark:text-white " >
                                                            {item.user.name}

                                                        </h5>
                                                        <Ratings rating={item.rating} />
                                                    </div>

                                                    <p className="text-black dark:text-white ">
                                                        {item.comment}
                                                    </p>
                                                    <small className="text-[#000000d1] dark:text-[#ffffff83] "  >
                                                        {format(item.createdAt)} .
                                                    </small>
                                                </div>
                                                <div className="pl-2 flex 800px:hidden items-center" >
                                                    <h5 className=" text-[18px] pr-2  text-black dark:text-white ">
                                                        {item.user.name}
                                                    </h5>
                                                    <Ratings rating={item.rating} />
                                                </div>

                                            </div>
                                            {
                                                item.commentReplies.map((item: any, index: number) => (
                                                    <div className="w-full flex 800px:ml-16 my-5 " key={index} >
                                                        <div className="w-[50px] h-[50px]">
                                                            <Image src={user?.avatar?.url} alt="Avatar" width={50} height={50} className="w-[50px] h-[50px] border-[3px] border-[#37a39a] rounded-full object-cover" />
                                                        </div>
                                                        <div className="pl-2 ">
                                                            <div className="flex items-center">
                                                                <h5 className="text-[20px] dark:text-white text-black  ">{item.user.name}</h5> {item.user.role === 'admin' && <VscVerifiedFilled className="text-[green] ml-2 text-[20px]" />}
                                                            </div>
                                                            <p className="dark:text-white text-black" >{item.comment}</p>
                                                            <small className="dark:text-white text-black" >
                                                                {format(item.createdAt)}
                                                            </small>
                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="xl:w-[500px] xl:h-[800px] 800px:[35%] relative " >
                        <div className=" sticky top-[150px] left-0 z-50 w-full" >
                            <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
                            <div className="flex items-center">
                                <h1 className="pt-5 text-[25px] text-black dark:text-white " >
                                    {data.price === 0 ? "Free" : data.price + "$"}
                                </h1>
                                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white " >
                                    {data.estimatedPrice}$
                                </h5>
                                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white " >
                                    {discountPercentagePrice}%Off
                                </h4>
                            </div>
                            <div className="flex items-center">
                                {
                                    isPurchased ? (
                                        <Link className={`${style.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson] `} href={`/course-access/${data._id}`} >
                                            Enter to Course
                                        </Link>
                                    ) : (
                                        <div className={`${style.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson] `} onClick={handleOrder} >
                                            But Now {data.price}$
                                        </div>
                                    )
                                }
                            </div>
                            <br />
                            <p className="pb-1 text-black dark:text-white" >. Source Code Included</p>
                            <p className="pb-1 text-black dark:text-white" >. Full lifetime access</p>
                            <p className="pb-1 text-black dark:text-white" >. Certificate of Completion</p>
                            <p className="pb-1 text-black dark:text-white" >. Premium Support</p>
                        </div>
                    </div>

                </div>

            </div>
            <>
                {
                    open && (
                        <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center " >
                            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3  " >
                                <IoCloseOutline size={40} className="text-black cursor-pointer" onClick={() => setOpen(false)} />
                                <div className="w-full">
                                    {
                                        stripePromise && clientSecret && (
                                            <Elements stripe={stripePromise} options={{ clientSecret }} >
                                                <CheckOutForm setOpen={setOpen} data={data} user={user} />
                                            </Elements>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        </div>
    )
}

export default CourseDetails