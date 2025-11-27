/**
 * Redux Slice לניהול מצב נכסים
 * מטפל בפעולות CRUD על נכסים
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  loading: false,
  error: null
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // התחלת טעינה
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // קבלת נכסים
    setProperties: (state, action) => {
      state.properties = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // הוספת נכס חדש
    addProperty: (state, action) => {
      state.properties.push(action.payload);
    },
    
    // עדכון נכס
    updateProperty: (state, action) => {
      const index = state.properties.findIndex(
        p => p.id === action.payload.id
      );
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
    
    // מחיקת נכס
    deleteProperty: (state, action) => {
      state.properties = state.properties.filter(
        p => p.id !== action.payload
      );
    },
    
    // הגדרת שגיאה
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  setLoading,
  setProperties,
  addProperty,
  updateProperty,
  deleteProperty,
  setError
} = propertySlice.actions;

export default propertySlice.reducer;

