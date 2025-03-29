export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePassword = (password) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };
  
  export const validateForm = (values) => {
    const errors = {};
  
    if (values.email && !validateEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (values.password && !validatePassword(values.password)) {
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
  
    return errors;
  };
  
  export default {
    validateEmail,
    validatePassword,
    validateForm
  };