import axios from 'axios';
import React, { useState } from 'react';
import { TrixEditor } from 'react-trix';
import { DashboardCardContent } from '../../../../components/Dashboard/DashboardCardContent';
import { ProductImage } from '../../../../components/Dashboard/ProductImage';
import { Dashboard } from '../../../../components/Layout/Dashboard';
import './SellingProduct.css';
import { useNavigate } from 'react-router-dom';
import { InputForm } from '../../../../components/Form/InputForm';
import { useGetCategoriesQuery } from '../../../../features/category/categoryApi';
import { useCreateProductMutation } from '../../../../features/product/productApi';
export const SellingProduct = () => {
  const { data: categories, isError, isLoading } = useGetCategoriesQuery();
  const [createProduct, { isLoading: isLoadingCreateProduct, error }] = useCreateProductMutation();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    product_name: '',
    color: '',
    size: '',
    price: 0,
    stock: 0,
    condition: '',
    description: '',
    photo: undefined,
    id_category: undefined,
  });

  const photoHandle = (value) => {
    setProduct((prev) => {
      return {
        ...prev,
        photo: value,
      };
    });
  };

  const handleChange = (e) => {
    setProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  function handleEditorReady(editor) {
    editor.insertString('editor is ready');
  }

  function descChange(html, text) {
    setProduct((prev) => {
      return {
        ...prev,
        description: text,
      };
    });
  }

  const createHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let attr in product) {
      formData.append(attr, product[attr]);
    }

    try {
      const productCreated = await createProduct(formData).unwrap();
      if (productCreated.message == 'Product was created!') {
        navigate('/dashboard/sellers/my-product');
      }
    } catch (err) {
      console.log('tes');
    }
  };

  return (
    <Dashboard>
      <DashboardCardContent title={'Inventory'}>
        <div className="col-12 col-md-6">
          <InputForm type={'text'} title={'Name of goods'} name="product_name" onchange={(e) => handleChange(e)} />

          <InputForm type={'text'} title={'Size'} name="size" onchange={(e) => handleChange(e)} />

          <InputForm type={'text'} title={'Color'} name="color" onchange={(e) => handleChange(e)} />

          <label htmlFor="id_category" className="form-label color-trinary">
            Category
          </label>
          <select className="form-select" name={'id_category'} aria-label="Default select example" onChange={handleChange}>
            <option selected>Select Category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </DashboardCardContent>

      <DashboardCardContent title={'Item Details'}>
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-6 me-2 mb-3">
              <label htmlFor="name-product" className="form-label color-trinary">
                Unit Price
              </label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  Rp
                </span>
                <input type="number" name="price" onChange={handleChange} className="form-control" id="unit-price" />
              </div>
            </div>

            <div className="col-12 col-md-6 me-1 mb-3">
              <InputForm type={'number'} title={'Stock'} name="stock" onchange={(e) => handleChange(e)} />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="name-product" className="form-label color-trinary">
                Condition
              </label>
              <div className="condition d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="condition" id="flexRadioDefault1" value={'new'} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    New
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="condition" id="flexRadioDefault2" value={'secondhand'} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
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
                    <ProductImage id={1} onchange={(value) => photoHandle(value)} />
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
          <TrixEditor onChange={descChange} onEditorReady={handleEditorReady} />
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
