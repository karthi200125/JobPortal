
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';

const Store = configureStore({
    reducer: {
        user: AuthSlice,
    },
});


export default Store;
