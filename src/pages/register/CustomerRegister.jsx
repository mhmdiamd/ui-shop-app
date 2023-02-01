import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AuthInputForm } from './../../components/Form/AuthInputForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Authentication } from '../../components/Layout/Authentication';

const CustomerRegister = () => {
  const MySwal = withReactContent(Swal);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState({});

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const registerSeller = await axios.post(`http://localhost:3001/api/v1/auth/sellers/login`, formData);
      setSuccess(registerSeller.data);

      if (success) {
        MySwal.fire({
          title: <p>Register Success, Check your Email for activate!</p>,
          icon: 'success',
        });
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <Authentication title={'Please Sign up with your account!'}>
      <AuthInputForm type={'text'} onchange={(value) => setName(value)} name={'name'} placeholder={'Name'} required={true} />
      <AuthInputForm type={'email'} onchange={(value) => setEmail(value)} name={'email'} placeholder={'Email'} required={true} />
      <AuthInputForm type={'password'} onchange={(value) => setPassword(value)} name={'password'} placeholder={'******'} required={true} />

      <div className="input-group mb-3">
        <button className="w-100 btn btn-danger rounded-pill mt-3" onClick={loginHandler} type="submit">
          Register
        </button>
      </div>
    </Authentication>
  );
};

CustomerRegister.propTypes = {};

export default CustomerRegister;
