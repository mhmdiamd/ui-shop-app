import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import profile from '../../assets/profile/profile.png';

export const BottomBar = () => {
  return (
    localStorage.getItem('token') && (
      <div className="row">
        <div className="col-12 bottom-bar d-lg-none py-1">
          <div className="d-flex gap-2 justify-content-around align-items-center">
            <Link to="/home/my-bag" className="btn fs-5 color-trinary">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>

            <Link to="/home/notification" className="btn fs-5 color-trinary">
              <FontAwesomeIcon icon={faBell} />
            </Link>

            <Link to="home/message" className="btn fs-5 color-trinary">
              <FontAwesomeIcon icon={faEnvelope} />
            </Link>

            <Link to="https://prototype-shop-app-pijarcamp.vercel.app/Pages/profile/profile.html" className="profile">
              <img src={profile} className="img-fluid" alt="" />
            </Link>
          </div>
        </div>
      </div>
    )
  );
};
