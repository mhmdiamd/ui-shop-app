import React, { useEffect, useState } from 'react';
import { useUpdateShippingAddressByIdMutation } from '../../features/shippingAddress/shippingAddressApi';
import { InputForm } from './../Form/InputForm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModalChangeAddress = ({ data }) => {
  const MySwal = withReactContent(Swal);
  const [updateShippingAddressById, { isLoading, error, isError }] = useUpdateShippingAddressByIdMutation();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    as_address: '',
    recipent_name: '',
    recipent_phone: '',
    address: '',
    postal_code: 0,
    city_or_subdistrict: '',
    status: 0,
  });

  const changeHandler = (e) => {
    setShippingAddress((prev) => {
      if (e.target.name == 'status') {
        return {
          ...prev,
          status: e.target.value == 0 ? 1 : 0,
        };
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      }
    });
  };

  const saveHandler = async (e) => {
    try {
      await updateShippingAddressById({ id: data.id, body: shippingAddress });
      if (!isError) {
        MySwal.fire({
          title: <p>Success Update Shipping address!</p>,
          icon: 'success',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!isLoading) {
      setShippingAddress(data);
    }
    setLoading(false);
  }, [isLoading]);
  return (
    <div className="modal fade modal-address" id={`${data.id}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content pb-4">
          <div className="modal-header border-0">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body pt-0">
            <div className="row px-5">
              <div className="col-12 mb-4">
                <h1 className="modal-title fs-4 text-center" id="exampleModalToggleLabel">
                  Choose another address
                </h1>
              </div>

              {loading ? (
                'Loading...'
              ) : (
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <InputForm type={'text'} title={'Save address as (ex : home address, office address)'} name="as_address" value={shippingAddress.as_address} onchange={changeHandler} />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1">
                      <InputForm type={'text'} title={'Recipient’s name'} name="recipent_name" value={shippingAddress.recipent_name} onchange={changeHandler} />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1">
                      <InputForm type={'text'} title={'Recipient’s phone'} name="recipent_phone" value={shippingAddress.recipent_phone} onchange={changeHandler} />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1">
                      <InputForm type={'text'} title={'Address'} name="address" value={shippingAddress.address} onchange={changeHandler} />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1 pe-0">
                      <InputForm type={'number'} title={'Postal code'} name="postal_code" value={shippingAddress.postal_code} onchange={changeHandler} />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1">
                      <InputForm title={'City or Subdistrict'} name="city_or_subdistrict" value={shippingAddress.city_or_subdistrict} onchange={changeHandler} />
                    </div>

                    <div className="col-12 mt-4">
                      <input className="form-check-input border-2 me-3" type="checkbox" value={shippingAddress.status} name="status" checked={shippingAddress.status == 1} id="flexCheckDefault" onChange={changeHandler} />
                      <span className="color-trinary helper-text">Make it the primary address</span>
                    </div>
                  </div>

                  <div className="row d-md-flex justify-content-end mt-5">
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-6 ps-0 pe-1">
                          <button className="btn border border-2 w-100 rounded-pill" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                            Cancel
                          </button>
                        </div>
                        <div className="col-6 pe-0 ps-1">
                          <button className="btn btn-danger text-light w-100 rounded-pill" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={saveHandler}>
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalChangeAddress;
