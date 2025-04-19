import axios from "axios";
const baseUrl = "http://localhost:3000/api";

export type UserCredentials = {
  id?: number;
  username: string;
  password: string;
};

export type User = UserCredentials & {
  id: number;
  password?: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const AuthService = {
  getProfile: async (token: string): Promise<Partial<User>> => {
    const response = await axios.get(`${baseUrl}/users/self`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  signin: async (userCredentials: UserCredentials): Promise<string> => {
    const response = await axios.post(`${baseUrl}/auth/signin`, userCredentials);
    return response.data.data.access_token;
  },

  register: async (newUser: Partial<User>): Promise<string> => {
    const response = await axios.post(`${baseUrl}/auth/signup`, newUser);
    return response.data.data.access_token;
  },
};

export default AuthService;