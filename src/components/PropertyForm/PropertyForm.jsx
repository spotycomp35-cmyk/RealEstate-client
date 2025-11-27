/**
 * רכיב PropertyForm - טופס הוספה/עריכה של נכס
 * מטפל בהוספת נכס חדש או עריכת נכס קיים
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProperty, updateProperty } from '../../store/slices/propertySlice';
import { propertyAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import styles from './PropertyForm.module.css';

const PropertyForm = ({ onClose, editingProperty = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: editingProperty?.title || '',
    price: editingProperty?.price || '',
    location: editingProperty?.location || '',
    description: editingProperty?.description || '',
    status: editingProperty?.status || 'available'
  });

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
   * טיפול בשליחת הטופס
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingProperty) {
        // עריכת נכס קיים
        const response = await propertyAPI.updateProperty(editingProperty.id, formData);
        dispatch(updateProperty(response.property));
        toast.success('נכס עודכן בהצלחה');
      } else {
        // הוספת נכס חדש
        const response = await propertyAPI.addProperty(formData);
        dispatch(addProperty(response.property));
        toast.success('נכס נוסף בהצלחה');
      }
      
      // איפוס הטופס וסגירה
      setFormData({
        title: '',
        price: '',
        location: '',
        description: '',
        status: 'available'
      });
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'שגיאה בשמירת נכס');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {editingProperty ? 'עריכת נכס' : 'הוספת נכס חדש'}
      </h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            כותרת *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="לדוגמה: דירה בתל אביב"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>
            מחיר (₪) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="לדוגמה: 2500000"
            min="0"
            step="1000"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.label}>
            מיקום *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="לדוגמה: תל אביב"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            תיאור
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="תיאור מפורט של הנכס..."
            rows="4"
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>
            סטטוס
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="available">זמין</option>
            <option value="sold">נמכר</option>
          </select>
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitBtn}>
            {editingProperty ? 'עדכן' : 'הוסף'}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              ביטול
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;

