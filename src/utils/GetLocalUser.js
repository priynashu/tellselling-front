export const getLocalUser = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  return userData;
};
