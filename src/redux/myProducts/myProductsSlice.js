import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api/';

export const CLEAR_MY_PRODUCTS = 'myproducts/clear';

export const clearMyProducts = () => ({
  type: CLEAR_MY_PRODUCTS,
});

export const saveProductData = createAsyncThunk(
  'myproducts/saveProductData',
  async ({ product, quantity }, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user.data;
      const owner = user._id;
      console.log('owner:', owner);
      const myproductsData = {
        owner: owner,
        product: product,
        quantity: quantity,
      };

      console.log('myproductsData :', myproductsData);
      const tokenWithBearer = user.token;

      console.log('saveProductData token before:', tokenWithBearer);
      if (!tokenWithBearer) {
        throw new Error('Token not found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${tokenWithBearer}`,
        },
      };
      localStorage.setItem('token', tokenWithBearer);

      const response = await axios.post(
        '/myproducts/saveProductData',
        myproductsData,
        config
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'myproducts/removeProduct',
  async (productId, thunkAPI) => {
    console.log('productId:', productId);
    try {
      const user = thunkAPI.getState().auth.user.data;
      const tokenWithBearer = user.token;
      console.log('removeProduct token before:', tokenWithBearer);

      if (!tokenWithBearer) {
        throw new Error('Token not found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${tokenWithBearer}`,
        },
      };

      const response = await axios.delete(`/myproducts/${productId}`, config);
      console.log('response:', response);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const myProductsSlice = createSlice({
  name: 'myproducts',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(saveProductData.pending, state => {
        console.log(
          'State before saveProductData.pending:',
          JSON.stringify(state)
        );
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProductData.fulfilled, (state, action) => {
        console.log(
          'State before saveProductData.fulfilled:',
          JSON.stringify(state)
        );
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(saveProductData.rejected, (state, action) => {
        console.log(
          'State before saveProductData.rejected:',
          JSON.stringify(state)
        );
        state.loading = false;
        state.error = action.payload?.message || 'Failed to save products';
      })
      .addCase(removeProduct.pending, state => {
        console.log(
          'State before removeProduct.pending:',
          JSON.stringify(state)
        );
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        console.log(
          'State before removeProduct.fulfilled:',
          JSON.stringify(state)
        );
        state.loading = false;
        state.error = null;
        const productIdToRemove = action.payload;
        state.products.products = state.products.products.filter(
          product => product._id !== productIdToRemove
        );
      })

      .addCase(CLEAR_MY_PRODUCTS, state => {
        state.loading = false;
        state.error = null;
        state.products = [];
        state.user = null;
      });
  },
});

export const myProductsReducer = myProductsSlice.reducer;
