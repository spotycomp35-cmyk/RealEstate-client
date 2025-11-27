/**
 * דף התחברות
 * טופס התחברות עם אימייל וסיסמה
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { authAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  /**
   * טיפול בשינוי ערכי הטופס
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * טיפול בשליחת טופס התחברות
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      
      // שמירת פרטי משתמש ב-Redux
      dispatch(setCredentials({
        user: response.user,
        token: response.token
      }));

      toast.success('התחברות בוצעה בהצלחה');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'שגיאה בהתחברות');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>התחברות</h1>
          <p className={styles.subtitle}>התחבר לחשבון שלך</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                אימייל
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="הכנס אימייל"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                סיסמה
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="הכנס סיסמה"
                required
                className={styles.input}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'מתחבר...' : 'התחבר'}
            </button>
          </form>

          <p className={styles.registerLink}>
            עדיין אין לך חשבון?{' '}
            <Link to="/register">הירשם כאן</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

