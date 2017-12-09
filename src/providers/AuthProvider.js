class AuthProvider {
  static authenticateUser(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('userId', authData.id);
    localStorage.setItem('username', authData.username);
    localStorage.setItem('avatar', authData.avatar);
  }
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
  }
  static getToken() {
    return localStorage.getItem('token');
  }
  static getUser() {
    return {
      id: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      avatar: localStorage.getItem('avatar')
    };
  }
}

export default AuthProvider;
