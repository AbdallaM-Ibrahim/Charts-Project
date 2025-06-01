import axios from 'axios';
import { apiUrl } from '../config/env';

export type UserCredentials = {
  id?: number;
  email: string;
  password: string;
};

export type User = UserCredentials & {
  id: number;
  password?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const AuthService = {
  getProfile: async (token: string): Promise<Partial<User>> => {
    const response = await axios.get(`${apiUrl}/users/self`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  signin: async (userCredentials: UserCredentials): Promise<string> => {
    const response = await axios.post(`${apiUrl}/auth/signin`, userCredentials);
    return response.data.data.access_token;
  },

  register: async (newUser: Partial<User>): Promise<string> => {
    const response = await axios.post(`${apiUrl}/auth/signup`, newUser);
    return response.data.data.access_token;
  },
};

export default AuthService;
