import React, { useMemo, useState } from 'react';
import propTypes from 'prop-types';
import productContext from './Context';

function ProductProvider({ children }) {
  const [products, setProducts] = useState(['']);
  const contextValue = useMemo(() => ({
    products,
    setProducts,
  }), [setProducts, products]);

  return (
    <productContext.Provider value={ contextValue }>
      {children}
    </productContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default ProductProvider;
