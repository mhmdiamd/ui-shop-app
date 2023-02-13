import React, { useEffect, useState } from 'react';
import { Layout } from './../../components/Layout/Main';
import style from './style.module.css';
import CardListCart from './../../components/CardListCart/CardListCart';
import { useDeleteCartByIdCustomerMutation, useGetCartByIdCustomerQuery } from '../../features/cart/cartApi';
import { Link } from 'react-router-dom';

const MyBag = () => {
  const { data: carts, isLoading, error, isError } = useGetCartByIdCustomerQuery();
  const [deleteCartByIdCustomer, { isLoading: isLoadingIdCustomer, error: errorIdCustomer }] = useDeleteCartByIdCustomerMutation();
  const [loading, setLoading] = useState(false);
  const [deleteCheck, setDeleteCheck] = useState(false);

  useEffect(() => {
    setLoading(true);

    setLoading(loading);
  }, [isLoading, carts]);

  return (
    <Layout>
      <div className="container mt-3 pb-5">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="content-title">
              <h1 className="fs-3 fw-bold">My Bag</h1>
            </div>
          </div>

          <div className={`col-12 col-md-8`}>
            {error ? (
              <h1>{error.data.status == 404 ? 'There is nothing product in your chart!' : error.data.message}</h1>
            ) : (
              <>
                <div className={`col-12 ${style.items}`}>
                  <div className="col-12 p-3 d-flex justify-content-between">
                    <div className="form-check">
                      <input className="form-check-input border-2" type="checkbox" id="selectBoxAll" onChange={() => setDeleteCheck((prev) => !prev)} checked={deleteCheck} />
                      <label className="form-check-label fw-semibold ms-2" htmlFor="selectBoxAll">
                        {' '}
                        Select All Items{' '}
                      </label>
                      <span className="color-trinary">(2 items selected)</span>
                    </div>
                    <div className="deleteBtn">
                      <button className="bg-transparent border-0 text-danger fw-semibold" onClick={() => deleteCartByIdCustomer(carts[0].id_customer)} disabled={!deleteCheck}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* <!-- Items --> */}
                <div className="col-12 mt-4 bag-product">
                  {carts?.data?.map((cart) => (
                    <CardListCart checked={deleteCheck} key={cart.id} data={cart} />
                  ))}
                </div>
                {/* <!-- End Items --> */}
              </>
            )}
          </div>

          <div className={`col-12 col-md-4`}>
            <div className={`col-12 col-md-12 ${style.items} p-4 d-grid`}>
              <div className="title">
                <span className="fw-semibold">Shopping summary</span>
              </div>
              <div className="total-price">
                <div className="row my-4">
                  <div className="col-6">
                    <span className="color-trinary">Total price</span>
                  </div>
                  <div className="col-6">
                    <span className="fw-bold d-block text-end">Rp. {carts?.totalPrice}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Link to="/home/checkout" className={`${isError ? 'd-none' : ''} btn rounded-pill w-100 bg-danger text-light`}>
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyBag;
