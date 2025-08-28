import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//const API_BASE_URL = 'http://localhost:8000';
console.log('API_BASE_URL', API_BASE_URL);
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string
  user: { username: string };
}

class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  getToken = (): string | null => {
    return localStorage.getItem(this.TOKEN_KEY);
  };

  setToken = (token: string): void => {
    localStorage.setItem(this.TOKEN_KEY, token);
  };

  removeToken = (): void => {
    localStorage.removeItem(this.TOKEN_KEY);
  };

  getAuthHeaders = () => {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/auth/login`, credentials);
    this.setToken(response.data.token);
    return response.data;
  };

  logout = (): void => {
    this.removeToken();
  };

  isAuthenticated = (): boolean => {
    return !!this.getToken();
  };
}

export default new AuthService(); 