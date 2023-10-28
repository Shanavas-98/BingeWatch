import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

const ExpandContext = createContext();

export function ExpandProvider({ children }) {
  ExpandProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [expand, setExpand] = useState(true);
  const contextValue = useMemo(() => ({ expand, setExpand }), [expand, setExpand]);
  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  };
  useEffect(() => {
    localStorage.setItem('chakra-ui-color-mode', 'dark');
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ExpandContext.Provider value={contextValue}>
      {children}
    </ExpandContext.Provider>
  );
}
export default ExpandContext;
