import React from 'react';
import { DashboardCardContent } from '../../../../components/Dashboard/DashboardCardContent';
import { Dashboard } from '../../../../components/Layout/Dashboard';
import './style.css';

export const SellerProfile = () => {
  return (
    <Dashboard>
      <DashboardCardContent title={'My Profile'} description={'Manage your profile Information'}>
        <div className="col-12 px-0 pb-4">
          <div className="row d-flex mt-4">
            <div className="col-12 ps-4 col-lg-8 order-2 order-lg-1 d-flex flex-column gap-4">
              <div className="row">
                <div className="col-12 col-lg-4 d-flex align-items-center">
                  <span className="color-trinary">Name</span>
                </div>
                <div className="col-12 col-lg-8">
                  <input type="text" className="form-control" id="name" aria-describedby="nameHelp" />
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-4 align-items-center">
                  <span className="color-trinary">Email</span>
                </div>
                <div className="col-12 col-lg-8">
                  <input type="email" className="form-control" id="email" aria-describedby="emailHekp" />
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-4 d-flex align-items-center">
                  <span className="color-trinary">Phone Number</span>
                </div>
                <div className="col-12 col-lg-8">
                  <input type="number" className="form-control" id="phone" aria-describedby="phoneHelp" />
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-4 d-flex align-items-center">
                  <span className="color-trinary">Gender</span>
                </div>
                <div className="col-12 col-lg-8 gap-5 d-flex">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      {' '}
                      Male{' '}
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      {' '}
                      Female
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-4 d-flex align-items-center">
                  <span className="color-trinary">Date of birth</span>
                </div>
                <div className="col-12 col-lg-8">
                  <input type="date" className="form-control" id="birth-date" aria-describedby="phoneHelp" />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 col-lg-8 col-12 offset-lg-4">
                  <button type="submit" className="btn w-100 rounded-pill px-5 btn-danger">
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 order-1 order-lg-2">
              <div className="row">
                <div className="col-12 col-lg-10 offset-lg-2 change-photo">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                      <div className="main-photo">
                        <img src="../../Assets/image/profile.png" className="img-fluid rounded-pill" alt="" />
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-3">
                      <button type="submit" className="btn border border-2 rounded-pill px-4 bg-transparent color-trinary btn-image">
                        Select Image
                      </button>
                    </div>
                    <input type="file" id="photo" name="photo" className="form-control input-photo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardCardContent>
    </Dashboard>
  );
};
