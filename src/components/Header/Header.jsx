/**
 * רכיב Header - תפריט ניווט ראשי
 * מציג לוגו, תפריט ניווט ומידע על משתמש מחובר
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { authAPI } from '../../utils/api';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  /**
   * טיפול בהתנתקות
   */
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('שגיאה בהתנתקות:', error);
      dispatch(logout());
      navigate('/');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>נכסים בישראל</h1>
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            בית
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={styles.navLink}>
                לוח בקרה
              </Link>
              <div className={styles.userInfo}>
                <span className={styles.username}>
                  שלום, {user?.username || 'משתמש'}
                </span>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  התנתק
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>
                התחבר
              </Link>
              <Link to="/register" className={styles.navLink}>
                הרשם
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

