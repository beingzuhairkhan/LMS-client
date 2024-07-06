import React from 'react';
import { style } from "../styles/style";

const Policy = () => {
    return (
        <div className="dark:text-white text-black">
            <div className={`w-[95%] 800px:w-[92%] m-auto py-2 text-white px-3 flex justify-center`}>
                <h1 className={`${style.label} !text-start pt-2 text-[25px]`}>
                    Platform <span className="text-gradient">Terms</span> and Conditions
                </h1>
            </div>
            <ul className="ml-2 p-2 md:ml-6 lg:ml-[250px] xl:ml-[250px]  list-disc ">
                    <h2>1. Admission Policy:</h2>
                
                    <ul className="list-disc ml-6 xl:mb-4 lg:mb-4">
                        <li>Admissions are open to students from diverse backgrounds.</li>
                        <li>Applicants must complete the required forms and submit necessary documents for verification.</li>
                        <li>Admission is granted based on merit and availability of seats.</li>
                    </ul>
             
                
                    <h2>2. Attendance Policy:</h2>
                    <ul className="list-disc ml-6 lg:mb-4 xl:mb-4">
                        <li>Regular attendance is mandatory for all enrolled students.</li>
                        <li>Students must maintain a minimum attendance of 75% to be eligible for exams.</li>
                        <li>Absence due to valid reasons must be communicated in advance with appropriate documentation.</li>
                    </ul>
        
       
                    <h2>3. Code of Conduct:</h2>
                    <ul className="list-disc ml-6 lg:mb-4 xl:mb-4">
                        <li>Students are expected to maintain discipline and decorum within the institute premises.</li>
                        <li>Respect for faculty, staff, and fellow students is paramount.</li>
                        <li>Any form of misconduct or harassment will not be tolerated and will result in disciplinary action.</li>
                    </ul>
                
             
                    <h2>4. Fee Policy:</h2>
                    <ul className="list-disc ml-6 lg:mb-4 xl:mb-4">
                        <li>Fees must be paid in full by the specified due dates.</li>
                        <li>Late payment of fees may attract penalties as per the institute rules.</li>
                        <li>No refunds will be provided once the course has commenced.</li>
                    </ul>
              
          
                    <h2>5. Examination Policy:</h2>
                    <ul className="list-disc ml-6 lg:mb-4 xl:mb-4">
                        <li>Students must adhere to the examination schedule and guidelines provided.</li>
                        <li>Any form of cheating or malpractice during exams will result in immediate disqualification.</li>
                        <li>Results will be declared within a stipulated time frame post-examination.</li>
                    </ul>
            
            </ul>
        </div>
    );
}

export default Policy;
