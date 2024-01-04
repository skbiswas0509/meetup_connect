import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from "../styles/Username.module.css";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';


export default function Register() {

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values);
    }
  })

  return (
    <div className="container mx-auto">

      <Toaster position="top-center" reverseOrder={false}></Toaster>

      
      <div className='flex justify-center item-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h3 className='text-5xl font-bold'>Register</h3>
            <span className="py-4 text-xl w-2/3 text-center">
              Happy to connect with you,
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
              <img src={avatar} className={styles.profile_img} alt="avatar" />
              </label>

              <input type='file' id='profile' name='profile'/>
              
            </div>

            <div className="textbook flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder="Email*" />
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder="Username" />
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
