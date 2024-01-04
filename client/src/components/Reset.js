import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from "../styles/Username.module.css";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate';


export default function Reset() {

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pasword: '',
    },
    validate: resetPasswordValidation,
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
        <div className={styles.glass} style={{ width: "50%"}}>

          <div className="title flex flex-col items-center">
            <h3 className='text-5xl font-bold'>Reset</h3>
            <span className="py-4 text-xl w-2/3 text-center">
              Enter new password.
            </span>
          </div>
          <form className="py-20" onSubmit={formik.handleSubmit}>

            <div className="textbook flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder="Password" />
              <input {...formik.getFieldProps('confirm_password')} className={styles.textbox} type="password" placeholder="Confirm Password" />
              <button className={styles.btn} type='submit'>Reset</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
