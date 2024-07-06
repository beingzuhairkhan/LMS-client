import React from 'react';

const categories = [
  { title: 'Pre Primary', description: 'Basic education for young children.' },
  { title: 'Pre Primary To 10th', description: 'Comprehensive education from pre-primary to 10th grade.' },
  { title: 'School Faculty', description: 'Experienced and qualified school teachers.' },
  { title: 'Commerce', description: 'Courses related to commerce stream.' },
  { title: 'Science', description: 'Courses related to science stream.' },
  { title: 'Arts', description: 'Courses related to arts stream.' },
  { title: 'CBSE/ICSE/IB/State Board', description: 'Courses for various educational boards.' },
  { title: 'English, French, German, Kannada', description: 'Language courses available.' },
  { title: 'Competitive Exams', description: 'Preparation for various competitive exams.' },
  { title: 'Non-Academic Learning', description: 'Courses for additional skills and hobbies.' },
];

const About2: React.FC = () => {
  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white text-black">What OTOO Does?</h1>
      <p className="text-center mb-8 dark:text-white text-black">
        OTOO is a one-to-one platform that provides home and online tuition services and connects teachers to academic institutions. Our platform offers a comprehensive range of academic solutions tailored to meet the specific needs of students from pre-primary to 12th grade, in different streams like CBSE, IB, ICSE, and IGCSE boards. So why search for tuition near me? Sign up today and take the first step toward academic excellence!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="bg-white p-6 shadow-md rounded-md transform transition-transform hover:scale-105 flex flex-col justify-center items-center text-center h-40"
          >
            <h2 className="text-xl font-semibold mb-2 text-[#37a39a]">{category.title}</h2>
            <p className="text-[#37a39a]">{category.description}</p>
          </div>
        ))}
      </div>
      <hr/>
    </div>
  );
}

export default About2;
