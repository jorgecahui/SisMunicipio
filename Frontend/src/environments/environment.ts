export const environment = {
  production: false,

  backendIP: '192.168.1.100:9090',
  apiUrl: '',
  authUrl: ''
};

environment.apiUrl = `http://${environment.backendIP}/api`;
environment.authUrl = `http://${environment.backendIP}/auth`;