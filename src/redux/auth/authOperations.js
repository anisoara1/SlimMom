import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api/';

// To add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// To remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// --------------------REGISTRATION-----------------------------------
// POST @/users/signup
// body: { name, email, password }
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// -----------------LOGIN--------------------------------------------
// POST @/users/login
// body: { name, email }
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// ----------------LOGOUT--------------------------------------
// POST @/users/logout
// headers: Authorization: Bearer token
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// ----------------REFRESH----------------------------------
// GET @/users/current
// headers: Authorization: Bearer token
export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const persistedToken = thunkAPI.getState().auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('Ther is no token to fetch user');
  }
  try {
    setAuthHeader(persistedToken);
    const response = await axios.get('/user/current');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const updateUserTheme = createAsyncThunk(
  'auth/theme',
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const payload = {
        theme: credentials,
      };
      const res = await axios.patch('/user/theme', payload);
      console.log('res', res);
      console.log('res.data', res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
