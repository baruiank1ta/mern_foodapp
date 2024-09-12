import axios from 'axios';

axios.interceptors.request.use(
  req => {
    const user = localStorage.getItem('user');//gets the user from local storage
    const token = user && JSON.parse(user).token;//if user available we parse it into js obj and get the token
    if (token) {
      req.headers['access_token'] = token;//if token isn't null it sets the header of access_token as the current token
    }
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);
