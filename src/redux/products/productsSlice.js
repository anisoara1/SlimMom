import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/products');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        console.log(
          'State before fetchAllProducts.pending:',
          JSON.stringify(state)
        );
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(
          'State before fetchAllProducts.fulfilled:',
          JSON.stringify(state)
        );
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        console.log(
          'State before fetchAllProducts.rejected:',
          JSON.stringify(state)
        );
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch products';
      });
  },
});

export const productsReducer = productsSlice.reducer;
