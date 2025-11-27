/**
 * דף בית - דף ראשי של האפליקציה
 * מציג מידע כללי ומחשבון הלוואה פומבי
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoanCalculator from '../../components/LoanCalculator/LoanCalculator';
import styles from './Home.module.css';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>נכסים בישראל</h1>
          <p className={styles.heroSubtitle}>
            ניהול נכסי נדל"ן פשוט ויעיל
          </p>
          <p className={styles.heroDescription}>
            אפליקציה מתקדמת לניהול נכסי נדל"ן בישראל. הוסף, ערוך ועקוב אחר הנכסים שלך
            במקום אחד, עם מחשבון הלוואה משולב.
          </p>
          
          {!isAuthenticated && (
            <div className={styles.ctaButtons}>
              <Link to="/register" className={styles.primaryButton}>
                התחל עכשיו
              </Link>
              <Link to="/login" className={styles.secondaryButton}>
                התחבר
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>תכונות עיקריות</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏠</div>
              <h3 className={styles.featureTitle}>ניהול נכסים</h3>
              <p className={styles.featureDescription}>
                הוסף, ערוך ועקוב אחר כל הנכסים שלך במקום אחד
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💰</div>
              <h3 className={styles.featureTitle}>מחשבון הלוואה</h3>
              <p className={styles.featureDescription}>
                חשב תשלומים חודשיים, ריבית וסך התשלומים
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3 className={styles.featureTitle}>מעקב סטטוס</h3>
              <p className={styles.featureDescription}>
                סמן נכסים כזמינים או נמכרים ועקוב אחר הסטטוס
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.calculatorSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>מחשבון הלוואה</h2>
          <p className={styles.sectionDescription}>
            חשב את התשלום החודשי שלך, סך התשלומים וסך הריבית
          </p>
          <LoanCalculator />
        </div>
      </section>
    </div>
  );
};

export default Home;

