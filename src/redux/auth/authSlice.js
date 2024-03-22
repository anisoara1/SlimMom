import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api/';

const registerUserAPI = '/users/signup';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async userData => {
    try {
      console.log('Dispatching registerUser action with payload:', userData);
      const response = await axios.post(registerUserAPI, userData);

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      console.log('Registration response:', data);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    const response = await axios.get('/users/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async userData => {
  try {
    const response = await axios.post('/users/login', userData);
    if (!response.ok) {
      throw new Error('Failed to log in');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async userData => {
    try {
      const response = await axios.put('/users/update', userData);
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const authReducer = authSlice.reducer;
