import axios from 'axios';

//to check if the user is logged in or not and shows user data if yes
export const getUser = () =>
  localStorage.getItem('user') //checking the user from localstorage by getitem func
    ? JSON.parse(localStorage.getItem('user')) //if user available we are going to parse the data and create a js object
    : null;//returns null otherwise

export const login = async (email, password) => {
  const { data } = await axios.post('api/users/login', { email, password }); //using post as we need to found our router on the server
  localStorage.setItem('user', JSON.stringify(data));//if email and password entered is correct it will receive the user data set it in localstorage 
  return data;
};

export const register = async registerData => {
  const { data } = await axios.post('api/users/register', registerData);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem('user');//removing the user from the local store
};

export const updateProfile = async user => {
  const { data } = await axios.put('/api/users/updateProfile', user);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const changePassword = async passwords => {
  await axios.put('/api/users/changePassword', passwords);
};

export const getAll = async searchTerm => {
  const { data } = await axios.get('/api/users/getAll/' + (searchTerm ?? ''));
  return data;
};

export const toggleBlock = async userId => {
  const { data } = await axios.put('/api/users/toggleBlock/' + userId);
  return data;
};

export const getById = async userId => {
  const { data } = await axios.get('/api/users/getById/' + userId);
  return data;
};

export const updateUser = async userData => {
  const { data } = await axios.put('/api/users/update', userData);
  return data;
};
