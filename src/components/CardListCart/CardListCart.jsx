import { faPlus, faMinus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDeleteCartByIdMutation, useUpdateCartMutation } from '../../features/cart/cartApi';
import style from './style.module.css';
import Swal from 'sweetalert2';
import { convert } from 'rupiah-format'

const CardListCart = ({ data, checked }) => {
  const [updateCart, { isLoading, error }] = useUpdateCartMutation();
  const [deleteCart, { error: errorDeleteCart, isLoading: isLoadingDeleteCart }] = useDeleteCartByIdMutation();
  const [checkList, setCheckList] = useState(false);

  const deleteHandler = async (id) => {
    Swal.fire({
      title: 'Are you sure to delete this product from your cart?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCart(id);
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const incrementQuantity = async (cart) => {
    await updateCart({ id: cart.id, quantity: cart.quantity + 1 });
  };

  const decrementQuantity = async (cart) => {
    if (cart.quantity - 1 == 0) {
      await deleteCart(cart.id);
    }
    await updateCart({ id: cart.id, quantity: cart.quantity - 1 });
  };

  return (
    <div className={`col-12 ${style.items} p-3 py-4 d-flex justify-content-between my-3 position-relative`}>
      <FontAwesomeIcon onClick={() => deleteHandler(data.id)} className={`position-absolute fs-4 text-danger ${style.closeIcon}`} icon={faCircleXmark} />
      <div className="row w-100">
        <div className="col-12 col-sm-7">
          <div className="form-check d-flex align-items-center gap-3">
            <input className="form-check-input border-2" type="checkbox" value="" id="flexCheckDefault" onChange={() => setCheckList((prev) => !prev)} checked={checked ? checked : checkList} />

            <img className={`img-fluid ${style.productItem} ${style.imageCardCart}`} src={data.photo_product} alt="" />

            {/* <!-- Store name and Name Product --> */}
            <div className="product-desc d-grid">
              <label className="form-check-label fw-semibold" htmlFor="flexCheckDefault">
                {data?.product_name}
              </label>
              <label className="form-check-label fw-semibold" htmlFor="flexCheckDefault">
                ({data?.color}, {data?.size})
              </label>
              <span className="color-trinary small-text">{data.store_name}</span>
            </div>

            {/* <!-- End Store name and Name Product --> */}
          </div>
        </div>

        <div className="col-12 d-flex justify-content-end mt-2 align-items-center col-sm-5">
          <div className="row ">
            <div className={`col-6  justify-content-center ${style.quantity} d-flex gap-3 align-items-center`}>
              <FontAwesomeIcon className={`border border-1 border-trinary rounded-circle bg-trinary text-light ${style.faIcon}`} onClick={() => decrementQuantity(data)} icon={faMinus} />
              <span className="fw-semibold">{data.quantity}</span>
              <FontAwesomeIcon onClick={() => incrementQuantity(data)} className={`border border-1 border-trinary rounded-circle ${style.faIcon}`} icon={faPlus} />
            </div>
            <div className="col-6 price justify-content-end d-flex align-items-center">
              <span className="fw-semibold">{convert(data.quantity * data.price)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardListCart;
