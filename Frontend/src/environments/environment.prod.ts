export const environment = {
  production: true,
  backendIP: 'api.miapp.com', // Cambiar por la URL real del backend
  apiUrl: '',
  authUrl: ''
};

environment.apiUrl = `https://${environment.backendIP}/api`;
environment.authUrl = `https://${environment.backendIP}/auth`;