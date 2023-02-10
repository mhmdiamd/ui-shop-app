import React from 'react';

const InputFormProfile = ({ title, value, name, type, onchange }) => {
  function handleChange(e) {
    onchange(e);
  }
  return (
    <div className="row">
      <div className="col-12 col-lg-4 d-flex align-items-center">
        <span className="color-trinary">{title}</span>
      </div>
      <div className="col-12 col-lg-8">
        <input type={type} value={value} className="form-control" name={name} onChange={handleChange} aria-describedby="nameHelp" />
      </div>
    </div>
  );
};

export default InputFormProfile;
