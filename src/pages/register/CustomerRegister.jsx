import React, { useState } from 'react';
import { AuthInputForm } from './../../components/Form/AuthInputForm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Authentication } from '../../components/Layout/Authentication';
import { useCustomerRegisterMutation } from '../../features/auth/authApiSlice';

const CustomerRegister = () => {
  const [customerRegister, { error, isLoading, isError, isSuccess }] = useCustomerRegisterMutation();
  const MySwal = withReactContent(Swal);

  const [btnDisable, setBtnDisable] = useState(true);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  function showLoading() {
    Swal.fire({
      title: 'Loading...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  const successLoading = () => {
    Swal.close();
    if (isSuccess) {
      MySwal.fire({
        title: <p>Register Success, Check your Email for activate!</p>,
        icon: 'success',
      });
    }
  };

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await customerRegister(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Authentication title={'Please Sign up with your account!'}>
      {isLoading ? showLoading() : successLoading()}
      <AuthInputForm type={'text'} onchange={(e) => handleChange(e)} name={'name'} placeholder={'Name'} required={true} />
      <AuthInputForm type={'email'} onchange={(e) => handleChange(e)} name={'email'} placeholder={'Email'} required={true} />
      <AuthInputForm type={'password'} onchange={(e) => handleChange(e)} name={'password'} placeholder={'******'} required={true} />

      <div className="input-group mb-3">
        <button className="w-100 btn btn-danger rounded-pill mt-3" onClick={loginHandler} type="submit" disabled={!(data.name && data.email && data.password)}>
          Register
        </button>
      </div>
    </Authentication>
  );
};

export default CustomerRegister;
