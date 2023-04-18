import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';

export const Authentication = ({ children, title }) => {
  const location = useLocation();
  const urlRole = location.pathname.split('/')[1];
  const urlAuthStatus = location.pathname.split('/')[2];

  function setLink(role, status) {
    if (role == 'sellers') {
      if (status == 'register') {
        return '/customers/register';
      }
      return '/customers/login';
    } else {
      if (status == 'register') {
        return '/sellers/register';
      }
      return '/sellers/login';
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center mt-5">
          <img src={logo} alt="" />
          <span className="text-danger fs-2 ms-2 fw-bold">Blanja</span>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <span className="fw-bold mt-4">{title}</span>
        </div>

        <div className="col-12 d-flex justify-content-center mt-4">
          <Link
            to={setLink('sellers', urlAuthStatus)}
            className={`col-3 col-lg-1 text-center ${urlRole != 'sellers' ? 'bg-danger text-light' : ''} border border-1 text-secondary p-2 rounded-start-1 text-decoration-none border-end-0`}
            role="button"
          >
            Customer
          </Link>
          <Link
            to={setLink('customers', urlAuthStatus)}
            className={`col-3 col-lg-1 p-2 text-center ${urlRole == 'sellers' ? 'bg-danger text-light' : ''} text-secondary rounded-end-1 text-decoration-none border border-1  border-start-0" role="button`}
          >
            Seller
          </Link>
        </div>

        <div className="col-12 mt-4">
          <div className="col-10 col-md-6 col-lg-4 mx-auto">{children}</div>
        </div>
      </div>

      <div className="col-12 text-center mt-2">
        <span className="text-secondary">
          {urlAuthStatus == 'login' ? `Don't have belanja account? ` : `Already have belanja account? `}
          <Link to={`/${urlRole}/${urlAuthStatus == 'register' ? 'login' : 'register'}`} className="text-danger text-decoration-none">
            {urlAuthStatus == 'login' ? `Register` : `Login`}
          </Link>
        </span>
      </div>
    </div>
  );
};
