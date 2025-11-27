/**
 * Redux Slice לניהול מצב אימות משתמשים
 * מטפל בהתחברות, הרשמה והתנתקות
 */

import { createSlice } from '@reduxjs/toolkit';

// מצב התחלתי
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // שמירת פרטי משתמש לאחר התחברות/הרשמה
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    
    // התנתקות משתמש
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

