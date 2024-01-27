import { configureStore } from '@reduxjs/toolkit';
import { ErrorLogger } from '../middleware/errorreducer';
import rootreducer from './rootReducer';

const store = configureStore({
    reducer: rootreducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(ErrorLogger),
})

export default store;