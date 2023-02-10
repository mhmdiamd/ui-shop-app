import React, { useState } from 'react';
import { useCreateShippingAddressCustomerMutation } from '../../features/shippingAddress/shippingAddressApi';

const ModalCreateAddress = ({ children }) => {
  const [createShippingAddressCustomer, { error, isLoading }] = useCreateShippingAddressCustomerMutation();
  const [data, setData] = useState({
    as_address: '',
    recipent_name: '',
    recipent_phone: '',
    address: '',
    postal_code: 0,
    city_or_subdistrict: '',
    status: 0,
  });

  const changeHandler = (e) => {
    setData((prev) => {
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

  const createHandler = async (e) => {
    try {
      await createShippingAddressCustomer(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content pb-4">
            <div className="modal-header border-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body pt-0">
              <div className="row px-5">
                <div className="col-12 mb-3">
                  <h1 className="modal-title fs-4 text-center" id="exampleModalToggleLabel">
                    Choose another address
                  </h1>
                </div>

                <div className="col-12 border-3 d-flex justify-content-center add-address rounded p-4 my-3" data-bs-target="#createAddress" data-bs-toggle="modal">
                  <span className="fw-semibold color-trinary">Add new address</span>
                </div>

                {children}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade modal-address" id="createAddress" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
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

                <div className="col-12">
                  <div className="row">
                    <div className="col-12 px-0">
                      <label htmlFor="inputPlace5" className="form-label color-trinary helper-text">
                        Save address as (ex : home address, office address)
                      </label>
                      <input type="text" id="inputPlace5" name="as_address" value={data.as_address} onChange={changeHandler} className="form-control" aria-describedby="PlaceHelpBlock" />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1 ps-0">
                      <label htmlFor="inputPlace6" className="form-label color-trinary helper-text">
                        Recipient’s name
                      </label>
                      <input type="text" id="inputPlace6" className="form-control" aria-describedby="PlaceHelpBlock" name="recipent_name" value={data.recipent_name} onChange={changeHandler} />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1 pe-0">
                      <label htmlFor="inputPlace6" className="form-label color-trinary helper-text">
                        Recipient's telephone number
                      </label>
                      <input type="text" id="inputPlace6" className="form-control" aria-describedby="PlaceHelpBlock" name="recipent_phone" value={data.recipent_phone} onChange={changeHandler} />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1 px-0">
                      <label htmlFor="inputPlace6" className="form-label color-trinary helper-text">
                        Address
                      </label>
                      <input type="text" id="inputPlace6" className="form-control" aria-describedby="PlaceHelpBlock" name="address" value={data.address} onChange={changeHandler} />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1 pe-0">
                      <label htmlFor="inputPlace6" className="form-label color-trinary helper-text">
                        Postal code
                      </label>
                      <input type="text" id="inputPlace6" className="form-control" aria-describedby="PlaceHelpBlock" name="postal_code" value={data.postal_code} onChange={changeHandler} />
                    </div>

                    <div className="col-12 col-md-6 mt-md-1 px-0">
                      <label htmlFor="inputPlace6" className="form-label color-trinary helper-text">
                        City or Subdistrict
                      </label>
                      <input type="text" id="inputPlace6" className="form-control" aria-describedby="PlaceHelpBlock" name="city_or_subdistrict" value={data.city_or_subdistrict} onChange={changeHandler} />
                    </div>

                    <div className="col-12 px-0 mt-4">
                      <input className="form-check-input border-2 me-3" name="status" type="checkbox" value={data.status} id="flexCheckDefault" onChange={changeHandler} />
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
                          <button className="btn btn-danger text-light w-100 rounded-pill" data-bs-target="#exampleModalToggle" onClick={createHandler} data-bs-toggle="modal">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCreateAddress;
