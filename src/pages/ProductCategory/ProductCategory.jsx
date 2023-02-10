import React from 'react';
import useFetch from '../../common/useFetch';
import { SectionContent } from '../../components/SectionContent/SectionContent';
import { CardProduct } from './../../components/CardProduct/CardProduct';
import { Layout } from './../../components/Layout/Main';
import { useParams } from 'react-router-dom';

export const ProductCategory = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetch(`${process.env.REACT_APP_ENDPOINT}/products/categories/${id}`);
  const products = data.data;

  return (
    <Layout>
      <div className="container">
        <SectionContent title={'Category'}>
          {loading
            ? 'Loading....'
            : products?.map((product) => {
                return <CardProduct key={product.id} data={product} />;
              })}
        </SectionContent>
      </div>
    </Layout>
  );
};
