'use client';

import React, { FC } from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
import { useGetUserAnalyticsQuery } from "../../../../redux/features/analtics/analyticsApi";
import Loader from '../../Loader/Loader';
import { style } from '../../../styles/style';

type Props = {
  isDashboard?: boolean;
};

const UserAnalytic: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading, isError } = useGetUserAnalyticsQuery({});

  // Sample analytics data
//   const analyticsData = [
//     { name: 'Jun 2023', uv: 3 },
//     { name: 'July 2023', uv: 2 },
//     { name: 'August 2023', uv: 5 },
//     { name: 'Sept 2023', uv: 7 },
//     { name: 'October 2023', uv: 2 },
//     { name: 'Nov 2023', uv: 5 },
//     { name: 'December 2023', uv: 7 },
//     { name: 'Jun 2023', uv: 3 },
//     { name: 'July 2023', uv: 2 },
//     { name: 'August 2023', uv: 5 },
//     { name: 'Sept 2023', uv: 7 },
//     { name: 'October 2023', uv: 2 },
//     { name: 'Nov 2023', uv: 5 },
//     { name: 'December 2023', uv: 7 },
//   ];

  
  const analyticsData:any = [];

  data && data.users.last12Months.forEach((item:any)=>{
    analyticsData?.push({name:item.month , uv:item.count});
  })





  return (
    <div className={`${isDashboard ? "mt-[65px] dark:bg-[#111C43] p-6" : "mt-[50px] dark: shadow-sm pb-5 rounded-sm"}`}>
      <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
        <h1 className={`${style.title} ${isDashboard ? "text-[20px]" : ""} px-5 !text-start`}>
          Users Analytics
        </h1>
        {isDashboard && (
          <p className={`${style.label} px-5`}>
             last 12 months data {" "}
          </p>
        )}
      </div>
      <div className={`w-full ${isDashboard ? 'h-[30vh] ' : 'h-screen'} flex items-center justify-center`}>
        <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={isDashboard ? "130%" : "50%"}>
          <AreaChart data={analyticsData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#4d62d9" fill="#4d62d9" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalytic;
