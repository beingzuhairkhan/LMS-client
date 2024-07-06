import React from 'react'
import Image from 'next/image'
import { style } from '../../styles/style'
import ReviewCard from "../Review/ReviewCard"



export const reviews = [
    {
        "name": "Aryan Khan",
        "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
        "profession": "Full Stack Web Developer",
        "comment": "I had the pleasure of attending Garuda Institute, and I can confidently say that it was an excellent choice for my education. The institute is committed to providing high-quality education and fostering an environment that encourages growth and innovation."
    },
    {
        "name": "Priya Reddy",
        "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
        "profession": "Graphic Designer",
        "comment": "Teachers often aim to inspire, encourage and motivate their students to learn, grow and progress in both their academic and personal lives. It's common for professionals in this role to comment on students' report cards and homework and offer advice whenever possible in the classroom to help them learn and succeed in school. If you're hoping to inspire and motivate your students, learning about encouraging comments that you can give them can be helpful."
    },
    {
        "name": "Emily Johnson",
        "avatar": "https://randomuser.me/api/portraits/women/3.jpg",
        "profession": "Content Writer",
        "comment": "The faculty at Garuda Institute are highly knowledgeable and dedicated to their students' success. The curriculum is well-structured and offers a perfect blend of theoretical knowledge and practical application. The hands-on projects and case studies were particularly beneficial in preparing me for real-world challenges.One of the standout features of Garuda Institute is its supportive community. From the administrative staff to the professors, everyone is approachable and eager to assist. The institute fosters a collaborative environment where students can thrive both academically and personally."
    },
    {
        "name": "Karthik Kumar",
        "avatar": "https://randomuser.me/api/portraits/men/4.jpg",
        "profession": "SEO Specialist",
        "comment":"The campus is equipped with modern facilities and resources that enhance the learning experience. "
    },
    {
        "name": "Sarah Davis",
        "avatar": "https://randomuser.me/api/portraits/women/5.jpg",
        "profession": "Marketing Manager",
        "comment": "Garuda Institute encourages students to participate in extracurricular activities, which play a crucial role in personal development. The wide range of clubs and organizations allowed me to pursue my interests and develop new skills."
    },
     {
        "name": "Aditya Sharma",
        "avatar": "https://randomuser.me/api/portraits/men/6.jpg",
        "profession": "Financial Analyst",
        "comment": "Overall, my experience at Garuda Institute was immensely positive. The institute not only provided me with a strong academic foundation but also helped me grow as an individual. I would highly recommend Garuda Institute to anyone seeking a comprehensive and enriching educational experience."
    }
]

const Reviews = () => {
    return (
        <div className="w-[90%] 800px:w-[85%] m-auto mt-[100px]">
            <div className="w-full flex flex-col 800px:flex-row items-center">
                <div className="w-full flex justify-center 800px:w-[50%]">
                    <Image
                        src="/assets/reviews.png"
                        alt="business"
                        width={400}
                        height={400}
                        className="object-cover"
                    />
                </div>
                <div className="w-full 800px:w-[50%] text-center 800px:text-left mt-4 800px:mt-0">
                    <h3 className={`${style.title} 800px:!text-[40px]`}>
                        Our Students Are <span className="text-gradient">Our Strength</span>{" "}
                        <br /> See What they Say About Us
                    </h3>
                    <br />
                    <p className={`${style.label} sm:mb-[20px]`} >
                    My time at Garuda Institute has been nothing short of amazing. The faculty is knowledgeable and always willing to help.
                    The community at Garuda Institute is incredibly supportive. Ive made lifelong friends and connections. The student resources are top-notch and have helped me succeed academically and personally
                    
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
                {reviews.map((review, index) => (
                    <ReviewCard item={review} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Reviews
