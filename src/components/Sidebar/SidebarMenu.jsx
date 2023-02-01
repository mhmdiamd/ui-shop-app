import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export const SidebarMenu = ({ url, icon, name }) => {
  const classMenu = (name) => {
    switch (name) {
      case 'Product':
        return 'shipping-address';
      case 'Order':
        return 'my-order';
      default:
        return 'profile-setting';
    }
  };
  return (
    <Link to={url} className="text-decoration-none text-dark col-12 d-flex align-items-center gap-3">
      <span className={`menu-logo ${classMenu(name)} d-flex align-items-center justify-content-center rounded-circle`}>
        <FontAwesomeIcon className="text-light" icon={icon} />
      </span>
      <span className="menu-name helper-text fw-semibold d-none d-md-flex">{name}</span>
    </Link>
  );
};
