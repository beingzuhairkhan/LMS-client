import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image'
import {useGetFormMutation} from '../../redux/features/user/userApi'
import { toast } from 'react-hot-toast';
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  class: yup.string().oneOf(['11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', 'None'], 'Invalid class').required('Class is required'),
  stream: yup.string().oneOf(['Art', 'Commerce', 'Science'], 'Invalid stream').required('Stream is required'),
  course: yup.string().oneOf([
    'BSc Physics', 'Bsc Chemistry', 'BSc Biology', 'BSc Mathematics',
    'BSc Information Technology (IT)', 'BSc Computer Science', 'BSc Microbiology',
    "Bachelor of Commerce (B.Com)" ,"Bachelor of Commerce in Banking & Insurance (B.B.I)" ,"Bachelor of Commerce in Accounting & Finance (B.A.F) ","Bachelor of Management Studies (B.M.S)",
    "Master of Commerce (M.Com in Accountancy) ", "Master of Commerce in banking & Insurance (M.Com in Management) ",
    'None'
  ], 'Invalid course').required('Course is required'),
  admissionSeeking: yup.string().oneOf(['Jr. College', 'Degree / Master Courses' , 'None'], 'Invalid admission seeking').required('Admission seeking is required')
});

const Form: React.FC = () => {

    const {} = useGetFormMutation()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [submitForm, { isLoading, isSuccess, isError }] = useGetFormMutation();

  const onSubmit = async (data: any) => {
    try {
      await submitForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        studentClass: data.class,
        stream: data.stream,
        course: data.course,
        admissionSeeking: data.admissionSeeking,
      }).unwrap();
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    }
  };
  return (
      <div className="max-w-lg mx-auto p-4 dark:text-white text-black">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Admission Form</h2>
  
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block ">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block ">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="example@gmail.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block ">Phone</label>
          <input
            type="text"
            {...register('phone')}
            className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="1234567890"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block ">Class</label>
          <select
            {...register('class')}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select class</option>
            {['11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', 'None'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.class && <p className="text-red-500 text-sm">{errors.class.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block ">Stream</label>
          <select
            {...register('stream')}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select stream</option>
            {['Art', 'Commerce', 'Science'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.stream && <p className="text-red-500 text-sm">{errors.stream.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block ">Course</label>
          <select
            {...register('course')}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select course</option>
            {[
              'BSc Physics', 'Bsc Chemistry', 'BSc Biology', 'BSc Mathematics',
              'BSc Information Technology (IT)', 'BSc Computer Science', 'BSc Microbiology',
              "Bachelor of Commerce (B.Com)" ,"Bachelor of Commerce in Banking & Insurance (B.B.I)" ,"Bachelor of Commerce in Accounting & Finance (B.A.F) ","Bachelor of Management Studies (B.M.S)",
              "Master of Commerce (M.Com in Accountancy) ", "Master of Commerce in banking & Insurance (M.Com in Management) ",
              'None'
            ].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block">Admission Seeking</label>
          <select
            {...register('admissionSeeking')}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select admission seeking</option>
            {['Je. College', 'Degree / Master Courses' , 'None'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.admissionSeeking && <p className="text-red-500 text-sm">{errors.admissionSeeking.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
      </form>
      </div>
   
    </div>
  );
};

export default Form;
