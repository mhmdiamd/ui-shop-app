import React from 'react';
import { Dashboard } from '../../../../components/Layout/Dashboard';
import { DashboardCardContent } from './../../../../components/Dashboard/DashboardCardContent';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeleteProductMutation, useGetProductByIdSellerQuery } from '../../../../features/product/productApi';
import DataTable from 'react-data-table-component';
import { convert } from 'rupiah-format'

export const MyProduct = () => {
  const { data: products, isLoading, error } = useGetProductByIdSellerQuery();
  const [deleteProduct, { isLoading: isLoadingDeleteProduct, error: errorDeleteProduct }] = useDeleteProductMutation();

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f5f5f5',
      },
    },
    headCells: {
      style: {
        color: '#202124',
        fontSize: '14px',
      },
    },

    rows: {
      style: {},
      highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        borderRadius: '25px',
        outline: '1px solid #FFFFFF',
      },
    },
    pagination: {
      style: {
        border: 'none',
      },
    },
  };

  const columns = [
    {
      name: 'Product Name',
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => convert(row.price),
      sortable: true,
    },
    {
      name: 'Operations',
      cell: (row) => {
        return (
          <>
            <button className="btn btn-danger me-2" onClick={() => deleteHandler(row.id)}>
              <FontAwesomeIcon icon={faTrash} row={row} />
            </button>
            <Link to={`/dashboard/sellers/products/${row.id}`} className="btn btn-success">
              <FontAwesomeIcon icon={faPenSquare} row={row} />
            </Link>
          </>
        );
      },
      allowOverflow: true,
      button: true,
      width: '56px',
    },
  ];

  const deleteHandler = async (id) => {
    console.log(id);
    if (window.confirm(`Are you sure to delete this product?`)) {
      try {
        const response = await deleteProduct(id);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Dashboard>
      <DashboardCardContent title={'My Product'}>
        <div className="col-12 mb-2">
          <Link className="btn btn-primary" to={'/dashboard/sellers/selling-product'}>
            Create Product
          </Link>
        </div>
        <div className="col-12">
          <DataTable columns={columns} data={products} customStyles={customStyles} pagination highlightOnHover pointerOnHover />
        </div>
      </DashboardCardContent>
    </Dashboard>
  );
};
