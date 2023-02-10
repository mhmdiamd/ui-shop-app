import React from 'react';

export const AuthInputForm = ({ type, name, placeholder, required, onchange }) => {
  const changeHandler = (e) => {
    onchange(e);
  };

  return (
    <div className="input-group mb-3">
      <input type={type} className="form-control" onChange={(e) => changeHandler(e)} name={name} placeholder={placeholder} aria-describedby="basic-addon1" required={required ? true : false} />
    </div>
  );
};
