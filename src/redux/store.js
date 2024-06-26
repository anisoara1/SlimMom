import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/authSlice';
import { myProductsReducer } from './myProducts/myProductsSlice';
import { productsReducer } from './products/productsSlice';

const saveState = () => {
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem('authState', serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    myproducts: myProductsReducer,
    products: productsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: loadState(),
});

store.subscribe(saveState);
