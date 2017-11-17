class AuthProvider {
  static authenticateUser(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('userId', authData.userId);
    localStorage.setItem('username', authData.username);
    localStorage.setItem('avatar', authData.avatar);
  }
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }
  static getToken() {
    return localStorage.getItem('token');
  }
}

export default AuthProvider;
