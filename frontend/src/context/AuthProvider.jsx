import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});
export function AuthProvider({ children }) {
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    localStorage.setItem('chakra-ui-color-mode', 'dark');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    setAdmin(adminInfo);
  }, [navigate]);
  const contextValue = useMemo(() => (
    {
      user, setUser, admin, setAdmin,
    }
  ), [user, setUser, admin, setAdmin]);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
