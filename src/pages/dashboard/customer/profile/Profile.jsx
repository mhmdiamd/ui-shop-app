import React, { useEffect, useState } from 'react';
import { DashboardCardContent } from '../../../../components/Dashboard/DashboardCardContent';
import { Dashboard } from '../../../../components/Layout/Dashboard';
import './style.css';
import InputFormProfile from '../../../../components/Form/InputFormProfile';
import axios from 'axios';
import profile from '../../../../assets/profile/photodefault.jpg';
import { useFindMeQuery } from '../../../../features/auth/authApiSlice';
import { useUpdateCustomerMutation } from '../../../../features/customer/customerApi';

export const CustomerProfile = () => {
  const [data, setData] = useState({
    gender: "man"
  });
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { data: user, isLoading } = useFindMeQuery();
  const [updateCustomer] = useUpdateCustomerMutation()

  function imageClickHandler(e) {
    const inputImg = document.querySelector(`#profile`);
    inputImg.click();
  }

  const selectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setData((prev) => {
        return {
          ...prev,
          photo: undefined,
        };
      });
      setSelectedFile(undefined);

      return;
    }

    setSelectedFile(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        photo: e.target.files[0],
      };
    });
  };

  const changeHandler = (e) => {
    setData((prev) => {
      if (e.target.name == 'phone') {
        return {
          ...prev,
          [e.target.name]: `0${e.target.value}`,
        };
      }
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const updateHandler = async () => {
    const formData = new FormData();
    for (let attr in data) {
      formData.append(attr, data[attr]);
    }
    
    await updateCustomer({id: data.id, data: formData})
  };

  useEffect(() => {
    if (!selectedFile) {
      setSelectedFile(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!isLoading) {
      setData(user);
    }
  }, [isLoading]);

  return (
    <Dashboard user={data}>
      <DashboardCardContent title={'My Profile'} description={'Manage your profile Information'}>
        {isLoading ? (
          'Loading....'
        ) : (
          <div className="col-12 px-0 pb-4">
            <div className="row d-flex mt-4">
              <div className="col-12 ps-4 col-lg-8 order-2 order-lg-1 d-flex flex-column gap-4">
                <InputFormProfile type="text" name={'name'} value={data.name} title="Name" onchange={(e) => changeHandler(e)} />
                <InputFormProfile type="text" name={'email'} value={data.email} title="Email" onchange={(e) => changeHandler(e)} />

                <div className="row">
                  <div className="col-12 col-lg-4 d-flex align-items-center">
                    <span className="color-trinary">Phone Number</span>
                  </div>
                  <div className="col-12 col-lg-8">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        +62
                      </span>
                      <input type="number" name={'phone'} value={data?.phone?.slice(1, 14)} className="form-control" aria-describedby="phoneHelp" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-4 d-flex align-items-center">
                    <span className="color-trinary">Gender</span>
                  </div>
                  <div className="col-12 col-sm-8 gap-5 d-flex mt-2">
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

                <InputFormProfile type="date" name={'birth_date'} value={data.birth_date} title="Birth Date" onchange={(e) => changeHandler(e)} />

                <div className="row mt-3">
                  <div className="col-12 col-lg-8 col-12 offset-lg-4">
                    <button type="submit" onClick={updateHandler} className="btn w-100 rounded-pill px-5 btn-danger">
                      Save
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4 order-1 order-lg-2">
                <div className="row">
                  <div className="col-12 col-lg-10 change-photo">
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center">
                        <div className="main-photo">
                          <img src={preview ? preview : data.photo == 'photodefault.jpg' ? profile : data.photo} className="img-fluid rounded-pill" alt="" />
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-center mt-3">
                        <button type="submit" className="btn border border-2 rounded-pill px-4 bg-transparent color-trinary btn-image" onClick={imageClickHandler}>
                          Select Image
                        </button>
                      </div>
                      <input type="file" id="profile" name="photo" onChange={selectFile} className="form-control input-photo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DashboardCardContent>
    </Dashboard>
  );
};
