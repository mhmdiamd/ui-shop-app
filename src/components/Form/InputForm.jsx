import React from 'react';

export const InputForm = ({ value, title, name, type, onchange }) => {
  const handleChange = (e) => {
    onchange(e);
  };
  return (
    <>
      <label htmlFor="name-product" className="form-label color-trinary">
        {title}
      </label>
      <input value={value} type={type} name={name} onChange={handleChange} className="form-control mb-2" />
    </>
  );
};
