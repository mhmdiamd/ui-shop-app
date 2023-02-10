import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthInputForm } from '../../components/Form/AuthInputForm';
import { Authentication } from '../../components/Layout/Authentication';
import { useCustomerLoginMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customerLogin, { isLoading, error }] = useCustomerLoginMutation();
  const dispatch = useDispatch();
  const submitHandler = async () => {
    const userData = await customerLogin({ email, password }).unwrap();
    dispatch(setCredentials({ user: userData.data, token: userData.token }));
    navigate('/');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  return (
    <Authentication title={'Please Sign up with your account!'}>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{error.message}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <AuthInputForm type={'email'} name={'email'} onchange={(e) => setEmail(e.target.value)} placeholder={'Email'} required={true} />
      <AuthInputForm type={'password'} name={'password'} onchange={(e) => setPassword(e.target.value)} placeholder={'**********'} required={true} />

      <div className="input-group mb-3">
        <button className="w-100 btn btn-danger rounded-pill mt-3" onClick={submitHandler} type="submit" disabled={!(email && password)}>
          Sign Up
        </button>
      </div>
    </Authentication>
  );
};

export default CustomerLogin;
