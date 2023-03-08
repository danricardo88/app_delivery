import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerNavBar from '../components/CustomerNavBar';

function CustomerProducts() {
  const [qnt, setQnt] = useState(0);
  const [productsDetails, setProductsDetais] = useState(false);
  const history = useHistory();

  const getProducts = async () => {
    const { data } = await axios.get('http://localhost:3001/products');
    const cart = data.map((product) => ({ ...product, quantity: 0 }));
    setProductsDetais([[...cart], { totalPrice: 0.00 }]);
  };
  const addQuantityCart = ({ name, value }, price, id) => {
    if (name === 'plus') {
      productsDetails[1].totalPrice += price;
      productsDetails[0][id - 1].quantity += 1;
      return setQnt(qnt + 1);
    }
    if (name === 'less' && productsDetails[0][id - 1].quantity > 0) {
      productsDetails[1].totalPrice -= price;
      productsDetails[0][id - 1].quantity -= 1;
      return setQnt(qnt - 1);
    }
    if (name === 'less' && productsDetails[0][id - 1].quantity === 0) return;
    productsDetails[0][id - 1].quantity = Number(value);
    const total = productsDetails[0]
      .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
    productsDetails[1].totalPrice = total;
    setQnt(Number(value));
  };

  useEffect(() => {
    getProducts();
  }, []);
  if (!productsDetails) return <p>Loading</p>;
  console.log(qnt);

  return (
    <div>
      <CustomerNavBar />
      {
        productsDetails[0].map(({ id, name, price, urlImage, quantity }) => (
          <div key={ id } data-testid="customer_products__button-cart">
            <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
            <p data-testid={ `customer_products__element-card-price-${id}` }>
              { price.replace('.', ',') }
            </p>
            <img
              className="img-products"
              data-testid={ `customer_products__img-card-bg-image-${id}` }
              src={ urlImage }
              alt="productImage"
              width={ 120 }
              height={ 150 }
            />
            <button
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              type="button"
              name="less"
              onClick={ (e) => addQuantityCart(e.target, Number(price), id) }
            >
              -
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${id}` }
              type="number"
              value={ quantity < 0 ? 0 : quantity }
              onChange={ (e) => addQuantityCart(e.target, Number(price), id) }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${id}` }
              type="button"
              name="plus"
              onClick={ (e) => addQuantityCart(e.target, Number(price), id) }
            >
              +
            </button>
          </div>
        ))
      }
      <button
        onClick={ () => history('/customer/checkout') }
        type="button"
        className="btn-checkout"
        data-testid="customer_products__button-cart"
        disabled={ productsDetails[1].totalPrice < 1 }
      >
        Ver Carrinho: R$ valor
        <span data-testid="customer_products__checkout-bottom-value">
          { productsDetails[1].totalPrice.toFixed(2).replace('.', ',') }
        </span>
      </button>
    </div>
  );
}

export default CustomerProducts;
