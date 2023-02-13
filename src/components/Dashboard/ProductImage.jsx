import React, { useState, useEffect } from 'react';
import boxPhoto from '../../assets/box.png';

export const ProductImage = ({ id, onchange, oldPhoto }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  function imageClickHandler(e) {
    const inputImg = document.querySelector(`#photo${id}`);
    inputImg.click();
  }

  const selectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    onchange(e.target.files[0]);
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

  return (
    <div className={`item ${id === 1 ? 'first-item' : ''}  d-flex mx-auto justify-content-center align-items-center mb-2`} onClick={imageClickHandler} id="thumbnail">
      <img src={preview ? preview : oldPhoto ? oldPhoto : boxPhoto} alt="" className="img-fluid" />

      <input type="file" className="d-none" name="photo1" onChange={selectFile} id={`photo${id}`} />
    </div>
  );
};
