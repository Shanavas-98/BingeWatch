import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const ExpandContext = createContext();

export function ExpandProvider({ children }) {
  ExpandProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [expand, setExpand] = useState(true);
  const contextValue = useMemo(() => ({ expand, setExpand }), [expand, setExpand]);
  return (
    <ExpandContext.Provider value={contextValue}>
      {children}
    </ExpandContext.Provider>
  );
}
export default ExpandContext;
