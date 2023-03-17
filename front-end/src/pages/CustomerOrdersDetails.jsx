import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import CustomerNavBar from '../components/CustomerNavBar';
import { getLocalStorage } from '../utils/storage';

function CustomerOrdersDetails() {
  const [saleInfo, setSaleInfo] = useState([]);
  const items = getLocalStorage('CartItems');

  const total = items
    .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
    .toFixed(2);

  // const history = useHistory();

  const getSale = async () => {
    const saleId = getLocalStorage('SaleId');
    const { data } = await axios.get(`http://localhost:3001/sales/${saleId}`);
    const { id: orderId, saleDate, seller, status, totalPrice } = data;
    const { name: sellerName } = seller;
    const date = new Date(saleDate);
    const formatDate = `${date.getDate()
    }/0${date.getMonth() + 1}/${date.getFullYear()}`;
    setSaleInfo({ orderId, formatDate, sellerName, status, totalPrice });
  };
  const { orderId, formatDate, sellerName, status } = saleInfo;

  useEffect(() => {
    getSale();
  }, []);

  return (
    <div>
      <CustomerNavBar />
      <span
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        {orderId}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        {sellerName}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {formatDate}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </span>
      {
        status !== 'Em Trânsito' ? (
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="submit"
            disabled
          >
            Marcar como Finalizado
          </button>
        ) : (
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="submit"
            disabled={ false }
          >
            Marcar como Finalizado
          </button>
        )
      }
      <table>
        <tr>
          <td>Item</td>
          <td>Descrição</td>
          <td>Quantidade</td>
          <td>Valor Unitário</td>
          <td>Sub-Total</td>
          <td>Remover Item</td>
        </tr>
      </table>
      <table>
        <tr>
          {
            items.map(({ id, cartId, name, price, quantity }) => (
              <div key={ id }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${cartId}`
                  }
                >
                  {cartId + 1}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${cartId}`
                  }
                >
                  { `Cerveja ${name}` }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${cartId}`
                  }
                >
                  { quantity }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${cartId}`
                  }
                >
                  { (price).replace('.', ',') }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${cartId}`
                  }
                >
                  { (price * quantity).toFixed(2).replace('.', ',') }
                </td>
              </div>
            ))
          }
        </tr>
      </table>
      <p> Valor Total R$:</p>
      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        { total.replace('.', ',') }
      </span>
    </div>
  );
}

export default CustomerOrdersDetails;
