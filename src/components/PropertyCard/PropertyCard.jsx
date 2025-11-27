/**
 * רכיב PropertyCard - כרטיס נכס
 * מציג פרטי נכס עם אפשרויות עריכה, מחיקה ושינוי סטטוס
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProperty, updateProperty } from '../../store/slices/propertySlice';
import { propertyAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import styles from './PropertyCard.module.css';

const PropertyCard = ({ property }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: property.title,
    price: property.price,
    location: property.location,
    description: property.description,
    status: property.status
  });

  /**
   * טיפול בעריכת נכס
   */
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await propertyAPI.updateProperty(property.id, editForm);
      dispatch(updateProperty(response.property));
      setIsEditing(false);
      toast.success('נכס עודכן בהצלחה');
    } catch (error) {
      toast.error(error.response?.data?.error || 'שגיאה בעדכון נכס');
    }
  };

  /**
   * טיפול במחיקת נכס
   */
  const handleDelete = async () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הנכס?')) {
      try {
        await propertyAPI.deleteProperty(property.id);
        dispatch(deleteProperty(property.id));
        toast.success('נכס נמחק בהצלחה');
      } catch (error) {
        toast.error(error.response?.data?.error || 'שגיאה במחיקת נכס');
      }
    }
  };

  /**
   * טיפול בשינוי סטטוס
   */
  const handleStatusChange = async () => {
    const newStatus = property.status === 'available' ? 'sold' : 'available';
    try {
      const response = await propertyAPI.updateProperty(property.id, {
        ...property,
        status: newStatus
      });
      dispatch(updateProperty(response.property));
      toast.success(`סטטוס עודכן ל-${newStatus === 'available' ? 'זמין' : 'נמכר'}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'שגיאה בעדכון סטטוס');
    }
  };

  if (isEditing) {
    return (
      <div className={styles.card}>
        <form onSubmit={handleEdit} className={styles.editForm}>
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            placeholder="כותרת"
            required
            className={styles.input}
          />
          <input
            type="number"
            value={editForm.price}
            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
            placeholder="מחיר"
            required
            className={styles.input}
          />
          <input
            type="text"
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
            placeholder="מיקום"
            required
            className={styles.input}
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            placeholder="תיאור"
            className={styles.textarea}
          />
          <select
            value={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            className={styles.select}
          >
            <option value="available">זמין</option>
            <option value="sold">נמכר</option>
          </select>
          <div className={styles.actions}>
            <button type="submit" className={styles.saveBtn}>
              שמור
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={styles.cancelBtn}
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`${styles.card} ${property.status === 'sold' ? styles.sold : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{property.title}</h3>
        <span className={`${styles.status} ${styles[property.status]}`}>
          {property.status === 'available' ? 'זמין' : 'נמכר'}
        </span>
      </div>
      
      <div className={styles.content}>
        <p className={styles.price}>
          ₪{property.price.toLocaleString()}
        </p>
        <p className={styles.location}>📍 {property.location}</p>
        {property.description && (
          <p className={styles.description}>{property.description}</p>
        )}
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => setIsEditing(true)}
          className={styles.editBtn}
        >
          ערוך
        </button>
        <button
          onClick={handleStatusChange}
          className={styles.statusBtn}
        >
          {property.status === 'available' ? 'סמן כנמכר' : 'סמן כזמין'}
        </button>
        <button
          onClick={handleDelete}
          className={styles.deleteBtn}
        >
          מחק
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;

