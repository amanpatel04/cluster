import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.js';
import progressReducer from '../features/progress/progress.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        progress: progressReducer,
    },
});
