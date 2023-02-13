import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import style from './style.module.css';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useDeleteShippingAddressByIdMutation } from '../../../features/shippingAddress/shippingAddressApi';

const CardAddress = ({ data }) => {
  const [deleteShippingAddressById, { isSuccess, error }] = useDeleteShippingAddressByIdMutation();

  const deleteHandler = async (id) => {
    if (error) {
      console.log(error);
    }

    await deleteShippingAddressById(id);
  };

  return (
    <>
      <div className={`col-12 border border-2 position-relative ${data.status == 1 ? 'border-danger' : style.borderTrinary} p-4 my-3`}>
        <FontAwesomeIcon onClick={() => deleteHandler(data.id)} className={`position-absolute fs-4 text-danger ${style.closeIcon}`} icon={faCircleXmark} />
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
