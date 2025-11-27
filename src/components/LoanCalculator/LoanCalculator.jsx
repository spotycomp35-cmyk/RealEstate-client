/**
 * רכיב LoanCalculator - מחשבון הלוואה
 * מחשב תשלום חודשי, סך תשלומים וסך ריבית
 */

import React, { useState } from 'react';
import { calculateLoan } from '../../utils/loanCalculator';
import styles from './LoanCalculator.module.css';

const LoanCalculator = () => {
  const [formData, setFormData] = useState({
    principal: '',
    annualRate: '',
    years: ''
  });

  const [results, setResults] = useState(null);

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
   * חישוב הלוואה
   */
  const handleCalculate = (e) => {
    e.preventDefault();
    
    const principal = parseFloat(formData.principal);
    const annualRate = parseFloat(formData.annualRate);
    const years = parseFloat(formData.years);

    if (principal > 0 && annualRate >= 0 && years > 0) {
      const loanResults = calculateLoan(principal, annualRate, years);
      setResults(loanResults);
    } else {
      alert('נא למלא את כל השדות עם ערכים תקינים');
    }
  };

  /**
   * איפוס הטופס
   */
  const handleReset = () => {
    setFormData({
      principal: '',
      annualRate: '',
      years: ''
    });
    setResults(null);
  };

  return (
    <div className={styles.calculator}>
      <h2 className={styles.title}>מחשבון הלוואה</h2>
      
      <form onSubmit={handleCalculate} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="principal" className={styles.label}>
            סכום ההלוואה (₪)
          </label>
          <input
            type="number"
            id="principal"
            name="principal"
            value={formData.principal}
            onChange={handleChange}
            placeholder="לדוגמה: 1000000"
            min="0"
            step="1000"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="annualRate" className={styles.label}>
            ריבית שנתית (%)
          </label>
          <input
            type="number"
            id="annualRate"
            name="annualRate"
            value={formData.annualRate}
            onChange={handleChange}
            placeholder="לדוגמה: 4.5"
            min="0"
            step="0.1"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="years" className={styles.label}>
            מספר שנים
          </label>
          <input
            type="number"
            id="years"
            name="years"
            value={formData.years}
            onChange={handleChange}
            placeholder="לדוגמה: 20"
            min="1"
            step="1"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.calculateBtn}>
            חשב
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetBtn}
          >
            איפוס
          </button>
        </div>
      </form>

      {results && (
        <div className={styles.results}>
          <h3 className={styles.resultsTitle}>תוצאות החישוב:</h3>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>תשלום חודשי:</span>
            <span className={styles.resultValue}>
              ₪{results.monthlyPayment.toLocaleString()}
            </span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>סך התשלומים:</span>
            <span className={styles.resultValue}>
              ₪{results.totalPayment.toLocaleString()}
            </span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>סך הריבית:</span>
            <span className={styles.resultValue}>
              ₪{results.totalInterest.toLocaleString()}
            </span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>סכום ההלוואה:</span>
            <span className={styles.resultValue}>
              ₪{results.principal.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;

