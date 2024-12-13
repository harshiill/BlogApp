 
 
import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';

const store = configureStore({
    reducer: {
      auth
      //TODO:post:postsLICE
    },
  });
  

export default store;