'use client'
import React, { FC, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { style } from '../../styles/style'
// import { useRegisterMutation } from '@/redux/features/auth/authApi'
import { useRegisterMutation } from '../../../redux/features/auth/authApi'
import { toast } from 'react-hot-toast';

type Props = {
  setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string().email('Invalid email').required('Please enter your email'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Please enter your password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
})

const SignUp: FC<Props> = ({ setRoute }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [register, { isError, data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (isError && error) {
      const errorMessage = 'data' in error ? (error as any).data.message : 'An error occurred';
      toast.error("An error ocurred");
    }
  }, [isSuccess, isError, error, setRoute, data]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      try {
        await register({ name, email, password });
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik

  return (
    <div className='w-full p-4  dark:text-white text-black sm:p-10'>
      <h1 className={style.title}>Sign Up with Garuda Institute</h1>
      <form onSubmit={handleSubmit}>
        <label className={style.label} htmlFor='name'>
          Enter your name
        </label>
        <input type='text' name='name' value={values.name} onChange={handleChange} id='name' placeholder='Your Name'
          className={`${errors.name && touched.name ? "border-red-500" : ""} ${style.input}`} />
        {errors.name && touched.name && (<span className="text-red-500 pt-2 block">{errors.name}</span>)}

        <label className={style.label} htmlFor='email' style={{ marginTop: '15px' }}>
          Enter your email
        </label>
        <input type='email' name='email' value={values.email} onChange={handleChange} id='email' placeholder='login@gmail.com'
          className={`${errors.email && touched.email ? "border-red-500" : ""} ${style.input}`} />
        {errors.email && touched.email && (<span className="text-red-500 pt-2 block">{errors.email}</span>)}

        <div className="w-full mt-5 relative mb-1">
          <label className={style.label} htmlFor='password'>
            Enter your password
          </label>
          <input type={!showPassword ? "password" : "text"}
            name='password'
            value={values.password}
            onChange={handleChange}
            id='password'
            placeholder='password'
            className={`${errors.password && touched.password ? "border-red-500" : ""} ${style.input}`} />
          {!showPassword ? (
            <AiOutlineEyeInvisible
              className='absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white' size={20} onClick={() => setShowPassword(true)} />
          ) : (
            <AiOutlineEye
              className='absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white' size={20} onClick={() => setShowPassword(false)} />
          )}
          {errors.password && touched.password && (<span className="text-red-500 pt-2 block">{errors.password}</span>)}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label className={style.label} htmlFor='confirmPassword'>
            Confirm your password
          </label>
          <input type={!showConfirmPassword ? "password" : "text"}
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
            id='confirmPassword'
            placeholder='confirm password'
            className={`${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""} ${style.input}`} />
          {!showConfirmPassword ? (
            <AiOutlineEyeInvisible
              className='absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white' size={20} onClick={() => setShowConfirmPassword(true)} />
          ) : (
            <AiOutlineEye
              className='absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white' size={20} onClick={() => setShowConfirmPassword(false)} />
          )}
          {errors.confirmPassword && touched.confirmPassword && (<span className="text-red-500 pt-2 block">{errors.confirmPassword}</span>)}
        </div>

        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={style.button} />
        </div>
        <br />
        <h5 className="text-center dark:text-white pt-4 font-Poppins text-black">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3 ">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="flex items-center justify-center my-2 text-[14px] font-Poppins dark:text-white">
          Already have an account?{""}
          <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setRoute("Login")}>
            Login
          </span>
        </h5>
        <br />
      </form>
    </div>
  )
}

export default SignUp;
