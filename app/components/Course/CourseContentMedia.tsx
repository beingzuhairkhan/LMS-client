"use-client";
import CoursePlayer from "../../utils/CoursePlayer"
import React, { FC, useState, useEffect } from 'react'
import { style } from '../../styles/style'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import { toast } from 'react-hot-toast'
import { useGetNewQuestionMutation, useAddAnswerInQuestionMutation, useAddReviewInCourseMutation, useGetCoursesDetailsQuery , useAddReplyInReviewMutation} from '../../../redux/features/courses/coursesAPI'
import { format } from 'timeago.js'
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from 'react-icons/vsc';
import Ratings from "@/app/utils/Ratings";
import socketIO from 'socket.io-client'
const ENDPOINT  = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ""
const socketId = socketIO(ENDPOINT , {transports:["websocket"]})

type Props = {
    data?: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void
    user?: any;
    refetch?: any
}


const CourseContentMedia: FC<Props> = ({ data, id, setActiveVideo, activeVideo, user, refetch }) => {
    const [activeBar, setActiveBar] = useState(0)
    const [question, setQuestion] = useState('')
    const [rating, setRating] = useState(1)
    const [answer, setAnswer] = useState("")
    const [questionId, setQuestionId] = useState("")
    const [review, setReview] = useState("")
    const [addNewQuestion, { isSuccess, error, isLoading: questionCreationLoading }] = useGetNewQuestionMutation({})
    const [addAnswerInQuestion, { isSuccess: answerSuccess, error: answerError }] = useAddAnswerInQuestionMutation()
    const [addReviewInCourse, { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewCreationLoading }] = useAddReviewInCourseMutation()
    const { data: courseData , refetch:courseRefetch } = useGetCoursesDetailsQuery(id , {refetchOnMountOrArgChange:true})
    const [isReviewReply , setIsReviewReply] = useState(false)
    const [reply , setReply] = useState('')
    const [addReplyInReview , {isSuccess:replySuccess , error:replyError , isLoading:replyCreationLoading}] = useAddReplyInReviewMutation()
    const [reviewId , setReviewId] = useState('')

    const handleQuestion = () => {
        if (question.length === 0) {
            toast.error("Question can't be empty")
        }
        else {
            addNewQuestion({
                question, courseId: id, contentId: data[activeVideo]._id
            })

        }
    }
    const course = courseData?.course

    useEffect(() => {
        if (isSuccess) {
            setQuestion("")
            refetch();
            toast.success("Question added SuccessFully")
            socketId.emit("notification" , {
                title:"New question Received",
                message:`You have a new question in ${data[activeVideo].title}`,
                userId:user._id
            })
        }
        if (answerSuccess) {
            setAnswer("")
            refetch()
            toast.success("Answer added successfully")
            if(user.role !== "admin"){
                socketId.emit("notification" , {
                    title:"New Reply Received",
                    message:`You have a new question reply in ${data[activeVideo].title}`,
                    userId:user._id
                })
            }
            
        }
        if (reviewSuccess) {
            setReview("")
            setRating(1)
            courseRefetch()
            toast.success("Review added successfully")
            socketId.emit("notification" , {
                title:"New question received",
                message:`You have a new question from ${data.course.name}`,
                userId:user._id
            })
        }
        if (replySuccess) {
            setReply("")
            courseRefetch()
            toast.success("Reply added successfully")
        }
        if (error) {
            toast.error("Error occur")
        }
        if (answerError) {
            toast.error("Failed added Answer")
        }
        if (reviewError) {
            toast.error("Failed added Review")
        }
        if (replyError) {
            toast.error("Failed added Reply")
        }
    }, [isSuccess, error, answerSuccess, answerError, reviewSuccess, reviewError , replySuccess , replyError])

    const handleAnswerSubmit = () => {
        // question, questionId , courseId, contentId
        addAnswerInQuestion({ answer, questionId: questionId, contentId: data[activeVideo]._id, courseId: id })

    }
    const handleReviewSubmit = async () => {
        if (review.length === 0) {
            toast.error("Review can't be empty")
        } else {
            addReviewInCourse({
                review, rating, courseId: id
            })
        }

    }
    const isReviewExists = course?.reviews?.find((item: any) => item.user._id === user._id)

    const handleReviewReplySubmit = ()=>{
     if(!replyCreationLoading){
        if(reply === ''){
            toast.error("Reply Can't be Empty")
           }else{
            addReplyInReview({comment:reply , courseId:id , reviewId})
           }
     }
    }

    console.log("name2", user)

    return (
        <div className="w-full min-h-screen 800px:w-[86%] py-4 m-auto  ">
            <CoursePlayer title={data[activeVideo]?.title} videoUrl={data[activeVideo]?.videoUrl} />
            <div className="w-full flex items-center justify-between my-3 ">
                <div className={`${style.button}text-white  !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"} `} onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}>
                    <AiOutlineArrowLeft className="mr-2" />
                    Prev Lesson

                </div>
                <div className={`${style.button}text-white   !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"} `} onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}>
                    <AiOutlineArrowRight className="mr-2" />
                    Next Lesson

                </div>
            </div>
            <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black ">{data[activeVideo].title}</h1>
            <br />

            <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner ">
                {['Overview', 'Resources', 'Q&A', "Reviews"].map((text, index) => (
                    <h5 key={index} className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : "dark:text-white text-black "}`} onClick={() => setActiveBar(index)} >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {
                activeBar === 0 && (
                    <p className="text-[18px] dark:text-white text-black  whitespace-pre-line mb-3  ">
                        {data[activeVideo]?.description}
                    </p>
                )
            }
            {
                activeBar === 1 && (

                    <div>
                        {
                            data[activeVideo]?.links.map((item: any, index: number) => (
                                <div className="">
                                    <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black  " key={index}>
                                        {item.title && item.title + " :"}
                                    </h2>
                                    <a className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2 dark:text-white  " href={item.url} >
                                        {item.url}

                                    </a>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                activeBar === 2 && (
                    <>
                        <div className="w-full flex  ">
                            <Image src={user.avatar ? user.avatar.url : ""} width={50} height={50} alt="" className="w-[50px] h-[50px] border-[3px] border-[#37a39a] rounded-full object-cover" />
                            <textarea name="" value={question} onChange={(e) => setQuestion(e.target.value)} id="" cols={40} rows={5} placeholder="Write your Questions..."
                                className="outline-none bg-transparent ml-3 border border-[#4395c4]  800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins  "
                            ></textarea>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className={`${style.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreationLoading && 'cursor-not-allowed'} `}
                                onClick={questionCreationLoading ? () => { } : handleQuestion}
                            >Submit</div>

                        </div>
                        <br />
                        <br />
                        <div className="w-full h-[1px] bg-[#ffffff3b] ">
                            <div>
                                <CommentReply data={data} activeVideo={activeVideo} answer={answer} setAnswer={setAnswer} handleAnswerSubmit={handleAnswerSubmit} user={user}
                                    setQuestionId={setQuestionId} />
                            </div>

                            <hr />
                        </div>
                    </>
                )
            }
            {
                activeBar === 3 && (
                    <div className="w-full">
                        <>
                            {
                                !isReviewExists && (
                                    <>
                                        <div className="flex w-full">
                                            <Image src={user.avatar ? user.avatar.url : ""} width={50} height={50} alt="" className="w-[50px] h-[50px] border-[3px] border-[#37a39a] rounded-full object-cover" />
                                            <div className="w-full">
                                                <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                                                    Give a Rating <span className="text-red-500" >*</span>
                                                </h5>
                                                <div className="flex w-full ml-2 pb-3">
                                                    {[1, 2, 3, 4, 5].map((i) => rating >= i ? (
                                                        <AiFillStar key={i} className="mr-1 cursor-pointer " color='rgb(246 , 186 , 0' size={25} onClick={() => setRating(i)} />
                                                    )
                                                        : (
                                                            <AiOutlineStar key={i} className="mr-1 cursor-pointer " color='rgb(246 , 186 , 0' size={25} onClick={() => setRating(i)} />
                                                        )
                                                    )}
                                                </div>
                                                <textarea name="" value={review} onChange={(e) => setReview(e.target.value)} id="" cols={40} rows={5} placeholder="Write your Review..."
                                                    className="outline-none bg-transparent ml-3 border border-[#4395c4]  800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins  "
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-end">
                                            <div className={`${style.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${reviewCreationLoading && "cursor-no-drop"} `}
                                                onClick={reviewCreationLoading ? () => { } : handleReviewSubmit}
                                            >Submit</div>
                                        </div>
                                    </>
                                )
                            }
                            <br />
                            <div className="w-full h-[1px] bg-[#ffffff3b]">
                                {course?.reviews?.reverse().map((item: any, index: number) => (
                                    <div className="w-full my-5 dark:text-white text-black" key={index}>
                                        <div className="flex w-full">
                                            <div>
                                                <Image
                                                    src={item?.user.avatar?.url}
                                                    alt="Avatar"
                                                    width={50}
                                                    height={50}
                                                    className="w-[50px] h-[50px] border-[3px] border-[#37a39a] rounded-full object-cover"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <h1 className="text-[18px]">{item?.user.name}</h1>
                                                <Ratings rating={item.rating} />
                                                <p className="dark:text-white text-black">{item.comment}</p>
                                                <small className=" dark:text-white text-black">{format(item.createdAt)}</small>
                                            </div>
                                        </div>
                                        {
                                            user.role === 'admin' && (
                                                <span className={`${style.label} !ml-12 cursor-pointer `} onClick={()=>{setIsReviewReply(true) ; setReviewId(item._id)}} >Add Reply  </span>
                                            )
                                        }
                                        {
                                isReviewReply && (
                                    <div className="w-full flex relative" >
                                    <input type="text" name="" id="" placeholder="Enter your reply.." className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]`}
                                    value={reply} onChange={(e:any)=>setReply(e.target.value)}
                                    />
                                    <button type="submit" className="absolute right-0 bottom-0" onClick={handleReviewReplySubmit} >Submit</button>
                                    </div>
                                )
                            }
                            {
                                item.commentReplies.map((item:any , index:number)=>(
                                    <div className="w-full flex 800px:ml-16 my-5 " key={index}>
                                        <div className="w-[50px] h-[50px]">
                                        <Image src={user?.avatar?.url} alt="Avatar" width={50} height={50} className="w-[50px] h-[50px] border-[3px] border-[#37a39a] rounded-full object-cover" />
                                        </div>
                                        <div className="pl-2 ">
                                            <div className="flex items-center">
                                            <h5 className="text-[20px]  ">{item.user.name}</h5> {item.user.role === 'admin' && <VscVerifiedFilled className="text-[green] ml-2 text-[20px]" />}
                                            </div>
                                               <p>{item.comment}</p>
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
                          
                            



                        </>
                    </div>
                )
            }


        </div >
    )
}


const CommentReply = ({ data, activeVideo, answer, setAnswer, handleAnswerSubmit, user, setQuestionId, answerCreationLoading }: any) => {

    console.log("name3", user)
    return (
        <>
            <div className="w-full my-3 min-h-[70vh]">
                {
                    data[activeVideo].question?.map((item: any, index: any) => (
                        <CommentItem key={index} data={data} activeVideo={activeVideo} answer={answer} setAnswer={setAnswer} handleAnswerSubmit={handleAnswerSubmit} index={index} item={item} user={user}
                            setQuestionId={setQuestionId} answerCreationLoading={answerCreationLoading} />
                    ))
                }
            </div>
        </>

    )
}


const CommentItem = ({ data, activeVideo, answer, setAnswer, handleAnswerSubmit, item, user, setQuestionId, answerCreationLoading }: any) => {
    const [replyActive, setReplyActive] = useState(false)
    return (
        <>
            <div className="my-4 mt-2 ">

                <div className="flex mb-2">
                    <Image src={user?.avatar?.url} alt="Avatar" width={50} height={50} className="w-[50px] h-[50px] border-[3px] border-[#37a39a] rounded-full object-cover" />
                    <div className="pl-3">
                        <h5 className="text-[20px] dark:text-white text-black ">{user.name}</h5>
                        <p className="dark:text-white text-black " >{item?.question}</p>
                        <small className="dark:text-white text-black" >{!item.createdAt ? "" : format(item?.createdAt)}.</small>
                    </div>
                </div>
                <div className="w-full flex">
                    <span className="800px:pl-16 dark: text-[#ffffff83]  text-black cursor-pointer mr-2" onClick={() => { setReplyActive(!replyActive); setQuestionId(item._id) }} >
                        {!replyActive ? item.questionReplies.length !== 0 ? "All Replies" : "Add Replies " : "Hide Replies"}
                    </span>
                    <BiMessage size={20} className="cursor-pointer dark:text-white text-black" />
                    <span className="pl-1 mt-[-4px] cursor-pointer dark:text-white text-black " >
                        {item.questionReplies.length}
                    </span>
                </div>
                {
                    replyActive && (
                        <>
                            {item.questionReplies.map((item: any, index: any) => (
                                <div className="w-full flex 800px:ml-16 my-5 dark:text-white text-black" key={index}>
                                    <div>
                                        <Image src={user?.avatar?.url} alt="Avatar" width={50} height={50} className="w-[50px] h-[50px] border-[3px] border-[#37a39a] rounded-full object-cover" />
                                    </div>
                                    <div className="pl-2">
                                        <div className="flex items-center ">
                                            <h5 className="text-[20px] ">{item.user.name}</h5> {item.user.role === 'admin' && <VscVerifiedFilled className="text-[green] ml-2 text-[20px]" />}
                                        </div>
                                        <p className="dark:text-white text-black">{item.answer}</p>
                                        <small className="dark:text-white text-black" >
                                            {format(item.createdAt)}.
                                        </small>
                                    </div>

                                </div>

                            ))}
                            <>
                                <div className="w-full flex relative dark:text-white text-black">
                                    <input type="text" placeholder="Enter your Answer... " value={answer} onChange={(e: any) => setAnswer(e.target.value)}
                                        className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-white
                                 ${answer === "" || answerCreationLoading && "cursor-no-drop"

                                            }
                            p-[15px] w-[95%]
                            `} />
                                    <button type="submit" className="absolute right-0 bottom-1" onClick={handleAnswerSubmit} disabled={answer === "" || answerCreationLoading} >
                                        Submit
                                    </button>
                                </div>


                            </>
                        </>
                    )
                }
            </div>

        </>

    )
}

export default CourseContentMedia