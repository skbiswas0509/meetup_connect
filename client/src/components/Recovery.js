import React, { useEffect, useState } from 'react';
import styles from "../styles/Username.module.css";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

export default function Recovery() {

  const {username} = useAuthStore(state => state.auth);
  const [OTP,setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() =>{
    generateOTP(username).then((OTP) =>{
      if(OTP) return toast.success('OTP has been sent to your email.');
      return toast.error("Problem while geenrating OTP");
    })
  }, [username]);
  
  async function onSubmit(e){
    e.preventDefault();

    let {status} = await verifyOTP({ username, code: OTP});
    if(status === 201){
      toast.success('Verified successfully');
      return navigate('/reset')
    }
    return toast.error('Wrong OTP');
  }

  const formik = useFormik({
    initialValues: {
      password: ''
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
            <h3 className='text-5xl font-bold'>Recovery</h3>
            <span className="py-4 text-xl w-2/3 text-center">
              Enter OTP to recover password
            </span>
          </div>
          <form className="pt-20" onSubmit={onSubmit}>

            <div className="input text-center">

            </div>

            <div className="textbook flex flex-col items-center gap-6">
              <span className='py-4 text-sm text-left'>
                Enter 6 digit OTP sent to your email address.
              </span>
              <input onChange={(e) => setOTP(e.target.value)} className={styles.textbox} type="password" placeholder="OTP" />
              <button className={styles.btn} type='submit'>Recover</button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">Can't get OTP?<button className="text-red-500">Resend</button></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
