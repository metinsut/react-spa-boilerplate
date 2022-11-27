import axios from 'axios';

const apiCall = axios.create({});

interface Tokens {
  jwtToken: string;
  refreshToken: string;
}

const tokens: Tokens = {
  jwtToken: '123-456-789',
  refreshToken: '123'
};

apiCall.defaults.headers.common['Authorization'] = `Bearer ${tokens.jwtToken}`;

apiCall.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      // const payload = {
      //   jwtToken: tokens.jwtToken,
      //   refreshToken: tokens.refreshToken
      // };

      // const apiResponse = await axios.post('http://localhost:4000/auth/refreshtoken', payload);
      const apiResponse = await { data: { jwtToken: '123-456-789', refreshToken: '123' } };
      localStorage.setItem('tokens', JSON.stringify(apiResponse.data));
      error.config.headers['Authorization'] = `bearer ${apiResponse.data.jwtToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export { apiCall };
