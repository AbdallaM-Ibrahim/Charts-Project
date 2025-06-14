import axios, { AxiosError } from 'axios';
import { apiUrl } from '../config/env';
import AuthService from './auth.service';

export interface ChartData {
  type: string;
  title: string;
  data: {
    labels: string[];
    datasets: Array<{
      backgroundColor: string | string[];
      borderColor: string;
      hoverBackgroundColor: string | string[];
      label: string;
      data: number[];
    }>;
  };
}

export interface HistoryEntry {
  id: string;
  name: string;
  data?: {
    charts: Array<ChartData>;
  };
  createdAt: string;
}

const HistoryService = {
  /**
   * Get dashboard history (treated as main history)
   * @returns Promise with array of history entries
   */
  getHistory: async (): Promise<HistoryEntry[]> => {
    try {
      const response = await axios.get<{
        success: boolean;
        data: HistoryEntry[];
      }>(`${apiUrl}/dashboards`, {
        headers: {
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      });

      if (!response.data.success) {
        throw new Error('Failed to fetch history');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 500) {
        throw new Error('Failed to fetch history');
      }

      throw new Error('Failed to fetch history');
    }
  },

  /**
   * Get dashboard-specific details (chart history)
   * @param dashboardId - Dashboard ID to get details for
   * @returns Promise with dashboard details
   */
  getChartHistory: async (dashboardId: string): Promise<HistoryEntry> => {
    try {
      const response = await axios.get<{
        success: boolean;
        data: HistoryEntry;
      }>(`${apiUrl}/dashboards/${dashboardId}`, {
        headers: {
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      });

      if (!response.data.success) {
        throw new Error('Failed to fetch dashboard details');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          throw new Error(
            data.message || 'No history found for this dashboard.'
          );
        }

        if (status === 500) {
          throw new Error('Failed to fetch dashboard history');
        }
      }

      throw new Error('Failed to fetch dashboard history');
    }
  },

  /**
   * Get recent activity (last N entries)
   * @param limit - Number of recent entries to retrieve
   * @returns Promise with recent history entries
   */
  getRecentActivity: async (limit = 10): Promise<HistoryEntry[]> => {
    try {
      const history = await HistoryService.getHistory();

      // Sort by timestamp (newest first) and limit results
      return history
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, limit);
    } catch (error) {
      throw new Error('Failed to fetch recent activity');
    }
  },
};

export default HistoryService;
