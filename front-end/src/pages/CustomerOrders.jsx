import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomerNavBar from '../components/CustomerNavBar';
import { getLocalStorage } from '../utils/storage';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const { id: userId } = getLocalStorage('user');

  const getOrders = async () => {
    const { data } = await axios.get(`http://localhost:3001/sales/customer/${userId}`);
    setOrders(data);
    console.log(orders);
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
          <div key={ id }>
            <div data-testid={ `customer_orders__element-order-id-${id}` }>
              {id}
            </div>
            <div data-testid={ `customer_orders__element-delivery-status-${id}` }>
              {status}
            </div>
            <div data-testid={ `customer_orders__element-order-date-${id}` }>
              {saleDate}
            </div>
            <div data-testid={ `customer_orders__element-card-price-${id}` }>
              {totalPrice}
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default CustomerOrders;
