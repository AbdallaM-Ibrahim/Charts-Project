import axios, { AxiosError } from 'axios';
import { apiUrl } from '../config/env';
import type { ChartId } from './chart.service';

export type ActivityType = 'upload_file' | 'add_chart_data';
export type TargetType = 'file' | 'chart' | 'template';

export interface HistoryEntry {
  activityType: ActivityType;
  description: string;
  targetType: TargetType;
  targetId: string;
  timestamp: string;
  userId?: string;
}

export interface HistoryFilters {
  targetType?: TargetType;
  targetId?: string;
}

const HistoryService = {
  /**
   * Get activity history with optional filtering
   * @param filters - Optional filters for target type and ID
   * @returns Promise with array of history entries
   */
  getHistory: async (filters?: HistoryFilters): Promise<HistoryEntry[]> => {
    try {
      const params = new URLSearchParams();

      if (filters?.targetType) {
        params.append('targetType', filters.targetType);
      }

      if (filters?.targetId) {
        params.append('targetId', filters.targetId);
      }

      const url = `${apiUrl}/history${
        params.toString() ? `?${params.toString()}` : ''
      }`;
      const response = await axios.get<HistoryEntry[]>(url);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 500) {
        throw new Error('Failed to fetch history');
      }

      throw new Error('Failed to fetch history');
    }
  },

  /**
   * Get file upload history
   * @returns Promise with array of file upload history entries
   */
  getFileHistory: async (): Promise<HistoryEntry[]> => {
    try {
      const response = await axios.get<HistoryEntry[]>(
        `${apiUrl}/history/files`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          throw new Error(data.message || 'No file history found.');
        }
        if (status === 500) {
          throw new Error('Failed to fetch file histories');
        }
      }

      throw new Error('Failed to fetch file history');
    }
  },

  /**
   * Get chart-specific history
   * @param chartId - Chart ID to get history for
   * @returns Promise with array of chart history entries
   */
  getChartHistory: async (chartId: ChartId): Promise<HistoryEntry[]> => {
    try {
      const response = await axios.get<HistoryEntry[]>(
        `${apiUrl}/history/chart/${chartId}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          throw new Error(data.message || 'No history found for this chart.');
        }

        if (status === 500) {
          throw new Error('Failed to fetch chart history');
        }
      }

      throw new Error('Failed to fetch chart history');
    }
  },

  /**
   * Get history filtered by activity type
   * @param activityType - Type of activity to filter by
   * @returns Promise with filtered history entries
   */
  getHistoryByActivity: async (
    activityType: ActivityType
  ): Promise<HistoryEntry[]> => {
    try {
      // Using the general history endpoint with activity type filtering
      // Note: The API doesn't explicitly support activityType filtering in the spec,
      // but this could be implemented by filtering the results client-side
      const allHistory = await HistoryService.getHistory();
      return allHistory.filter((entry) => entry.activityType === activityType);
    } catch (error) {
      throw new Error('Failed to fetch activity history');
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
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .slice(0, limit);
    } catch (error) {
      throw new Error('Failed to fetch recent activity');
    }
  },
};

export default HistoryService;
