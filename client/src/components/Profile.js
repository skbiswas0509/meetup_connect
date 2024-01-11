import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import {useAuthStore} from '../store/store';
import { updateUser } from '../helper/helper';

import styles from "../styles/Username.module.css";
import extend from '../styles/Profile.module.css';

export default function Profile() {
  
  const [file, setFile] = useState()
  const [{ isLoading, apiData, serverError }]=useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName ||'',
      lastName:apiData?.lastName ||'',
      email: apiData?.email ||'',
      mobile: apiData?.mobile ||'',
      address: apiData?.address ||'',
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      values = await Object.assign(values, { profile: file || apiData?.profile || '' });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise,{
        loading:"Updating",
        success:<b>Updating Successfully</b>,
        error:<b>Updating Failed</b>
      })
      console.log(values);
    }
  })

  const onUpload =async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }
  

  //logout handler function 
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }
  if(isLoading) return <h3 className='text-xl font-bold'>isLoading</h3>;
  if(serverError) return <h2 className='text-xl text-red-500'>{serverError.messsage}</h2>

  return (
    <div className="container mx-auto">

      <Toaster position="top-center" reverseOrder={false}></Toaster>

      
      <div className='flex justify-center item-center h-screen'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%" }}>

          <div className="title flex flex-col items-center">
            <h3 className='text-5xl font-bold'>Profile</h3>
            <span className="py-4 text-xl w-2/3 text-center">
              You can update the details from here.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
              <img src={apiData?.profile || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
              </label>

              <input onChange={onUpload} type='file' id='profile' name='profile'/>
              
            </div>

            <div className="textbook flex flex-col items-center gap-6">
              <div className='name flex w-3/4 gap-10'>
              <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="First Name" />
              <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Last Name" />
              </div>

              <div className='name flex w-3/4 gap-10'>
              <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Mobile No" />
              <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Email Address" />
              </div>
              

              <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Address" />
              <button className={styles.btn} type='submit'>Register</button>
              
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">Update Later?<button onClick={userLogout} className="text-red-500" to="/">Logout</button></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
