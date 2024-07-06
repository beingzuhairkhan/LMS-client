import React, { FC } from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useGetOrderAnalyticsQuery } from '@/redux/features/analtics/analyticsApi'; // Double-check this import path
import Loader from '../../Loader/Loader';
import { style } from '../../../styles/style'; // Double-check this import path

// const analyticsData = [
//   { name: "page A", count: 40 },
//   { name: "page B", count: 409900 },
//   { name: "page C", count: 4000 },
//   { name: "page D", count: 400 },
//   { name: "page E", count: 4000 },
//   { name: "page F", count: 1000 },
// ];

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics: FC<Props> = ({ isDashboard }) => {
  const {data ,  isLoading } = useGetOrderAnalyticsQuery({}); // Make sure this hook is correctly imported and used

  const analyticsData:any = []
  data && data.orders?.last12Months.forEach((item:any)=>{
    analyticsData?.push({name:item.month , Count:item.count});
  })


  return (
    <div className={isDashboard ? 'h-[30vh]' : 'h-screen'}>
      <div className={isDashboard ? 'mt-[0px] pl-[40px] mb-2' : 'mt-[30px]'}>
        <h1 className={`${style.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
          Orders Analytics
        </h1>
        {isDashboard && (
          <p className={`${style.label} px-5`}>Last 12 months analytics data</p>
        )}
      </div>
      <div className={`w-full ${isDashboard ? 'h-[70%]' : 'h-full'} flex items-center justify-center`}>
        <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={isDashboard ? '100%' : '50%'}>
          <LineChart data={analyticsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {!isDashboard && <Legend />}
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersAnalytics;
