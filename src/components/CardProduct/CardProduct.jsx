import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.css';
import React from 'react';
import { convert } from 'rupiah-format'

export const CardProduct = ({ data }) => {
  const { id, photo, product_name, price, store_name } = data;
  return (
    <a className={`${style.minWidth} ${style.cardHeight} card ${style.myCard} text-decoration-none`} href={`/products/${id}`}>
      <img src={photo} className={`${style.imgHeight} ${style.maxHeight}  card-img-top img-fluid`} alt={product_name} />
      <div className="card-body py-2 px-3 card-title-product d-flex flex-column">
        <div className="product-title fw-semibold text-dark">{product_name}</div>
        <span className="text-danger fw-semibold">{convert(price)}</span>
        <span className="color-trinary small-text">{store_name}</span>
        <span className="d-flex mt-1 gap-1 align-items-center">
          <FontAwesomeIcon icon={faStar} className={'text-warning more-small-text'} />
          <FontAwesomeIcon icon={faStar} className={'text-warning more-small-text'} />
          <FontAwesomeIcon icon={faStar} className={'text-warning more-small-text'} />
          <FontAwesomeIcon icon={faStar} className={'text-warning more-small-text'} />
          <FontAwesomeIcon icon={faStar} className={'text-warning more-small-text'} />

          <span className="color-trinary more-small-text">(5 )</span>
        </span>
      </div>
    </a>
  );
};
