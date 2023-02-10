import React from 'react';
import style from './style.module.css';

const CardAddress = ({ data }) => {
  return (
    <>
      <div className={`col-12 border border-2 ${data.status == 1 ? 'border-danger' : style.borderTrinary} p-4 my-3`}>
        <span className="fw-semibold">{data.recipent_name}</span>
        <p className="helper-text mt-2">
          {data.address} {data.city_or_subdistrict} {data.postal_code}{' '}
        </p>
        <button className="btn p-0 border-0 text-danger fw-semibold" data-bs-target={`#${data.id}`} data-bs-toggle="modal">
          Change address
        </button>
      </div>
    </>
  );
};

export default CardAddress;
