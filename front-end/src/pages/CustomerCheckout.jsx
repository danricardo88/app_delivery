// import { reload } from 'pm2';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CustomerNavBar from '../components/CustomerNavBar';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

function CustomerCheckout() {
  const items = getLocalStorage('CartItems');
  const total = items
    .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
    .toFixed(2).replace('.', ',');
  const history = useHistory();
  console.log(items);

  const removeItens = (i, e) => {
    e.preventDefault();
    const result = items.filter((item) => item.id !== i);
    for (let x = 0; x < result.length; x += 1) {
      result[x].id = x;
    }
    setLocalStorage('CartItems', result);
    window.location.reload();
  };

  return (
    <div>
      <CustomerNavBar />
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
            items.map(({ id, name, price, quantity }) => (
              <div key={ id }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${id}`
                  }
                >
                  {id + 1}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${id}`
                  }
                >
                  { `Cerveja ${name}` }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${id}`
                  }
                >
                  { quantity }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${id}`
                  }
                >
                  { (price).replace('.', ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${id}`
                  }
                >
                  { (price * quantity).toFixed(2).replace('.', ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-remove-${id}`
                  }
                >
                  <button
                    type="submit"
                    onClick={ (e) => removeItens(id, e) }
                  >
                    Remover
                  </button>
                </td>
              </div>
            ))
          }
        </tr>
      </table>
      <span
        data-testid="customer_checkout__element-order-total-price"
      >
        Valor Total R$
        { total }
      </span>
      <br />
      <span>
        Detalhes e Endereço para Entrega
      </span>
      <select
        name="venders"
        id=""
        data-testid="customer_checkout__select-seller"
      >
        <option value="eu">eu</option>
      </select>
      <label htmlFor="address">
        <input
          type="text"
          name="address"
          data-testid="customer_checkout__input-address"
        />
        Endereço
      </label>
      <input
        type="number"
        data-testid="customer_checkout__input-address-number"
      />
      <button
        data-testid="customer_checkout__button-submit-order"
        type="submit"
        onClick={ () => history.push('/customer/orders/') }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default CustomerCheckout;
