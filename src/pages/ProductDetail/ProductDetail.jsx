import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Main';
import style from './style.module.css';
import { SectionContent } from './../../components/SectionContent/SectionContent';
import { CardProduct } from './../../components/CardProduct/CardProduct';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import photo1 from '../../assets/gallery/product1.png';
import photo2 from '../../assets/gallery/product2.png';
import photo3 from '../../assets/gallery/product3.png';
import photo4 from '../../assets/gallery/product4.png';
import photo5 from '../../assets/gallery/product5.png';
import { useCreateCartMutation } from '../../features/cart/cartApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const ProductDetail = () => {
  const MySwal = withReactContent(Swal);

  const { id } = useParams();
  const [createCart, { error, isLoading, isSuccess }] = useCreateCartMutation();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  const stockIncrement = () => {
    setStock((prev) => {
      if (stock < product.stock) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };
  const stockDecrement = () => {
    setStock((prev) => {
      if (stock > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const addToCartHandler = async () => {
    try {
      await createCart({ id_product: product.id, quantity: stock, color, size }).unwrap();
      MySwal.fire({
        title: <p>Recipe success Created!</p>,
        icon: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/products/${id}`)
      .then((res) => res.data)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/products`)
      .then((res) => res.data)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      {loading ? (
        'Loading...'
      ) : (
        <div className="container pb-5">
          <div className="row border-2 border-bottom pb-5">
            {/* <!-- Url Path --> */}
            <div className="col-12 my-4">
              <div className="page-path descriptive-texxt color-trinary">
                <span className="d-flex gap-3">
                  <Link to="/" className="text-decoration-none color-trinary">
                    Home {'>'}
                  </Link>
                  <Link to="" className="text-decoration-none color-trinary">
                    Category {'>'}
                  </Link>
                  <Link to="" className="text-decoration-none color-trinary">
                    T-Shirt
                  </Link>
                </span>
              </div>
            </div>
            {/* <!-- End Url Path --> */}

            {/* <!-- Headline Product --> */}
            <div className="col-12">
              <div className="row">
                {/* <!-- Image and Gallery --> */}
                <div className="col-12 col-md-4">
                  <div className="col-lg-12 d-flex justify-content-center">
                    <img className="img-fluid rounded" src={product.photo} alt="" />
                  </div>
                  <div className="col-12 gallery mt-3 d-flex gap-2 justify-content-center">
                    <div className={`${style.galleryItems} rounded`}>
                      <img className="img-fluid" crossOrigin="anonymous" src={photo1} alt="" />
                    </div>

                    <div className={`${style.galleryItems} rounded`}>
                      <img className="img-fluid" crossOrigin="anonymous" src={photo2} alt="" />
                    </div>

                    <div className={`${style.galleryItems} rounded`}>
                      <img className="img-fluid" crossOrigin="anonymous" src={photo3} alt="" />
                    </div>

                    <div className={`${style.galleryItems} rounded`}>
                      <img className="img-fluid" crossOrigin="anonymous" src={photo4} alt="" />
                    </div>

                    <div className={`${style.galleryItems} rounded`}>
                      <img className="img-fluid" crossOrigin="anonymous" src={photo5} alt="" />
                    </div>
                  </div>
                </div>
                {/* <!-- End Image and Gallery --> */}

                {/* <!-- Product Information --> */}
                <div className="col-12 col-md-8 ps-3">
                  <h2 className={`fs-4 fw-semibold ${style.productName}`}>{product.product_name}</h2>
                  <span className="descriptive-text color-trinary">{product.store_name}</span>
                  <span className="d-flex mt-2 gap-1 align-items-center">
                    <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    <span className="color-trinary more-small-text">(10)</span>
                  </span>

                  {/* <!-- Price --> */}
                  <div className="product-price mt-4">
                    <span className="descriptive-text color-trinary d-block">Price</span>
                    <span className={`fs-3 fw-bold ${style.price}`}>Rp. {product.price}</span>
                  </div>
                  {/* <!-- End Price --> */}

                  {/* <!-- Colors --> */}
                  <div className="row mt-4">
                    <div className="col-12 mb-2">
                      <span className="fw-semibold descriptive-text">Color</span>
                    </div>
                    <div className="col-12 d-flex gap-2">
                      {product?.color?.split(',').map((dataColor, i) => {
                        return (
                          <div className={`${dataColor != color ? 'border-0' : ''} p-1 border  rounded-circle`} key={i}>
                            <div className={`${style.colorOption} color-option rounded-circle`} style={{ backgroundColor: dataColor }} onClick={() => setColor(dataColor)}></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* <!-- End Colors --> */}

                  {/* <!-- Size and Jumlah --> */}
                  <div className="row mt-4">
                    {/* <!-- Section Size --> */}
                    <div className="col-6 col-md-3">
                      <div className="row">
                        <div className="col-12 mb-2">
                          <span className="fw-semibold">Size</span>
                        </div>
                        <div className={`col-12 flex-wrap ${style.quantity} d-flex gap-1 align-items-center`}>
                          {product?.size?.split(',').map((data, i) => (
                            <button key={i} className={`${style.btnSize} ${data == size ? 'bg-danger text-light border-danger' : ''} btn border`} name={data} onClick={(e) => setSize(e.target.name)}>
                              {data}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Section Size --> */}

                    {/* <!-- Section Jumlah --> */}
                    <div className="col-6 col-md-9">
                      <div className="row">
                        <div className="col-12 mb-2">
                          <span className="fw-semibold">Jumlah</span>
                        </div>
                        <div className={`col-12 ${style.quantity} d-flex gap-3 align-items-center`}>
                          <FontAwesomeIcon className={`fa-solid p-1 fa-minus border border-1 border-trinary rounded-circle ${style.bgTrinary}`} icon={faMinus} onClick={stockDecrement} />

                          <span className="fw-semibold">{stock}</span>

                          <FontAwesomeIcon className="border p-1 border-1 border-trinary rounded-circle" icon={faPlus} onClick={stockIncrement} />
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Section Jumlah --> */}
                  </div>
                  {/* <!-- End Size and Jumlah --> */}

                  {/* <!-- Button --> */}
                  <div className="row mt-4 pt-2">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 col-md-6 mb-2">
                          <div className="row">
                            <div className="col-6 px-1">
                              <button className="btn py-2 border border-2 border-dark text-dark w-100 rounded-pill">Chat</button>
                            </div>
                            <div className="col-6 px-1">
                              <button className="btn py-2 border border-2 border-dark text-dark w-100 rounded-pill" onClick={addToCartHandler}>
                                Add Bag
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 px-1">
                          <button className="btn rounded-pill py-2 w-100 bg-danger text-light">Buy Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Button Button --> */}
                </div>
                {/* <!-- Product Information --> */}
              </div>
            </div>
            {/* <!-- End Headline Product --> */}

            {/* <!-- Product Information --> */}
            <div className="col-12 my-5 mb-0">
              <div className="row mb-4">
                <div className="col-12">
                  <h2 className="product-information fw-semibold fs-3">Product Information</h2>
                </div>
              </div>

              <div className="row">
                <div className="col-12 product-condition mb-4">
                  <span className="fs-5 fw-semibold">Condition</span>
                  <span className="text-danger fw-semibold d-block">{product.condition}</span>
                </div>

                <div className="col-12 product-description mb-4">
                  <span className="d-block fw-semibold fs-5 mb-3">Description</span>
                  <span className="helper-text text-secondary">{product.description}</span>
                </div>
              </div>
            </div>
            {/* <!-- End Product Information --> */}

            {/* <!-- Product Review --> */}
            <div className="col-12">
              <div className="row mb-4">
                <div className="col-12">
                  <h2 className="product-information fs-3">Product Review</h2>
                </div>
              </div>

              <div className="d-flex w-100">
                <div className="primary-rating me-5">
                  <div className="col-12">
                    <div className="rating">
                      <span className="fs-1 fw-semibold">5.0</span>
                      <span className="color-trinary">/5</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <span className="d-flex mt-2 gap-1 align-items-center">
                      <FontAwesomeIcon className="text-warning small-text" icon={faStar} />
                      <FontAwesomeIcon className="text-warning small-text" icon={faStar} />
                      <FontAwesomeIcon className="text-warning small-text" icon={faStar} />
                      <FontAwesomeIcon className="text-warning small-text" icon={faStar} />
                      <FontAwesomeIcon className="text-warning small-text" icon={faStar} />
                    </span>
                  </div>
                </div>

                <div className="total-rating w-100">
                  <div className="d-flex w-md-25 w-100">
                    {/* <!-- Jumlah Start --> */}
                    <div className="d-flex align-items-center">
                      <span className="small-text fw-semibold color-trinary me-1">1</span>
                      <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    </div>
                    {/* <!-- End Jumlah Start --> */}

                    {/* <!-- Progress Bar --> */}
                    <div className="col-md-2 mx-3 col-8 px-0 d-flex align-items-center">
                      <div className="progress w-100 position-inherit" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ height: ' 6px' }}>
                        <div className="progress-bar bg-danger" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    {/* <!-- End Progress Bar --> */}

                    {/* <!-- Total Feedback --> */}
                    <div className="col-5">
                      <span className="total-feedback text-secondart small-text fw-semibold color-trinary">0</span>
                    </div>
                    {/* <!-- End Total Feedback --> */}
                  </div>

                  <div className="d-flex w-md-25 w-100">
                    {/* <!-- Jumlah Start --> */}
                    <div className="d-flex align-items-center">
                      <span className="small-text fw-semibold color-trinary me-1">1</span>
                      <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    </div>
                    {/* <!-- End Jumlah Start --> */}

                    {/* <!-- Progress Bar --> */}
                    <div className="col-md-2 mx-3 col-8 px-0 d-flex align-items-center">
                      <div className="progress w-100 position-inherit" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ height: ' 6px' }}>
                        <div className="progress-bar bg-danger" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    {/* <!-- End Progress Bar --> */}

                    {/* <!-- Total Feedback --> */}
                    <div className="col-5">
                      <span className="total-feedback text-secondart small-text fw-semibold color-trinary">0</span>
                    </div>
                    {/* <!-- End Total Feedback --> */}
                  </div>

                  <div className="d-flex w-md-25 w-100">
                    {/* <!-- Jumlah Start --> */}
                    <div className="d-flex align-items-center">
                      <span className="small-text fw-semibold color-trinary me-1">1</span>
                      <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    </div>
                    {/* <!-- End Jumlah Start --> */}

                    {/* <!-- Progress Bar --> */}
                    <div className="col-md-2 mx-3 col-8 px-0 d-flex align-items-center">
                      <div className="progress w-100 position-inherit" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ height: ' 6px' }}>
                        <div className="progress-bar bg-danger" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    {/* <!-- End Progress Bar --> */}

                    {/* <!-- Total Feedback --> */}
                    <div className="col-5">
                      <span className="total-feedback text-secondart small-text fw-semibold color-trinary">0</span>
                    </div>
                    {/* <!-- End Total Feedback --> */}
                  </div>

                  <div className="d-flex w-md-25 w-100">
                    {/* <!-- Jumlah Start --> */}
                    <div className="d-flex align-items-center">
                      <span className="small-text fw-semibold color-trinary me-1">1</span>
                      <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    </div>
                    {/* <!-- End Jumlah Start --> */}

                    {/* <!-- Progress Bar --> */}
                    <div className="col-md-2 mx-3 col-8 px-0 d-flex align-items-center">
                      <div className="progress w-100 position-inherit" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ height: ' 6px' }}>
                        <div className="progress-bar bg-danger" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    {/* <!-- End Progress Bar --> */}

                    {/* <!-- Total Feedback --> */}
                    <div className="col-5">
                      <span className="total-feedback text-secondart small-text fw-semibold color-trinary">0</span>
                    </div>
                    {/* <!-- End Total Feedback --> */}
                  </div>

                  <div className="d-flex w-md-25 w-100">
                    {/* <!-- Jumlah Start --> */}
                    <div className="d-flex align-items-center">
                      <span className="small-text fw-semibold color-trinary me-1">1</span>
                      <FontAwesomeIcon className="text-warning more-small-text" icon={faStar} />
                    </div>
                    {/* <!-- End Jumlah Start --> */}

                    {/* <!-- Progress Bar --> */}
                    <div className="col-md-2 mx-3 col-8 px-0 d-flex align-items-center">
                      <div className="progress w-100 position-inherit" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ height: ' 6px' }}>
                        <div className="progress-bar bg-danger" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    {/* <!-- End Progress Bar --> */}

                    {/* <!-- Total Feedback --> */}
                    <div className="col-5">
                      <span className="total-feedback text-secondart small-text fw-semibold color-trinary">0</span>
                    </div>
                    {/* <!-- End Total Feedback --> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Product Review --> */}
          </div>

          {/* <!--  Product Section --> */}
          <div id={style['#product']} className="mt-4">
            <SectionContent title={`You may also like this`} description={`You've never seen it before!`}>
              {products?.map((product, i) => (
                <CardProduct key={i} data={product} />
              ))}
            </SectionContent>
          </div>
          {/* <!-- End  Product Section --> */}
        </div>
      )}
    </Layout>
  );
};
