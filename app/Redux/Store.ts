
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import ModelSlice from './ModalSlice'

const Store = configureStore({
    reducer: {
        user: AuthSlice,
        modal: ModelSlice
    },
});


export default Store;
