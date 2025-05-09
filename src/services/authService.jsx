const TOKEN_KEY = 'employwise_token';

export const authService = {
  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

export default authService;