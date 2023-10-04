export const getUserToken = () => {
  const userToken = localStorage.getItem('userJwt');
  if (userToken) {
    console.log('user Token', userToken, typeof (userToken));
    return userToken;
  }
  return null;
};

export const getAdminToken = () => {
  const adminToken = localStorage.getItem('adminJwt');
  if (adminToken) {
    console.log('admin Token', adminToken, typeof (adminToken));
    return adminToken;
  }
  return null;
};
