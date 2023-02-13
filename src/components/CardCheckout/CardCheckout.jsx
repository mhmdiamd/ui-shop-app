import React from 'react';
import style from './style.module.css';

const CardCheckout = ({ data }) => {
  const { product_name, store_name, price, photo_product, quantity, color, size } = data;
  return (
    <div className="col-12 items py-4 d-flex justify-content-between my-3">
      <div className="row w-100">
        <div className="col-12 col-sm-7 d-flex align-items-center">
          <div className="form-check d-flex align-items-center gap-3">
            <img className={`img-fluid product-item ${style.productImg}`} src={photo_product} alt="" />

            {/* <!-- Store product_name and Name Product --> */}
            <div className="product-desc d-grid">
              <label className="form-check-label fw-semibold" htmlFor="flexCheckDefault">
                {product_name} ({quantity})
              </label>
              <label className="form-check-label fw-semibold" htmlFor="flexCheckDefault">
                ({color}, {size})
              </label>
              <span className="color-trinary small-text">{store_name}</span>
            </div>

            {/* <!-- End Store name and Name Product --> */}
          </div>
        </div>

        <div className="col-12 col-sm-5 justify-content-end d-flex align-items-center pe-5">
          <span className="fw-semibold fs-6 text-danger">Rp. {price * quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default CardCheckout;
