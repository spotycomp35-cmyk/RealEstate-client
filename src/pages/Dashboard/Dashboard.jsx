/**
 * דף Dashboard - לוח בקרה
 * מציג את כל הנכסים של המשתמש עם אפשרויות ניהול
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProperties, setLoading } from '../../store/slices/propertySlice';
import { propertyAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import PropertyForm from '../../components/PropertyForm/PropertyForm';
import LoanCalculator from '../../components/LoanCalculator/LoanCalculator';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { properties, loading } = useSelector((state) => state.properties);
  const [showAddForm, setShowAddForm] = useState(false);

  /**
   * טעינת נכסים מהשרת
   */
  useEffect(() => {
    // בדיקה אם המשתמש מחובר
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadProperties();
  }, [isAuthenticated, navigate]);

  /**
   * פונקציה לטעינת נכסים
   */
  const loadProperties = async () => {
    try {
      dispatch(setLoading(true));
      const data = await propertyAPI.getProperties();
      dispatch(setProperties(data));
    } catch (error) {
      toast.error(error.response?.data?.error || 'שגיאה בטעינת נכסים');
      dispatch(setLoading(false));
    }
  };

  /**
   * טיפול בהוספת נכס חדש
   */
  const handleAddProperty = () => {
    setShowAddForm(true);
  };

  /**
   * טיפול בסגירת טופס
   */
  const handleCloseForm = () => {
    setShowAddForm(false);
    loadProperties(); // רענון רשימת הנכסים
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>לוח בקרה</h1>
          <button
            onClick={handleAddProperty}
            className={styles.addButton}
          >
            + הוסף נכס חדש
          </button>
        </div>

        {showAddForm && (
          <div className={styles.formWrapper}>
            <PropertyForm onClose={handleCloseForm} />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.propertiesSection}>
            <h2 className={styles.sectionTitle}>הנכסים שלי</h2>
            
            {loading ? (
              <p className={styles.loading}>טוען נכסים...</p>
            ) : properties.length === 0 ? (
              <div className={styles.emptyState}>
                <p>אין נכסים עדיין. הוסף נכס חדש כדי להתחיל!</p>
              </div>
            ) : (
              <div className={styles.propertiesGrid}>
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.calculatorSection}>
            <h2 className={styles.sectionTitle}>מחשבון הלוואה</h2>
            <LoanCalculator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

