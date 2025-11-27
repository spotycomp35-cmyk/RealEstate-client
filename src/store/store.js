/**
 * Redux Store
 * מגדיר את ה-store המרכזי של האפליקציה
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import propertyReducer from './slices/propertySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer
  }
});

