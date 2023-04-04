import React, { useState } from 'react';
import { AuthInputForm } from './../../components/Form/AuthInputForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Authentication } from '../../components/Layout/Authentication';
import { useSellerRegisterMutation } from '../../features/auth/authApiSlice';
import { useEffect } from 'react';
import { closeLoading, showLoading, successLoading } from '../../common/loadingHandler';

const SellerRegister = () => {
  const [sellerRegister, {isLoading, isSuccess, isError}] = useSellerRegisterMutation()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    store_name: ""
  })

  const changeHandler = (e) => {
    setData(prev => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await sellerRegister(data)
  };

  useEffect(() => {
    if(isLoading) showLoading('Please Wait...')
    if(isSuccess) {
      setData({
        name: "",
        email: "",
        password: "",
        phone: "",
        store_name: ""
      })
      successLoading('Register Success, Check your Email for activate!')
    }
    if(isError) closeLoading('Register Failed')
  }, [isSuccess, isError, isLoading])

  return (
    <Authentication title={'Please Sign up with your account!'}>
      <AuthInputForm type={'text'} onchange={(e) => changeHandler(e)} name={'name'} placeholder={'Name'} required={true} />
      <AuthInputForm type={'email'} onchange={(e) => changeHandler(e)} name={'email'} placeholder={'Email'} required={true} />
      <AuthInputForm type={'password'} onchange={(e) => changeHandler(e)} name={'password'} placeholder={'******'} required={true} />
      <AuthInputForm type={'number'} onchange={(e) => changeHandler(e)} name={'phone'} placeholder={'Phone Number'} required={true} />
      <AuthInputForm type={'text'} onchange={(e) => changeHandler(e)} name={'store_name'} placeholder={'Store Name'} required={true} />

      <div className="input-group mb-3">
        <button className="w-100 btn btn-danger rounded-pill mt-3" onClick={submitHandler} type="submit">
          Sign Up
        </button>
      </div>
    </Authentication>
  );
};

SellerRegister.propTypes = {};

export default SellerRegister;
