import React from 'react';
import style from './style.module.css';

const CardCheckout = ({ data }) => {
  const { name, store_name, price, img } = data;
  return (
    <div className="col-12 items py-4 d-flex justify-content-between my-3">
      <div className="col-7 d-flex align-items-center">
        <div className="form-check d-flex align-items-center gap-3">
          <img className={`img-fluid product-item ${style.productImg}`} crossOrigin="anonymous" src={img} alt="" />

          {/* <!-- Store name and Name Product --> */}
          <div className="product-desc d-grid">
            <label className="form-check-label fw-semibold" htmlFor="flexCheckDefault">
              {name}
            </label>
            <span className="color-trinary small-text">{store_name}</span>
          </div>

          {/* <!-- End Store name and Name Product --> */}
        </div>
      </div>

      <div className="col-5 justify-content-end d-flex align-items-center pe-5">
        <span className="fw-semibold">Rp. {price}</span>
      </div>
    </div>
  );
};

export default CardCheckout;
