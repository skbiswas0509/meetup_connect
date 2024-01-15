import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from "../styles/Username.module.css";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook'

export default function Reset() {

  const {username} =useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading,apiData,status, serverError }] = useFetch('createResetSession')


  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pasword: '',
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      let resetPromise = resetPassword({username, password:values.password})
      
      toast.promise(resetPromise,{
        loading: "Updating",
        success: <b>Reset successfull</b>,
        error: <b>Could not reset</b>
      });

      resetPromise.then(function(){navigate('/password')})
    }
  })

  if(isLoading) return <h3 className='text-xl font-bold'>isLoading</h3>;
  if(serverError) return <h2 className='text-xl text-red-500'>{serverError.messsage}</h2>
  if(status && status !== 201) return <Navigate to={'/passsword'} replace={true}></Navigate>

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
