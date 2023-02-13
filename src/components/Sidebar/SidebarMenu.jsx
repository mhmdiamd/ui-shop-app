import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.css';

export const SidebarMenu = ({ url, icon, name, user }) => {
  const showMenuHandler = (className) => {
    const menus = document.querySelectorAll(`.${className}`);
    menus.forEach((menu) => {
      menu.classList.toggle('normal-position');
    });
  };

  const classMenu = (name) => {
    switch (name) {
      case 'Product':
        return 'shipping-address';
      case 'Order':
        return 'my-order';
      case 'Shipping Address':
        return 'shipping-address';
      default:
        return 'profile-setting';
    }
  };

  function renderSidebar() {
    if (name == 'Product') {
      return (
        <div className="text-decoration-none text-dark col-12 d-flex justify-content-center flex-column">
          <div className={`${style.mainMenu} d-block d-md-flex mx-auto mx-md-0 gap-3 align-items-center`}>
            <span className={`menu-logo ${classMenu(name)} d-flex align-items-center justify-content-center rounded-circle`}>
              <FontAwesomeIcon className="text-light" icon={icon} />
            </span>
            <span
              className="menu-name w-100 helper-text fw-semibold d-none d-md-flex justify-content-between"
              onClick={() => {
                showMenuHandler('product-child-menu');
              }}
            >
              <span>{name}</span>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          </div>

          <Link to="/dashboard/sellers/my-product" className={`${style.childMenu} product-child-menu d-none d-md-flex text-decoration-none text-dark d-flex gap-3 align-items-center`}>
            <span className={`menu-logo d-flex align-items-center justify-content-center rounded-circle`}></span>
            <span className="menu-name helper-text color-trinary d-none d-md-flex">My Products</span>
          </Link>

          <Link to="/dashboard/sellers/selling-product" className={`${style.childMenu} product-child-menu d-none d-md-flex text-decoration-none text-dark d-flex gap-3 align-items-center`}>
            <span className={`menu-logo  d-flex align-items-center justify-content-center rounded-circle`}></span>
            <span className="menu-name helper-text color-trinary d-none d-md-flex">Selling Product</span>
          </Link>
        </div>
      );
    } else if (name == 'Store') {
      return (
        <div className={`text-decoration-none position-relative text-dark col-12 d-flex justify-content-center flex-column`}>
          <div className={`${style.mainMenu} d-block position-relative d-md-flex mx-auto mx-md-0 gap-3 align-items-center`}>
            <span className={`menu-logo ${classMenu(name)} d-flex align-items-center justify-content-center rounded-circle`}>
              <FontAwesomeIcon className="text-light" icon={icon} />
            </span>
            <span
              className="menu-name w-100 helper-text fw-semibold d-none d-md-flex justify-content-between"
              onClick={() => {
                showMenuHandler('store-child-menu');
              }}
            >
              <span>{name}</span>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          </div>

          <Link to="/dashboard/sellers" className={`${style.childMenu} store-child-menu d-none d-md-flex text-decoration-none text-dark gap-3 align-items-center`}>
            <span className={`menu-logo d-flex align-items-center justify-content-center rounded-circle`}></span>
            <span className="menu-name helper-text color-trinary d-none d-md-flex">Store Profile</span>
          </Link>
        </div>
      );
    } else if (name == 'Order' && user?.role == 'seller') {
      return (
        <div className="text-decoration-none text-dark col-12 d-flex justify-content-center flex-column">
          <div className={`${style.mainMenu} d-block d-md-flex mx-auto mx-md-0 gap-3 align-items-center`}>
            <span className={`menu-logo ${classMenu(name)} d-flex align-items-center justify-content-center rounded-circle`}>
              <FontAwesomeIcon className="text-light" icon={icon} />
            </span>
            <span
              className="menu-name w-100 helper-text fw-semibold d-none d-md-flex justify-content-between"
              onClick={() => {
                showMenuHandler('order-child-menu');
              }}
            >
              <span>{name}</span>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          </div>

          <Link to="" className={`${style.childMenu} order-child-menu d-none d-md-flex text-decoration-none text-dark d-flex gap-3 align-items-center`}>
            <span className={`menu-logo d-flex align-items-center justify-content-center rounded-circle`}></span>
            <span className="menu-name helper-text color-trinary d-none d-md-flex">My Order</span>
          </Link>

          <Link to="" className={`${style.childMenu} order-child-menu d-none d-md-flex text-decoration-none text-dark d-flex gap-3 align-items-center`}>
            <span className={`menu-logo d-flex align-items-center justify-content-center rounded-circle`}></span>
            <span className="menu-name helper-text color-trinary d-none d-md-flex">Order Cancel</span>
          </Link>
        </div>
      );
    } else {
      return (
        <Link to={url} className="text-decoration-none text-dark col-12 d-flex align-items-center gap-3">
          <span className={`menu-logo ${classMenu(name)} d-flex align-items-center justify-content-center rounded-circle`}>
            <FontAwesomeIcon className="text-light" icon={icon} />
          </span>
          <span className="menu-name helper-text fw-semibold d-none d-md-flex">{name}</span>
        </Link>
      );
    }
  }

  return renderSidebar();
};
