/**
 * שירות API לתקשורת עם השרת
 * מטפל בכל קריאות ה-HTTP
 */

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// יצירת instance של axios עם הגדרות ברירת מחדל
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor להוספת token לכל בקשה
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor לטיפול בשגיאות
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // אם ה-token לא תקין, מנתקים את המשתמש
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * API לאימות משתמשים
 */
export const authAPI = {
  // הרשמה
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  // התחברות
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  // התנתקות
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

/**
 * API לניהול נכסים
 */
export const propertyAPI = {
  // קבלת כל הנכסים
  getProperties: async () => {
    const response = await api.get('/properties');
    return response.data;
  },
  
  // הוספת נכס חדש
  addProperty: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },
  
  // עדכון נכס
  updateProperty: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },
  
  // מחיקת נכס
  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  }
};

export default api;

