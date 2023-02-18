import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import style from './style.module.css';
import { faBan, faEllipsisVertical, faBox } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import { useGetOrderByIdSellerQuery, useUpdateOrderByIdMutation } from '../../../../../features/order/orderApi';
import { Dashboard } from '../../../../../components/Layout/Dashboard';
import { DashboardCardContent } from '../../../../../components/Dashboard/DashboardCardContent';
import Swal from 'sweetalert2';

const SellerOrder = () => {
  const [status, setStatus] = useState('');
  const { data: orders, isLoading, error } = useGetOrderByIdSellerQuery({ status });
  const [updateOrderById, { isLoading: isLoadingUpdateOrder }] = useUpdateOrderByIdMutation();

  const [data, setData] = useState([]);

  const acceptCancelHandler = async (id) => {
    Swal.fire({
      title: 'Are you sure to cancel order?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateOrderById({ id, status: 'cancel' });
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

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
      name: 'Product',
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Operations',
      cell: (row) => {
        return (
          <div className="dropstart">
            <FontAwesomeIcon role="button" data-bs-toggle="dropdown" aria-expanded="false" icon={faEllipsisVertical} row={row} />

            <ul className={`dropdown-menu ${style.dropDownMenu}`}>
              {row.status == 'request cancel' && (
                <li>
                  <button className="dropdown-item" onClick={() => acceptCancelHandler(row.id)}>
                    <FontAwesomeIcon className="text-danger me-2" icon={faBan} />
                    Accept Cancel
                  </button>
                </li>
              )}
              <li>
                <button className="dropdown-item" onClick={() => {}}>
                  <FontAwesomeIcon className="text-success me-2" icon={faBox} />
                  Order Recived
                </button>
              </li>
            </ul>
          </div>
        );
      },
      allowOverflow: true,
      button: true,
      width: '56px',
    },
  ];

  function renderDatatable() {
    return <DataTable columns={columns} data={data} customStyles={customStyles} pagination highlightOnHover pointerOnHover />;
  }

  useEffect(() => {
    if (!isLoading) {
      setData(orders);
    }
  }, [status, renderDatatable]);

  return (
    <Dashboard>
      <DashboardCardContent title={'My Order'}>
        {/* <img src="https://drive.google.com/uc?id=1Eo0AWpb1F-eMUWcOKyj2j0gmgB7b7YXM" alt="" /> */}
        <div className="col-12 mb-3">
          <ul className="list-group list-group-horizontal border-3 m-0 p-0 border-bottom rounded-0 w-100 d-flex justify-content-between order-menu">
            <li className={`${style.listOrder} list-group-item border border-0 border-3 ${status == '' ? 'text-danger border-danger' : ''}  px-1 rounded-0 border-bottom fw-semibold`} onClick={() => setStatus('')}>
              All items
            </li>
            <li className={`${style.listOrder} ${status == 'unpaid' ? 'text-danger border-danger' : ''}  list-group-item border border-0 border-3 px-1 rounded-0 border-bottom fw-semibold`} onClick={() => setStatus('unpaid')}>
              Not Yet Paid
            </li>
            <li className={`${style.listOrder} ${status == 'packing' ? 'text-danger border-danger' : ''}  list-group-item border border-0 border-3 px-1 rounded-0 border-bottom fw-semibold`} onClick={() => setStatus('packing')}>
              Packed
            </li>
            <li className={`${style.listOrder} ${status == 'sending' ? 'text-danger border-danger' : ''}  list-group-item border border-0 border-3 px-1 rounded-0 border-bottom fw-semibold`} onClick={() => setStatus('sending')}>
              Send
            </li>
            <li className={`${style.listOrder} ${status == 'completed' ? 'text-danger border-danger' : ''}  list-group-item border border-0 border-3 px-1 rounded-0 border-bottom fw-semibold`} onClick={() => setStatus('completed')}>
              Completed
            </li>
          </ul>
        </div>
        <div className="col-12">{error ? <h1>Data not found!</h1> : renderDatatable()}</div>
      </DashboardCardContent>
    </Dashboard>
  );
};

export default SellerOrder;
