import axios, { AxiosError } from 'axios';
import { apiUrl } from '../config/env';

export type UserCredentials = {
  id?: number;
  email: string;
  password: string;
};

export type User = Omit<UserCredentials, 'password'> & {
  id: number;
  name?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserData = User & {
  token?: string; // Optional token for session management
};

export type UserRegister = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

// Store user data in memory for the session (since API doesn't provide user profile endpoint)
let currentUserData: User | null = null;

const AuthService = {
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  getProfile: async (_token: string): Promise<User> => {
    // Since the API doesn't provide user profile endpoint and uses session-based auth,
    // we return stored user data or placeholder data to maintain the current flow
    // token parameter is kept for compatibility but not used due to session-based auth
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    void _token; // Explicit acknowledgment of unused parameter
    if (currentUserData) {
      return currentUserData;
    }

    return {
      id: 1,
      email: 'user@example.com',
      name: 'User',
      phone: '+201234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },

  signin: async (userCredentials: UserCredentials) => {
    try {
      // Only send email and password as per API specification
      const loginData = {
        email: userCredentials.email,
        password: userCredentials.password,
      };

      const response = await axios.post(`${apiUrl}/login`, loginData);

      // API returns { message: 'Login successful' } on success
      if (response.status < 300) {
        const token = response.data.token || 'session-authenticated'; // Placeholder token

        // Store user data for the session since API doesn't return user info
        currentUserData = {
          id: response.data.id || 1, // Placeholder ID
          email: loginData.email || userCredentials.email,
          name: response.data.name || 'User', // Placeholder name
          phone: response.data.phone || '+201234567890', // Placeholder phone
        };

        // Return placeholder token to maintain current flow
        return {
          token: token,
          user: currentUserData,
        };
      }

      throw new Error('Login failed');
    } catch (error) {
      // Handle API errors according to OpenAPI specification
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          // API returns different messages for different 400 errors
          const message = data.message || 'Login failed';
          if (message === 'Email and password are required') {
            throw new Error('Email and password are required');
          }
          if (message === 'User not found') {
            throw new Error('User not found');
          }
          if (message === 'Invalid Email or Password') {
            throw new Error('Invalid email or password');
          }
          throw new Error(message);
        }

        if (status === 500) {
          throw new Error('Server error occurred. Please try again later.');
        }
      }

      throw new Error(
        'Login failed. Please check your connection and try again.'
      );
    }
  },

  register: async (newUser: UserRegister): Promise<string> => {
    try {
      console.log('Registering user:', newUser);
      // Transform the user data to match API expectations per OpenAPI spec
      const registrationData: UserRegister = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        password: newUser.password,
      };

      // Validate required fields before sending
      if (
        !registrationData.name ||
        !registrationData.email ||
        !registrationData.phone ||
        !registrationData.password
      ) {
        throw new Error('All fields are required');
      }

      const response = await axios.post(`${apiUrl}/register/request`, registrationData);

      // API returns { message: 'User registered successfully' } on success
      if (response.status < 300) {
        // Store user data for the session since API doesn't return user info
        currentUserData = {
          id: 1, // Placeholder ID
          email: registrationData.email,
          name: registrationData.name,
          phone: registrationData.phone,
        };

        // Return placeholder token to maintain current flow
        return 'session-authenticated';
      }

      throw new Error('Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      // Handle API errors according to OpenAPI specification
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          // API returns different messages for different 400 errors
          const message = data.message || 'Registration failed';
          if (message === 'All fields are required') {
            throw new Error('All fields are required');
          }
          if (message === 'User already exists') {
            throw new Error('An account with this email already exists');
          }
          throw new Error(message);
        }

        if (status === 500) {
          throw new Error('Server error occurred. Please try again later.');
        }
      }

      // Re-throw validation errors
      if (
        error instanceof Error &&
        error.message === 'All fields are required'
      ) {
        throw error;
      }

      throw new Error(
        'Registration failed. Please check your connection and try again.'
      );
    }
  },

  // Clear stored user data on logout
  clearUserData: () => {
    currentUserData = null;
  },
};

export default AuthService;
