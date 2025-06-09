import axios from 'axios';
import { apiUrl } from '../config/env';

export interface HealthStatus {
  status: string;
  db: 'connected' | 'disconnected';
  timestamp: string;
}

const HealthService = {
  /**
   * Check if the API is running
   */
  checkRoot: async (): Promise<string> => {
    try {
      const response = await axios.get(`${apiUrl}/`);
      return response.data;
    } catch (error) {
      throw new Error('API is not responding');
    }
  },

  /**
   * Check the health status of the API and database connection
   */
  checkHealth: async (): Promise<HealthStatus> => {
    try {
      const response = await axios.get<HealthStatus>(`${apiUrl}/health`);
      return response.data;
    } catch (error) {
      throw new Error('Health check failed');
    }
  },
};

export default HealthService;
