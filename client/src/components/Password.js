import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from "../styles/Username.module.css";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import {useAuthStore} from '../store/store';
import { verifyPassword } from '../helper/helper';

export default function Password() {

  const {username} = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }]=useFetch(`/user/${username}`);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      let loginPromise = verifyPassword({username,password: values.password})
      toast.promise(loginPromise, {
        loading: 'Checking',
        success: <b>Login Successfull</b>,
        error: <b>Password does not match</b>
      });
      loginPromise.then(res => {
        let {token} = res.data;
        localStorage.setItem('token',token);
        navigate('/profile');
      })
    }
  })

  if(isLoading) return <h3 className='text-xl font-bold'>isLoading</h3>;
  if(serverError) return <h2 className='text-xl text-red-500'>{serverError.messsage}</h2>

  return (
    <div className="container mx-auto">

      <Toaster position="top-center" reverseOrder={false}></Toaster>

      
      <div className='flex justify-center item-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h3 className='text-5xl font-bold'>Hello Again {apiData?.firstName || apiData?.username}</h3>
            <span className="py-4 text-xl w-2/3 text-center">
              Explore more by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbook flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder="Password" />
              <button className={styles.btn} type='submit'>Login</button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">Forgot Password?<Link className="text-red-500" to="/recovery">Recover Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
