import React, { useState, useEffect } from 'react';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { style } from '../../styles/style';
import Loader from '../Loader/Loader'
interface FAQData {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { data, refetch , isLoading} = useGetHeroDataQuery("FAQ", { refetchOnMountOrArgChange: true });
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [questions, setQuestions] = useState<FAQData[]>([]);

  useEffect(() => {
    if (data?.layout?.faq) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
  <>
  {
    isLoading ? (<Loader/>) : (
      <div className="w-[90%] 800px:w-[80%] m-auto">
      <h1 className={`${style.title} 800px:text-[40px]`}>
        Frequently <span className="text-gradient">Asked</span> Questions
      </h1>
      <div className="mt-12">
        <dl className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className={`${q._id !== questions[0]?._id && "border-t" } border-gray-200 pt-6`}>
              <dt className="text-lg">
                <button
                  className="flex items-start justify-between w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <span className="font-medium text-black dark:text-white">{q.question}</span>
                  <span className="ml-6 flex-shrink-0">
                    {activeQuestion === q._id ? (
                      <HiMinus className="h-6 w-6 text-black dark:text-white" />
                    ) : (
                      <HiPlus className="h-6 w-6 text-black dark:text-white" />
                    )}
                  </span>
                </button>
              </dt>
              {activeQuestion === q._id && (
                <dd className="mt-2 pr-12">
                  <p className="text-base font-Poppins text-black dark:text-white">{q.answer}</p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
      <br />
      <br />
      <br />
    </div>
    )
}
  </>
  );
};

export default FAQ;
