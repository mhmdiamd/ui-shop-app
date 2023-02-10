import React, { useState } from 'react';
import { SectionContent } from '../../components/SectionContent/SectionContent';
import { CardProduct } from '../../components/CardProduct/CardProduct';
import { Layout } from '../../components/Layout/Main';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useGetAllProductQuery } from '../../features/product/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPagination } from './../../features/product/productSlice';

export const ProductType = () => {
  const dispatch = useDispatch();
  const dataParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    search: searchParams.get('search'),
    currentPage: searchParams.get('page'),
    sort: 'desc',
  });

  const { data: products, isLoading, isError } = useGetAllProductQuery(`page=${pagination.currentPage}&${pagination.search ? `search=${pagination.search}` : ''}&limit=5&sort=${pagination?.sort}`);

  function generatePagination() {
    let btn = [];

    for (let i = 1; i <= products.pagination.totalPage; i++) {
      btn.push(
        <button key={i} className={`btn btn-transparent ${products?.pagination.currentPage == i ? 'bg-secondary text-light' : ''}`} onClick={() => window.location.replace(`/products/type/${dataParams.type}?page=${i}`)}>
          {i}
        </button>
      );
    }

    return btn;
  }

  return (
    <Layout>
      <div className="container pb-5">
        {/* <SectionContent title={dataParams.type}> */}
        <div className="row mt-3">
          <div className="section-title d-flex justify-content-between mb-3">
            <span className="fs-3 fw-bold">{dataParams.type}</span>
            <div className="sorting" style={{ width: 'max-content' }}>
              <select className="form-select border-0" aria-label="Default select example" onChange={(e) => setPagination((prev) => ({ ...prev, sort: e.target.value }))}>
                <option selected disabled>
                  Sort
                </option>

                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </select>
            </div>
          </div>

          <div className="col-12 d-flex flex-wrap gap-3">
            {isLoading
              ? 'Loading....'
              : products?.data?.map((product) => {
                  return <CardProduct key={product.id} data={product} />;
                })}
          </div>
        </div>

        {/* </SectionContent> */}
        <div className="pagination d-flex justify-content-center mt-4 gap-3">
          <button className="prev-btn btn btn-secondary" onClick={() => window.location.replace(`/products/type/${dataParams.type}?page=${pagination?.currentPage - 1}`)} disabled={pagination?.currentPage == 1}>
            Prev
          </button>
          <span className="d-flex">{isLoading ? 'Loading....' : generatePagination().map((page, i) => i < 5 && page)}</span>
          <button
            className="prev-btn btn btn-primary"
            onClick={() => window.location.replace(`/products/type/${dataParams.type}?page=${Number(pagination?.currentPage) + 1}`)}
            disabled={pagination?.currentPage == products?.pagination?.totalPage}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};
