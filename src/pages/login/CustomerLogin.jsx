import React, { Component } from 'react';
import { AuthInputForm } from '../../components/Form/AuthInputForm';
import { Authentication } from '../../components/Layout/Authentication';

export default class CustomerLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
  };

  render() {
    return (
      <Authentication title={'Please Sign up with your account!'}>
        <AuthInputForm type={'text'} name={'name'} placeholder={'Name'} required={true} />
        <AuthInputForm type={'email'} name={'email'} placeholder={'Email'} required={true} />
        <AuthInputForm type={'password'} name={'password'} placeholder={'******'} required={true} />
        <AuthInputForm type={'number'} name={'phono'} placeholder={'Phone Number'} required={true} />
        <AuthInputForm type={'text'} name={'store_name'} placeholder={'Store Name'} required={true} />

        <div className="input-group mb-3">
          <button className="w-100 btn btn-danger rounded-pill mt-3" onClick={this.submitHandler} type="submit">
            Sign Up
          </button>
        </div>
      </Authentication>
    );
  }
}
