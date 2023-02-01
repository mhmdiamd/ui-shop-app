import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import profile from '../../assets/profile/profile.png';
import './style.css';
import '../../global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export const Navbar = ({ searchData }) => {
  const [search, setSearch] = useState('');
  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (search) {
        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/products?search=${search}`);
        searchData(response.data);
      } else {
        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/products`);
        searchData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="sticky-top">
        <nav className="navbar navbar-expand-lg shadow" style={{ backgroundColor: '#fff' }}>
          <div className="container pb-1 d-flex">
            <Link className="navbar-brand d-flex align-items-center me-4 btn fs-5 color-trinary" to="/">
              <img src={logo} alt="" className="img-fluid small-logo" />
              <span className="text-danger fs-4 ms-2 fw-bold">Blanja</span>
            </Link>

            {/* Search and Filter tablet mode */}
            <div className="d-none d-md-flex d-lg-none ms-auto w-75 mt-2">
              <div className="w-100 d-flex">
                <div className="search-input position-relative w-100 d-flex">
                  <input className="form-control me-2 rounded-pill w-100" type="text" placeholder="Search" aria-label="Search" />

                  <button className="btn position-absolute search-btn me-2" type="submit">
                    <FontAwesomeIcon className="color-trinary" icon={faMagnifyingGlass} />
                  </button>
                </div>
                <div className="filter">
                  <button className="btn border-trinary border" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <FontAwesomeIcon className="color-trinary" icon={faFilter} />
                  </button>
                </div>
              </div>
            </div>
            {/* End Search and Filter tablet mode */}

            {/* Search and Filter Mobile mode */}
            <div className="d-sm-flex d-md-none d-lg-none ms-auto mt-2">
              <div className="w-100">
                <div className="search-input position-relative w-100 d-flex">
                  <button className="btn btn-danger search-btn-mobile rounded-circle me-2" type="submit" data-bs-toggle="modal" data-bs-target="#searchModal">
                    <FontAwesomeIcon className="text-light" icon={faMagnifyingGlass} />
                  </button>
                </div>
              </div>
            </div>
            {/* End Search and Filter Mobile mode */}

            {/* Search and Filter Desktop mode */}
            <div className="navbar-collapse mt-2 d-none">
              <div className="col-12 col-lg-9 d-flex">
                <div className="input-form w-100 d-flex">
                  <div className="search-input position-relative w-100 d-flex">
                    <input className="form-control me-2 rounded-pill w-100" type="text" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />

                    <button className="btn position-absolute search-btn me-2 " onClick={searchSubmitHandler} type="submit">
                      <FontAwesomeIcon className="color-trinary" icon={faMagnifyingGlass} />
                    </button>
                  </div>
                  <div className="filter">
                    <button className="btn border-trinary border" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <FontAwesomeIcon className="color-trinary" icon={faFilter}></FontAwesomeIcon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* End Search and Filter Desktop mode */}

            {/* Nav Menu Desktop mode */}
            <div className="d-flex mt-2 d-md-block d-none">
              <div className="d-lg-flex d-none gap-3 ms-auto align-items-center">
                <Link to="https://prototype-shop-app-pijarcamp.vercel.app/Pages/my-bag/my-bag.html" className="btn fs-5 color-trinary">
                  {/* <FontAwesomeIcon className="color-trinary" icon="fa-solid fa-cart-shopping"></FontAwesomeIcon> */}
                  <FontAwesomeIcon className="color-trinary" icon={faShoppingCart}></FontAwesomeIcon>
                </Link>

                <Link to="" className="color-trinary btn fs-5">
                  <FontAwesomeIcon className="color-trinary" icon={faBell}></FontAwesomeIcon>
                </Link>

                <Link to="https://prototype-shop-app-pijarcamp.vercel.app/Pages/chat/chat.html" className="btn fs-5 color-trinary btn fs-5 color-trinary">
                  <FontAwesomeIcon className="color-trinary" icon={faEnvelope}></FontAwesomeIcon>
                </Link>

                <Link to="https://prototype-shop-app-pijarcamp.vercel.app/Pages/profile/profile.html" className="profile">
                  <img src={profile} className="img-fluid" alt="" />
                </Link>
              </div>
            </div>
            {/* End Nav Menu Desktop mode */}
          </div>
        </nav>
      </header>

      {/* Modal search */}
      <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content min-vh-100">
            <div className="modal-header border-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 d-flex gap-2">
                  <input type="text" className="form-control input-search shadow-none border-0 border-bottom rounded-0 bg-light bg-transparent" name="search" placeholder="Search here.." />
                  <button className="btn border-trinary border rounded-0" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <FontAwesomeIcon className="color-trinary" icon={faFilter} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* EndModal search */}

      {/* Modal FIlter */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header border-bottom border-2">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Filter
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body px-0 overflow-x-hidden">
              <section className="colors-filter border-bottom border-2 pb-4">
                <div className="row px-4">
                  <div className="col-12 text-start mb-2">
                    <span className="fw-semibold ">Colors</span>
                  </div>
                  <div className="col-12 d-flex gap-3 mt-3">
                    <div className="color-option color-black rounded-circle"></div>

                    <div className="color-option color-white shadow rounded-circle"></div>

                    <div className="color-option color-red rounded-circle"></div>

                    <div className="color-option color-gray rounded-circle"></div>

                    <div className="color-option color-cream rounded-circle"></div>

                    <div className="color-option color-blue rounded-circle"></div>
                  </div>
                </div>
              </section>

              <section className="sizes-filter border-bottom pt-2 border-2 pb-4">
                <div className="row px-4">
                  <div className="col-12 text-start mb-2">
                    <span className="fw-semibold">Sizes</span>
                  </div>

                  <div className="col-12 d-flex gap-3 mt-3">
                    <button className="sizes-btn btn border-1 border-secondary">S</button>
                    <button className="sizes-btn btn btn-danger border-1 border-danger">M</button>
                    <button className="sizes-btn btn btn-danger border-1 border-danger">L</button>
                    <button className="sizes-btn btn border-1 border-secondary">XL</button>
                    <button className="sizes-btn btn border-1 border-secondary">XS</button>
                  </div>
                </div>
              </section>

              <section className="category-filter border-bottom pt-2 border-2 pb-4">
                <div className="row px-4">
                  <div className="col-12 text-start mb-2">
                    <span className="fw-semibold">Category</span>
                  </div>

                  <div className="col-12 d-flex gap-3 mt-3 flex-wrap">
                    <button className="category-btn btn btn-danger border-1 border-danger">All</button>
                    <button className="category-btn btn border-1 border-secondary">Woman</button>
                    <button className="category-btn btn border-1 border-secondary">Man</button>
                    <button className="category-btn btn border-1 border-secondary">Boys</button>
                    <button className="category-btn btn border-1 border-secondary">Girls</button>
                  </div>
                </div>
              </section>

              <section className="brand-filter border-bottom pt-2 border-2 pb-4">
                <div className="row px-4">
                  <div className="col-12 text-start">
                    <span className="fw-semibold">Brand</span>
                  </div>

                  <div className="col-12">
                    <select className="text-secondary form-select border-0 py-0 px-0 form-select-sm" aria-label=".form-select-sm example">
                      <option selected>Adidas Originals, Jack & Jones, S.Oliver</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>

            <div className="d-flex pt-1 pb-4 gap-3 justify-content-center">
              <button type="button" className="btn btn-transparent border-1 border-secondary rounded-pill px-5" data-bs-target="#searchModal" data-bs-toggle="modal">
                Discard
              </button>
              <button type="button" className="btn btn-danger border-1 border-danger rounded-pill px-5 text-light" data-bs-target="#searchModal" data-bs-toggle="modal">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* End Modal FIlter */}
    </>
  );
};
