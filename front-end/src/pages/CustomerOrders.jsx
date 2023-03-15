import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerNavBar from '../components/CustomerNavBar';

import { getLocalStorage } from '../utils/storage';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const { id: userId } = getLocalStorage('user');

  const getOrders = async () => {
    const { data } = await axios.get(`http://localhost:3001/sales/customer/${userId}`);
    setOrders(data);
    console.log(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <div>
        <CustomerNavBar />
      </div>
      {
        orders.map(({ id, totalPrice, status, saleDate }) => (
          <Link
            key={ id }
            to={ `/customer/orders/${id}` }
          >
            <div key={ id } id={ id }>
              <div data-testid={ `customer_orders__element-order-id-${id}` }>
                {id}
              </div>
              <div data-testid={ `customer_orders__element-delivery-status-${id}` }>
                {status}
              </div>
              <div data-testid={ `customer_orders__element-order-date-${id}` }>
                {
                  `${new Date(saleDate).getDate()
                  }/0${new Date(saleDate).getMonth() + 1}/${
                    new Date(saleDate).getFullYear()}`
                }
              </div>
              <div data-testid={ `customer_orders__element-card-price-${id}` }>
                {totalPrice.replace('.', ',')}
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default CustomerOrders;
