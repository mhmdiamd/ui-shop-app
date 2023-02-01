import axios from 'axios';
import React, { useState } from 'react';
import { TrixEditor } from 'react-trix';
import { DashboardCardContent } from '../../../../components/Dashboard/DashboardCardContent';
import { ProductImage } from '../../../../components/Dashboard/ProductImage';
import { Dashboard } from '../../../../components/Layout/Dashboard';
import './SellingProduct.css';
import { useNavigate } from 'react-router-dom';

export const SellingProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState();

  function handleEditorReady(editor) {
    editor.insertString('editor is ready');
  }

  function handleChange(html, text) {
    setDescription(text);
  }

  const createHandler = async (e) => {
    const formData = new FormData();

    formData.append('id_category', 9);
    formData.append('color', size);
    formData.append('size', color);
    formData.append('product_name', productName);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('condition', condition);
    formData.append('description', description);
    formData.append('photo', photo);

    try {
      const accessToken = localStorage.getItem('access_token').split('"')[1];
      const productCreated = await axios.post(`${process.env.REACT_APP_ENDPOINT}/products`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (productCreated.data) {
        navigate('/dashboard/sellers/my-product');
      }
    } catch (err) {
      if (err.response.data.status === 403) {
        localStorage.clear();
        navigate('/sellers/login');
      }
    }
  };

  return (
    <Dashboard>
      <DashboardCardContent title={'Inventory'}>
        <div className="col-12 col-md-6">
          <label for="name-product" className="form-label color-trinary">
            Name of goods
          </label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="form-control mb-2" id="name-product" />

          <label for="name-product" className="form-label color-trinary">
            Size
          </label>
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} className="form-control mb-2" id="name-product" />

          <label for="name-product" className="form-label color-trinary">
            Color
          </label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="form-control" id="name-product" />
        </div>
      </DashboardCardContent>

      <DashboardCardContent title={'Item Details'}>
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-6 me-2 mb-3">
              <label for="name-product" className="form-label color-trinary">
                Unit Price
              </label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  Rp
                </span>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="unit-price" />
              </div>
            </div>

            <div className="col-12 col-md-6 me-1 mb-3">
              <label for="name-product" className="form-label color-trinary">
                Stock
              </label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="form-control" id="stock" />
            </div>

            <div className="col-12 col-md-6">
              <label for="name-product" className="form-label color-trinary">
                Condition
              </label>
              <div className="condition d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={'new'} onChange={(e) => setCondition(e.target.value)} />
                  <label className="form-check-label" for="flexRadioDefault1">
                    New
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={'secondhand'} onChange={(e) => setCondition(e.target.value)} />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Secondhand
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardCardContent>

      <DashboardCardContent title={'Photo of Goods'}>
        <div className="col-12 container-product-image">
          <div className="container">
            <div className="row main-row-photo-product rounded">
              <div className="col-12 d-flex flex-wrap justify-content-center align-items-center">
                <div className="row">
                  <div className="col-12 gap-2 d-flex align-items-center flex-wrap">
                    <ProductImage id={1} onchange={(value) => setPhoto(value)} />
                    <ProductImage id={2} />
                    <ProductImage id={3} />
                    <ProductImage id={4} />
                    <ProductImage id={5} />
                    <ProductImage id={6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardCardContent>

      <DashboardCardContent title={'Description'}>
        <div className="col-12 ">
          <TrixEditor onChange={handleChange} onEditorReady={handleEditorReady} />
        </div>
      </DashboardCardContent>

      <div className="row">
        <div className="col-12 d-flex justify-content-end pe-0">
          <button className="btn btn-danger rounded-pill px-5" type="submit" onClick={createHandler}>
            Save
          </button>
        </div>
      </div>
    </Dashboard>
  );
};
