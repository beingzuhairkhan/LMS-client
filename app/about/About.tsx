import React from 'react';
import { style } from '../styles/style';

const About = () => {
    return (
        <div className="dark:text-white text-black">
            <br />
            <h1 className={`${style.label} 800px:!text-[45px] flex justify-center`}>
                What is  <span className=" text-gradient ">  GARUDA INSTITUTE </span> ?
            </h1>
            <br />
            <div className="w-[95%] 800px:w-[85%] m-auto">
                <p className="text-[18px] font-Poppins text-justify">
                    Welcome to Garuda Institute! Founded by the esteemed Qasmi Maulana Zahid Hussain Shaikh, our institute is dedicated to providing top-notch education and training. Under the visionary leadership of Nooruddin Zahid Hussain Shaikh, we strive to empower students with the knowledge and skills necessary to excel in their academic and professional endeavors. Our mission is to create a learning environment that fosters intellectual growth, critical thinking, and a passion for lifelong learning.
                    <br /><br />
                    At Garuda Institute, we believe in the transformative power of education. Our comprehensive curriculum is designed to cater to the diverse needs of our students, ensuring that each individual receives the personalized attention they deserve. We offer a wide range of courses that span various disciplines, all taught by experienced and dedicated faculty members.
                    <br /><br />
                    Our state-of-the-art facilities provide students with the resources they need to succeed. From well-equipped classrooms to modern laboratories, we ensure that our students have access to the best tools and technologies available. Additionally, our library is stocked with a vast collection of books, journals, and digital resources to support their academic journey.
                    <br /><br />
                    Beyond academics, Garuda Institute is committed to the holistic development of our students. We encourage participation in extracurricular activities, community service, and leadership programs to help students develop essential life skills and a sense of social responsibility.
                    <br /><br />
                    Join us at Garuda Institute, where we are dedicated to nurturing the leaders of tomorrow. Together, we can achieve great heights and make a positive impact on the world.
                    <br /><br />
                  <div className="mt-6">
                        <span className="italic  font-cursive">
                            Nooruddin Zahid Hussain Shaikh
                        </span>
                        <br />
                        <span className="text-[20px] font-medium">CEO and Founder</span>
                    </div>
                </p>
            </div>
            <hr/>
        </div>
    );
}

export default About;
