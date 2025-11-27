/**
 * דף הרשמה
 * טופס הרשמה עם שם משתמש, אימייל וסיסמה
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { authAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
   * טיפול בשליחת טופס הרשמה
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // בדיקת התאמת סיסמאות
    if (formData.password !== formData.confirmPassword) {
      toast.error('הסיסמאות אינן תואמות');
      return;
    }

    // בדיקת אורך סיסמה
    if (formData.password.length < 6) {
      toast.error('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      
      // שמירת פרטי משתמש ב-Redux
      dispatch(setCredentials({
        user: response.user,
        token: response.token
      }));

      toast.success('ההרשמה בוצעה בהצלחה');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'שגיאה בהרשמה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>הרשמה</h1>
          <p className={styles.subtitle}>צור חשבון חדש</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                שם משתמש
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="הכנס שם משתמש"
                required
                className={styles.input}
              />
            </div>

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
                placeholder="הכנס סיסמה (לפחות 6 תווים)"
                required
                minLength="6"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                אימות סיסמה
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="הכנס סיסמה שוב"
                required
                className={styles.input}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'נרשם...' : 'הירשם'}
            </button>
          </form>

          <p className={styles.loginLink}>
            כבר יש לך חשבון?{' '}
            <Link to="/login">התחבר כאן</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

