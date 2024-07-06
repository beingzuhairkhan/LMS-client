import React, { FC, useState, useEffect } from 'react';
import { useGetHeroDataQuery , useEditLayoutMutation } from '../../../../redux/features/layout/layoutApi';
import { style } from '../../../styles/style';
import { AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { toast } from 'react-hot-toast'
import Loader from '../../../components/Loader/Loader'
type Props = {};

const EditFaq: FC<Props> = () => {
    const [questions, setQuestions] = useState<any[]>([]);
    const { data, refetch } = useGetHeroDataQuery("FAQ", { refetchOnMountOrArgChange: true });
    const [editLayout , {isLoading,  isSuccess:layoutSuccess , error}] = useEditLayoutMutation();

    useEffect(() => {
        if (data) {
            setQuestions(data.layout?.faq);
        }
        if(layoutSuccess){
            toast.success("FAQ updated SuccessFully")
        }
        if(error){
            toast.error("FAQ updation Failed")
        }
    }, [data , layoutSuccess , error]);

    const toggleQuestion = (id: string) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question._id === id ? { ...question, active: !question.active } : question
            )
        );
    };

    const handleQuestionChange = (id: string, value: string) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question._id === id ? { ...question, question: value } : question
            )
        );
    };

    const handleAnswerChange = (id: string, value: string) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question._id === id ? { ...question, answer: value } : question
            )
        );
    };

    const handleDelete = (id: string) => {
        setQuestions(prevQuestions => prevQuestions.filter(question => question._id !== id));
    };

    const handleEdit =async () => {
        if(!areQuestionsUnchanged(data.layout?.faq, questions)&& !isAnyQuestionEmpty(questions)){
            await editLayout({
                type:"FAQ",
                faq:questions,

            })
        }
    };

    const newFaqHandler = () => {
        setQuestions([...questions, { _id: Date.now().toString(), question: "", answer: "", active: false }]);
    };

    const areQuestionsUnchanged = (originalQuestions: any[], currentQuestions: any[]) => {
        return JSON.stringify(originalQuestions) === JSON.stringify(currentQuestions);
    };

    const isAnyQuestionEmpty = (questions: any[]) => {
        return questions.some(question => !question.question || !question.answer);
    };

    const isSaveButtonActive =
     data && data?.layout && data?.layout?.faq &&  !areQuestionsUnchanged(data?.layout?.faq, questions) && !isAnyQuestionEmpty(questions);

    return (
        <>{
           isLoading ? (<Loader/>) :(
            <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
                <div className="mt-12">
                    <dl className="space-y-8">
                        {questions?.map((q: any) => (
                            <div key={q._id} className={`border-gray-200 pt-6 ${q._id === questions[0]._id && "border-t"}`}>
                                <dt className="text-lg">
                                    <button
                                        className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                                        onClick={() => toggleQuestion(q._id)}
                                    >
                                        <input
                                            className={`${style.input} border-none`}
                                            value={q.question}
                                            onChange={(e: any) => handleQuestionChange(q._id, e.target.value)}
                                            placeholder="Add your question..."
                                        />
                                        <span className="ml-6 flex-shrink-0">
                                            {q.active ? <HiMinus className="h-6 w-6" /> : <HiPlus className="h-6 w-6" />}
                                        </span>
                                    </button>
                                </dt>
                                {q.active && (
                                    <dd className="mt-2 pr-12">
                                        <input
                                            className={`${style.input} border-none`}
                                            value={q.answer}
                                            onChange={(e: any) => handleAnswerChange(q._id, e.target.value)}
                                            placeholder="Add your answer..."
                                        />
                                        <span className="ml-6 flex-shrink-0">
                                            <AiOutlineDelete
                                                className="dark:text-white text-black text-[18px] cursor-pointer"
                                                onClick={() => handleDelete(q._id)}
                                            />
                                        </span>
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                    <br />
                    <br />
                    <IoMdAddCircleOutline
                        className="dark:text-white text-black text-[25px] cursor-pointer"
                        onClick={newFaqHandler}
                    />
                    <br />
                    <br />
                    <div
                        className={`${style.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${isSaveButtonActive ? "!cursor-pointer !bg-[#42d383]" : "!cursor-not-allowed"
                            } !rounded absolute bottom-12 right-12`}
                        onClick={isSaveButtonActive ? handleEdit : undefined}
                    >
                        Save
                    </div>
                </div>
            </div>
           )
        }
        </>
    );
};

export default EditFaq;
