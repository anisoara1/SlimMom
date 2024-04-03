import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api/';

export const fetchNotAllowedProducts = createAsyncThunk(
  'products/fetchNotAllowedProducts',
  async (userData, thunkAPI) => {
    console.log(userData);
    const bloodType = userData.bloodType;
    console.log(bloodType);

    const tokenWithBearer = thunkAPI.getState().auth.user?.data?.token;
    console.log('Token:', tokenWithBearer);

    if (!tokenWithBearer) {
      throw new Error('Token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${tokenWithBearer}`,
      },
    };
    try {
      const response = await axios.get('/products/dailyRate', {
        ...config,
        bloodType,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to fetch not allowed products'
      );
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    notAllowedProductsAll: [],
    notAllowedProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotAllowedProducts.pending, state => {
        console.log(
          'State before fetchNotAllowedProducts.pending:',
          JSON.stringify(state)
        );
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotAllowedProducts.fulfilled, (state, action) => {
        console.log(
          'State before fetchNotAllowedProducts.fulfilled:',
          JSON.stringify(state)
        );
        state.loading = false;
        state.notAllowedProductsAll = action.payload.notAllowedProductsAll;
        state.notAllowedProducts = action.payload.notAllowedProducts;
        state.error = null;
      })
      .addCase(fetchNotAllowedProducts.rejected, (state, action) => {
        console.log(
          'State before fetchNotAllowedProducts.rejected:',
          JSON.stringify(state)
        );
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productsReducer = productsSlice.reducer;
