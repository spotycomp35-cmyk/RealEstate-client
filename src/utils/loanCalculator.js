/**
 * מחשבון הלוואה
 * מחשב תשלום חודשי, סך תשלומים וסך ריבית
 */

/**
 * חישוב תשלום חודשי לפי נוסחת אנואיטה
 * @param {number} principal - סכום ההלוואה
 * @param {number} annualRate - ריבית שנתית (באחוזים)
 * @param {number} years - מספר שנים
 * @returns {number} תשלום חודשי
 */
export const calculateMonthlyPayment = (principal, annualRate, years) => {
  if (!principal || !annualRate || !years || years === 0) {
    return 0;
  }

  const monthlyRate = annualRate / 100 / 12; // המרה לריבית חודשית
  const numberOfPayments = years * 12; // מספר תשלומים

  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  // נוסחת אנואיטה
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return monthlyPayment;
};

/**
 * חישוב סך התשלומים
 * @param {number} monthlyPayment - תשלום חודשי
 * @param {number} years - מספר שנים
 * @returns {number} סך התשלומים
 */
export const calculateTotalPayment = (monthlyPayment, years) => {
  return monthlyPayment * years * 12;
};

/**
 * חישוב סך הריבית
 * @param {number} totalPayment - סך התשלומים
 * @param {number} principal - סכום ההלוואה
 * @returns {number} סך הריבית
 */
export const calculateTotalInterest = (totalPayment, principal) => {
  return totalPayment - principal;
};

/**
 * חישוב מלא של פרטי ההלוואה
 * @param {number} principal - סכום ההלוואה
 * @param {number} annualRate - ריבית שנתית
 * @param {number} years - מספר שנים
 * @returns {object} פרטי ההלוואה
 */
export const calculateLoan = (principal, annualRate, years) => {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const totalPayment = calculateTotalPayment(monthlyPayment, years);
  const totalInterest = calculateTotalInterest(totalPayment, principal);

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principal: principal
  };
};

