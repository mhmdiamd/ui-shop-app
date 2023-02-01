import React from 'react';

export const AuthInputForm = ({ type, name, placeholder, required, onchange }) => {
  const changeHandler = (value) => {
    onchange(value);
  };

  return (
    <div className="input-group mb-3">
      <input type={type} className="form-control" onChange={(e) => changeHandler(e.target.value)} name={name} placeholder={placeholder} aria-describedby="basic-addon1" required={required ? true : false} />
    </div>
  );
};
