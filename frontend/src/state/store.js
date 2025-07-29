import { configureStore } from '@reduxjs/toolkit';
import sidebarReducre from '../features/Sidebar/sidebar';
import authReducer from '../features/auth/auth';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducre,
    auth: authReducer,
  },
});
