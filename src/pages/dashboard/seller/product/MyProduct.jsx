import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Dashboard } from '../../../../components/Layout/Dashboard';
import { DashboardCardContent } from './../../../../components/Dashboard/DashboardCardContent';
import { Datatable } from './../../../../components/Datatable/Datatable';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
export const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const deleteHandler = async (id) => {
    if (window.confirm(`Are you sure to delete this product?`)) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/v1/products/${id}`);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/products/5db236c3-506e-4f8e-a815-f829e428d275/sellers`)
      .then((res) => res.data)
      .then((res) => {
        const propAttr = res.data.map((data) => {
          return {
            product_name: data.product_name,
            price: data.price,
            stock: data.stock,
          };
        });
        setAllProducts(res.data);
        setProducts(propAttr);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Dashboard>
      <DashboardCardContent title={'My Product'}>
        <div className="col-12 mb-2">
          <Link className="btn btn-primary" to={'/dashboard/sellers/selling-product'}>
            Create Product
          </Link>
        </div>
        <div className="col-12">
          <Datatable data={products}>
            {allProducts.map((product, index) => {
              return (
                <tr key={index}>
                  <td className="text-xs font-weight-bold">{index + 1}</td>
                  <td className="text-xs font-weight-bold">{product.product_name}</td>
                  <td className="text-xs font-weight-bold">{product.price}</td>
                  <td className="text-xs font-weight-bold">{product.stock}</td>
                  <td className="text-xs font-weight-bold d-flex gap-2">
                    <button className="btn btn-danger" onClick={() => deleteHandler(product.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link to={`/dashboard/sellers/products/${product.id}`} className="btn btn-success">
                      <FontAwesomeIcon icon={faPenSquare} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </Datatable>
        </div>
      </DashboardCardContent>
    </Dashboard>
  );
};
