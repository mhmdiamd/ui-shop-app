import axios from 'axios';
import React, { useState } from 'react';
import { AuthInputForm } from '../../components/Form/AuthInputForm';
import { Authentication } from '../../components/Layout/Authentication';
import { useNavigate } from 'react-router-dom';

export const SellerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  if (localStorage.getItem('access_token')) {
    navigate('/');
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/auth/sellers/login`, { email, password });
      if (response) {
        localStorage.setItem('access_token', JSON.stringify(response.data.accessToken));
        localStorage.setItem('refresh_token', JSON.stringify(response.data.refreshToken));
        navigate('/');
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <Authentication title={'Please Sign up with your account!'}>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{error.message}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <AuthInputForm type={'email'} name={'email'} onchange={(value) => setEmail(value)} placeholder={'Email'} required={true} />
      <AuthInputForm type={'password'} name={'password'} onchange={(value) => setPassword(value)} placeholder={'**********'} required={true} />

      <div className="input-group mb-3">
        <button className="w-100 btn btn-danger rounded-pill mt-3" onClick={submitHandler} type="submit" disabled={!password ? true : !email ? true : false}>
          Sign In
        </button>
      </div>
    </Authentication>
  );
};
