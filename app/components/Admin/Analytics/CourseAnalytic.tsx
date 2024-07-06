 'use-client'
import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList
} from 'recharts';
import { useGetCoursesAnalyticsQuery } from "../../../../redux/features/analtics/analyticsApi";

import Loader from '../../Loader/Loader';
import { style } from '../../../styles/style';

const CourseAnalytic = () => {
   const { data, isLoading, isError } = useGetCoursesAnalyticsQuery({});

  // const analyticsData = [
  //   { name: 'Jun 2023', uv: 3 },
  //   { name: 'July 2023', uv: 2 },
  //   { name: 'August 2023', uv: 5 },
  //   { name: 'Sept 2023', uv: 7 },
  //   { name: 'October 2023', uv: 2 },
  //   { name: 'Nov 2023', uv: 5 },
  //   { name: 'December 2023', uv: 7 },
  // ];

  const minValue = 0;

 const analyticsData:any = []

 data && data.courses.last12Months.forEach((item:any)=>{
  analyticsData.push({name:item.month , uv:item.count});
 })

 console.log(data)

  return (
   
    
    <div className="h-screen">
      <div className="mt-[50px]">
        <h1 className={`${style.title} px-5 !text-start`}>Courses Analytics</h1>
        <p className={`${style.label} px-5`}>Last 12 months analytics data</p>
      </div>
      <div className="w-full h-[90%] flex items-center justify-center">
        <ResponsiveContainer width="90%" height="50%">
          <BarChart width={150} height={300} data={analyticsData}>
            <XAxis dataKey="name">
              <Label offset={0} position="insideBottom" />
            </XAxis>
            <YAxis domain={[minValue, 'auto']} />
            <Bar dataKey="uv" fill="#3faf82">
              <LabelList dataKey="uv" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div> 
   
  );
};

export default CourseAnalytic;




// import React from "react";
// import { Chart as ChartJS, defaults } from "chart.js/auto";
// import { Bar, Doughnut, Line } from "react-chartjs-2";

// import "./CourseAnalytic.css";

// import revenueData from "./data/revenueData.json";
// import sourceData from "./data/sourceData.json";

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// // defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "black";

//  const CourseAnalytic = () => {
//   return (
//     <div className="App">
//       <div className="dataCard revenueCard">
//         <Line
//           data={{
//             labels: revenueData.map((data) => data.label),
//             datasets: [
//               {
//                 label: "Revenue",
//                 data: revenueData.map((data) => data.revenue),
//                 backgroundColor: "#064FF0",
//                 borderColor: "#064FF0",
//               },
//               {
//                 label: "Cost",
//                 data: revenueData.map((data) => data.cost),
//                 backgroundColor: "#FF3030",
//                 borderColor: "#FF3030",
//               },
//             ],
//           }}
//           options={{
//             elements: {
//               line: {
//                 tension: 0.5,
//               },
//             },
//             plugins: {
//               title: {
//                 text: "Monthly Revenue & Cost",
//               },
//             },
//           }}
//         />
//       </div>

//       <div className="dataCard customerCard">
//         <Bar
//           data={{
//             labels: sourceData.map((data) => data.label),
//             datasets: [
//               {
//                 label: "Count",
//                 data: sourceData.map((data) => data.value),
//                 backgroundColor: [
//                   "rgba(43, 63, 229, 0.8)",
//                   "rgba(250, 192, 19, 0.8)",
//                   "rgba(253, 135, 135, 0.8)",
//                 ],
//                 borderRadius: 5,
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               title: {
//                 text: "Revenue Source",
//               },
//             },
//           }}
//         />
//       </div>

//       <div className="dataCard categoryCard">
//         <Doughnut
//           data={{
//             labels: sourceData.map((data) => data.label),
//             datasets: [
//               {
//                 label: "Count",
//                 data: sourceData.map((data) => data.value),
//                 backgroundColor: [
//                   "rgba(43, 63, 229, 0.8)",
//                   "rgba(250, 192, 19, 0.8)",
//                   "rgba(253, 135, 135, 0.8)",
//                 ],
//                 borderColor: [
//                   "rgba(43, 63, 229, 0.8)",
//                   "rgba(250, 192, 19, 0.8)",
//                   "rgba(253, 135, 135, 0.8)",
//                 ],
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               title: {
//                 text: "Revenue Sources",
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };


// export default CourseAnalytic