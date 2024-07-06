import React, { FC, useState, useEffect } from 'react';
import { BiBorderLeft } from 'react-icons/bi';
import { PiUsersFourLight } from 'react-icons/pi';
import UserAnalytics from '../Analytics/UserAnalytic';
import { Box, CircularProgress } from '@mui/material';
import OrderAnalytic from '../Analytics/OrderAnalytic';
import AllInvoices from '../Order/AllInvoices';
import {
  useGetCoursesAnalyticsQuery,
  useGetUserAnalyticsQuery,
  useGetOrderAnalyticsQuery,
} from '../../../../redux/features/analtics/analyticsApi';

type Props = {
  open: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? 'info' : 'error'}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [orderComparePercentage, setOrderComparePercentage] = useState<{
    currentMonth?: number;
    previousMonth?: number;
    percentChange?: number;
  }>({});
  const [useComparePercentage, setUserComparePercentage] = useState<{
    currentMonth?: number;
    previousMonth?: number;
    percentChange?: number;
  }>({});

  const { data, isLoading } = useGetUserAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetCoursesAnalyticsQuery({});

  useEffect(() => {
    if (isLoading || ordersLoading || !data || !ordersData) {
      return;
    }

    const userLastTwoMonths = data?.users?.last12Months?.slice(-2);
    const orderLastTwoMonths = ordersData?.user?.last12Months?.slice(-2);

    if (userLastTwoMonths?.length === 2 && orderLastTwoMonths?.length === 2) {
      const userCurrentMonth = userLastTwoMonths[1]?.count || 0;
      const userPreviousMonth = userLastTwoMonths[0]?.count || 0;
      const ordersCurrentMonth = orderLastTwoMonths[1]?.count || 0;
      const ordersPreviousMonth = orderLastTwoMonths[0]?.count || 0;

      const usersPercentage =
        userPreviousMonth !== 0 ? ((userCurrentMonth - userPreviousMonth) / userPreviousMonth) * 100 : 100;
      const ordersPercentage =
        ordersPreviousMonth !== 0 ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100;

      setUserComparePercentage({
        currentMonth: userCurrentMonth,
        previousMonth: userPreviousMonth,
        percentChange: usersPercentage,
      });
      setOrderComparePercentage({
        currentMonth: ordersCurrentMonth,
        previousMonth: ordersPreviousMonth,
        percentChange: ordersPercentage,
      });
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  useEffect(() => {
    console.log('User Data:', data);
    console.log('Orders Data:', ordersData);
  }, [data, ordersData]);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-[75%,25%] gap-4 p-8">
        <div>
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow mb-8">
            <div className="flex p-5 justify-between">
              <div>
                <BiBorderLeft className="dark:text-[#45CBAB] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {orderComparePercentage?.currentMonth || 0}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>

              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4">
                  {orderComparePercentage?.percentChange !== undefined
                    ? (orderComparePercentage.percentChange > 0
                        ? `+${orderComparePercentage.percentChange.toFixed(2)}`
                        : `${orderComparePercentage.percentChange.toFixed(2)}`)
                    : '-'}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div>
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[38px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {useComparePercentage?.currentMonth || 0}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4">
                  {useComparePercentage?.percentChange !== undefined
                    ? (useComparePercentage.percentChange > 0
                        ? `+${useComparePercentage.percentChange.toFixed(2)}`
                        : `${useComparePercentage.percentChange.toFixed(2)}`)
                    : '-'}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order analytics */}
      <div className="grid grid-cols-[65%,35%] mt-[40px]">
        <div className="dark:bg-[#111C43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
          <OrderAnalytic isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
