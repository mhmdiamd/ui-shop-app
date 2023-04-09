import React from 'react';
import CardCheckout from '../../components/CardCheckout/CardCheckout';
import { Layout } from '../../components/Layout/Main';
import { useGetShippingAddressByIdCustomerQuery } from '../../features/shippingAddress/shippingAddressApi';
import CardAddress from '../../components/Card/CardAddress/CardAddress';
import ModalChangeAddress from './../../components/Modal/ModalChangeAddress';
import ModalCreateAddress from './../../components/Modal/ModalCreateAddress';
import { useGetCartByIdCustomerQuery } from '../../features/cart/cartApi';
import { useCreateOrderMutation } from '../../features/order/orderApi';
import gopayPng from '../../assets/payment/gopay.png'
import mCardPng from '../../assets/payment/mastercard.png'
import posPng from '../../assets/payment/pos.png'

const CheckOut = () => {
  const { data: shippingAddress, isLoading: isLoadingShippingAddress, error: errorShippingAddress } = useGetShippingAddressByIdCustomerQuery();
  const { data: carts, isLoading, error, isError } = useGetCartByIdCustomerQuery();
  const [createOrder, { isLoading: isLoadingCreateOrder, error: errorCreateOrder }] = useCreateOrderMutation();

  const createOrderHandler = () => {
    return new Promise.all([
      carts?.data?.map(async (cart) => {
        await createOrder({ id_product: cart.id_product, id_customer: cart.id_customer, quantity: cart.quantity, price: carts.totalPrice - 5000, id_shipping_address: shippingAddress.primaryAddress.id });
      }),
    ]);
  };

  return (
    <Layout>
      <div className="container mt-3 pb-5">
        <div className="row">
          <div className="col-12">
            <div className="content-title">
              <h1 className="fs-3 fw-bold">Checkout</h1>
            </div>
          </div>
          <div className="col-12 mb-3">
            <span className="shipping-address bg-transparent fw-semibold">Shipping address</span>
          </div>

          <div className="col-12 col-md-8 product">
            {/* <!-- Main Address --> */}
            <div className="col-12">
              <div className="col-12 items p-4">
                {isLoadingShippingAddress ? (
                  'Loading...'
                ) : (
                  <>
                    <span className="fw-semibold">{shippingAddress?.primaryAddress?.recipent_name}</span>
                    <p className="helper-text mt-2">
                      {shippingAddress?.primaryAddress?.address}
                      {shippingAddress?.primaryAddress?.city_or_subdistrict} - {shippingAddress?.primaryAddress?.postal_code}
                    </p>

                    <button className="btn border color-trinary border-1 rounded-pill" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                      Choose another address
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* <!-- End Main Address --> */}

            {/* <!-- Items --> */}
            <div className="col-12 mt-4 bag-product">{isLoading ? 'Loading....' : carts?.data?.map((cart) => <CardCheckout key={cart.id} data={cart} />)}</div>
            {/* <!-- End Items --> */}
          </div>

          <div className="col-12 col-md-4 product">
            <div className="col-12 col-md-11 items p-4 d-grid">
              <div className="title">
                <span className="fw-semibold">Shopping summary</span>
              </div>

              {/* <!-- List Price --> */}
              {isLoading ? (
                'Loading...'
              ) : (
                <div className="total-price border-2 border-bottom">
                  <div className="row mt-4">
                    <div className="col-6">
                      <span className="color-trinary">Order</span>
                    </div>
                    <div className="col-6">
                      <span className="fw-bold d-block text-end">Rp. {carts?.totalPrice}</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <span className="color-trinary">Delivery</span>
                    </div>
                    <div className="col-6">
                      <span className="fw-bold d-block text-end">Rp 5000</span>
                    </div>
                  </div>
                </div>
              )}

              {/* <!-- End List price --> */}

              {/* <!-- Shopping Summary --> */}
              <div className="row my-3 ">
                <div className="col-6">
                  <span className="fw-semibold">Shopping summary</span>
                </div>
                <div className="col-6">
                  <span className="fw-bold d-block text-end text-danger">Rp. {carts?.totalPrice - 5000}</span>
                </div>
              </div>
              {/* <!-- Shopping Summary --> */}

              {/* <!-- Payment Button --> */}
              <div className="row">
                <div className="col-12">
                  <button className="btn rounded-pill w-100 bg-danger text-light" data-bs-toggle="modal" data-bs-target="#paymentModal">
                    Select Payment
                  </button>
                </div>
              </div>
              {/* <!-- End Payment Button --> */}
            </div>
          </div>
        </div>
      </div>

      {shippingAddress?.data.map((ship) => (
        <ModalChangeAddress key={ship.id} data={ship} />
      ))}

      <ModalCreateAddress>
        {shippingAddress?.data.map((ship) => (
          <CardAddress key={ship.id} data={ship} />
        ))}
      </ModalCreateAddress>

      {/* <!-- Modal Payment --> */}
      <div className="modal fade" id="paymentModal" tabIndex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header shadow-sm border-0">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Payment
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body px-0 overflow-x-hidden">
              <section className="colors-filter border-bottom border-2 pb-2">
                <div className="row px-4">
                  <div className="col-12 mb-2">
                    <span className="fw-semibold">Payment Method</span>
                  </div>
                  <div className="col-12 d-flex gap-3 mt-3">
                    <div className="col-12">
                      <div className="row payment-method mb-4">
                        <div className="col-3">
                          <img src={gopayPng} className="img-fluid" alt="" />
                        </div>
                        <div className="col-8">
                          <span className="fw-semibold">Gopay</span>
                        </div>
                        <div className="col-1">
                          <input className="form-check-input border-2 me-3" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                      </div>

                      <div className="row payment-method mb-4">
                        <div className="col-3">
                          <img src={posPng} className="img-fluid" alt="" />
                        </div>
                        <div className="col-8">
                          <span className="fw-semibold">Pos Indonesia</span>
                        </div>
                        <div className="col-1">
                          <input className="form-check-input border-2 me-3" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                      </div>

                      <div className="row payment-method mb-4">
                        <div className="col-3">
                          <img src={mCardPng} className="img-fluid" alt="" />
                        </div>
                        <div className="col-8">
                          <span className="fw-semibold">Mastercard</span>
                        </div>
                        <div className="col-1">
                          <input className="form-check-input border-2 me-3" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="sizes-filter mt-3 pb-4">
                <div className="row px-4">
                  <div className="col-12 mb-2">
                    <div className="title">
                      <span className="fw-semibold">Shopping summary</span>
                    </div>

                    {/* <!-- List Price --> */}
                    <div className="total-price">
                      <div className="row mt-2">
                        <div className="col-8">
                          <span className="color-trinary">Order</span>
                        </div>
                        <div className="col-4">
                          <span className="fw-bold d-block text-end">Rp. 590000</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <span className="color-trinary">Delivery</span>
                        </div>
                        <div className="col-4">
                          <span className="fw-bold d-block text-end">Rp. 5000</span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End List price --> */}
                  </div>
                </div>
              </section>
            </div>

            <div className="row px-4 pb-3 shadow">
              <div className="col-6">
                <span className="fw-semibold d-block">Shopping summary</span>
                <span className="fw-semibold d-block text-danger">Rp. 585000</span>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-end">
                <button onClick={createOrderHandler} type="button" className="btn h-75 pt-0 btn-danger w-100 rounded-pill text-light">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Modal Payment --> */}
    </Layout>
  );
};

export default CheckOut;
