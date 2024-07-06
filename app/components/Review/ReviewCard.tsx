import React, { FC } from 'react'
import Image from 'next/image'
import Ratings from '@/app/utils/Ratings';

type Props = {
    item: any;
}

const ReviewCard: FC<Props> = ({ item }) => {
    return (
        <div className="w-full h-max dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop:blur shadow-[bg-slate-700] 
        rounded-lg p-3 shadow-inner mt-[40px] text-justify">
            <div className="flex w-full">
                <Image src={item.avatar} alt="Review Avatar" className="w-[50px] h-[50px] rounded-full object-cover" width={50} height={50} />
                <div className="flex justify-between w-full pl-4">
                    <div>
                        <h5 className="text-[20px] text-black dark:text-white">
                            {item.name}
                        </h5>
                        <h6 className="text-[16px] text-black dark:text-[#ffffffab]">
                            {item.profession}
                        </h6>
                    </div>
                    <Ratings rating={4} />
                </div>
            </div>
            <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
                {item.comment}
            </p>
        </div>
    )
}

export default ReviewCard
