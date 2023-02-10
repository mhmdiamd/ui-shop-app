import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TrixEditor } from 'react-trix';
import { DashboardCardContent } from '../../../../../components/Dashboard/DashboardCardContent';
import { ProductImage } from '../../../../../components/Dashboard/ProductImage';
import { Dashboard } from '../../../../../components/Layout/Dashboard';
import './UpdateProduct.css';
import { InputForm } from './../../../../../components/Form/InputForm';
import { useGetCategoriesQuery } from '../../../../../features/category/categoryApi';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../../../features/product/productApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../../features/auth/authSlice';

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: dataProduct, error: errorProduct, isLoading: isLoadingProduct } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading, isError, error }] = useUpdateProductMutation();
  const { data: categories } = useGetCategoriesQuery();
  const [product, setProduct] = useState({
    product_name: '',
    color: '',
    size: '',
    price: 0,
    stock: 0,
    condition: '',
    description: '',
    photo: '',
    id_category: '',
  });

  const photoHandle = (value) => {
    setProduct((prev) => {
      return {
        ...prev,
        photo: value,
      };
    });
  };

  const descHandler = (html, text) => {
    setProduct((prev) => {
      return {
        ...prev,
        description: text,
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

  const updateHandler = async (e) => {
    const formData = new FormData();

    for (let attr in product) {
      formData.append(attr, product[attr]);
    }
    const data = { id, body: formData };
    try {
      const productUpdated = await updateProduct(data).unwrap();
      if (productUpdated.message == 'Product Updated') {
        navigate('/dashboard/sellers/my-product');
      }
    } catch (err) {
      if (err.status == 401) {
        navigate(`/customers/login`);
        dispatch(logout());
      }
    }
  };

  useEffect(() => {
    if (!isLoadingProduct) {
      for (let attr in product) {
        setProduct((prev) => {
          return {
            ...prev,
            [attr]: dataProduct[attr],
          };
        });
      }
    }
  }, [isLoadingProduct]);

  return (
    <Dashboard>
      {isLoadingProduct ? (
        'Loading....'
      ) : (
        <>
          <DashboardCardContent title={'Inventory'}>
            <div className="col-12 col-md-6">
              <InputForm type={'text'} value={product.product_name} title={'Name of goods'} name="product_name" onchange={(e) => handleChange(e)} />

              <InputForm type={'text'} value={product.size} title={'Size'} name="size" onchange={(e) => handleChange(e)} />

              <InputForm type={'text'} value={product.color} title={'Color'} name="color" onchange={(e) => handleChange(e)} />

              <label htmlFor="id_category" className="form-label color-trinary">
                Category
              </label>
              <select className="form-select" name={'id_category'} aria-label="Default select example" onChange={handleChange}>
                {categories?.map((category) => {
                  return (
                    <option key={category.id} value={category.id} selected={category.id === product.id_category}>
                      {category.name}
                    </option>
                  );
                })}
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
                    <input type="number" name="price" value={product.price} onChange={handleChange} className="form-control" id="unit-price" />
                  </div>
                </div>

                <div className="col-12 col-md-6 me-1 mb-3">
                  <InputForm type={'number'} value={product.stock} title={'Stock'} name="stock" onchange={(e) => handleChange(e)} />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="name-product" className="form-label color-trinary">
                    Condition
                  </label>
                  <div className="condition d-flex gap-3">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="condition" id="flexRadioDefault1" value={'new'} onChange={handleChange} checked={product.condition === 'new'} />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        New
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="condition" id="flexRadioDefault2" value={'secondhand'} onChange={handleChange} checked={product.condition === 'secondhand'} />
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
                        <ProductImage id={1} onchange={(value) => photoHandle(value)} oldPhoto={product.photo} />
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
              <TrixEditor onChange={descHandler} />
            </div>
          </DashboardCardContent>

          <div className="row">
            <div className="col-12 d-flex justify-content-end pe-0">
              <button className="btn btn-danger rounded-pill px-5" type="submit" onClick={updateHandler}>
                Update
              </button>
            </div>
          </div>
        </>
      )}
    </Dashboard>
  );
};
