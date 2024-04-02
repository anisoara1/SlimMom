import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// To remove JWT
const clearAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      console.log(response);
      console.log('Response register data:', response.data);
      setAuthHeader(response.data.token);

      console.log('register token:', response.data.data.token);
      return response.data;
    } catch (error) {
      clearAuthHeader();

      if (error.response) {
        return thunkAPI.rejectWithValue(
          'Server error: ' + error.response.status
        );
      } else if (error.request) {
        return thunkAPI.rejectWithValue(
          'Network error: No response from server'
        );
      } else {
        return thunkAPI.rejectWithValue('Error: ' + error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (payload, thunkAPI) => {
    console.log('logoutUser action is dispatched');
    try {

      const logoutUserAsync = createAsyncThunk(
  'auth/logoutUserAsync',
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
      await thunkAPI.dispatch(logoutUserAsync());
    const state = thunkAPI.getState();
    console.log('Current state:', state);
      console.log('Current user state:', state.auth.user.data);
      const token = state.auth.user.data.token;
      console.log('logout token:', token);
      console.log(state);
      console.log('logout token:', token);
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post('/users/logout', null, config);
        clearAuthHeader();
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);



export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email,password, thunkAPI}, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/login', { email, password });
      console.log(response)
      console.log('Response login data:', response.data);
      setAuthHeader(response.data.token);
     
      console.log('login token:', response.data.data.token);
      const  token  = response.data.data.token;

      console.log('Token:', token);

      localStorage.setItem('token', token);
      console.log('Token stored in localStorage:', token);
      return response.data;
   } catch (error) {
      clearAuthHeader();

      if (error.response) {
        return thunkAPI.rejectWithValue(
          'Server error: ' + error.response.status
        );
      } else if (error.request) {
        return thunkAPI.rejectWithValue(
          'Network error: No response from server'
        );
      } else {
        return thunkAPI.rejectWithValue('Error: ' + error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const tokenWithBearer = thunkAPI.getState().auth.user.data.token;
      console.log('getCurent token before:', tokenWithBearer);
      if (!tokenWithBearer) {
        throw new Error('Token not found');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${tokenWithBearer}`,
        },
      };

      const response = await axios.get('/users/current', config);
      console.log('getCurrent data:', response);

      const token = response.config.headers.Authorization.replace('Bearer ', '');
      console.log('getCurrent token after:', token);
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user info'
      );
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
       console.log(
          'State before registerUser.pending:',
          JSON.stringify(state)
        ); 
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
         console.log(
          'State before registerUser.fulfilled:',
          JSON.stringify(state)
        ); 
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
         console.log(
          'State before registerUser.rejected:',
          JSON.stringify(state)
        );
        state.loading = false;
        state.error = action.error.message;
      })
            .addCase(loginUser.pending, state => {
        console.log('State before loginUser.pending:', JSON.stringify(state));
         state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
         console.log(
          'State before loginUser.fulfilled:',
          JSON.stringify(state)
        ); 
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('State before loginUser.rejected:', JSON.stringify(state)); 
            state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCurrentUser.pending, state => {
            console.log(
          'State before getCurrentUser.pending:',
          JSON.stringify(state)
        );
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
         console.log(
          'State before getCurrentUser.fulfilled:',
          JSON.stringify(state)
        ); 
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
          console.log(
          'State before getCurrentUser.rejected:',
          JSON.stringify(state)
        ); 
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, state => {
   console.log('State before logoutUser.pending:', JSON.stringify(state)); 
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
   console.log(
          'State before logoutUser.fulfilled:',
          JSON.stringify(state)
        ); 
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
       console.log('State before logoutUser.rejected:', JSON.stringify(state)); 
        state.loading = false;
        state.error = action.error.message;
      }); 
  },
});

export const authReducer = authSlice.reducer;
