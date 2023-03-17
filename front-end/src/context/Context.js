import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';

const contextAPI = createContext({});

function Provider({ children }) {
  const [userData, setUserData] = useState(JSON.parse(userDataCache) || {});

  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
    }),
    [userData],
  );

  return (
    <contextAPI.Provider value={ contextValue }>{children}</contextAPI.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export { contextAPI };
export default Provider;
