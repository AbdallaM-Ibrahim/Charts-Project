import axios, { AxiosError } from 'axios';
import { apiUrl } from '../config/env';

export type ChartType = 'bar' | 'pie' | 'line' | 'scatter';

export type ChartId =
  | 'chart_histogram'
  | 'chart_bar'
  | 'chart_pie'
  | 'chart_line'
  | 'chart_table'
  | 'chart_scatter'
  | 'chart_heatmap';

export interface Chart {
  id: ChartId;
  name: string;
  type: ChartType;
  data: {
    labels: string[];
    datasets: ChartDataset[];
  };
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
}

export interface ChartData {
  chartId: ChartId;
  labels: string[];
  datasets: ChartDataset[];
  createdAt: string;
}

export interface ChartWithData {
  chart: Chart;
  data: ChartData[];
}

export interface AddChartDataRequest {
  labels: string[];
  datasets: ChartDataset[];
}

export interface AddChartDataResponse {
  message: string;
  id: string;
}

const ChartService = {
  /**
   * Get chart by ID with all associated data
   * @param id - Chart ID
   * @returns Promise with chart and its data
   */
  getChart: async (id: ChartId): Promise<ChartWithData> => {
    try {
      const response = await axios.get<ChartWithData>(`${apiUrl}/charts/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          throw new Error(data.error || 'Chart not found');
        }
        if (status === 500) {
          throw new Error('Failed to fetch chart data');
        }
      }

      throw new Error('Failed to fetch chart');
    }
  },

  /**
   * Add data to an existing chart
   * @param id - Chart ID
   * @param data - Chart data to add
   * @returns Promise with success response
   */
  addChartData: async (
    id: ChartId,
    data: AddChartDataRequest
  ): Promise<AddChartDataResponse> => {
    try {
      // Validate required fields
      if (
        !data.labels ||
        !Array.isArray(data.labels) ||
        data.labels.length === 0
      ) {
        throw new Error('Labels array is required and cannot be empty');
      }

      if (
        !data.datasets ||
        !Array.isArray(data.datasets) ||
        data.datasets.length === 0
      ) {
        throw new Error('Datasets array is required and cannot be empty');
      }

      const response = await axios.post<AddChartDataResponse>(
        `${apiUrl}/charts/${id}/data`,
        data
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 500) {
        throw new Error('Failed to add chart data');
      }

      // Re-throw validation errors
      if (error instanceof Error && error.message.includes('required')) {
        throw error;
      }

      throw new Error('Failed to add chart data');
    }
  },

  /**
   * Get all available chart types and their configurations
   * This is a helper method to get predefined chart types
   */
  getAvailableChartTypes: (): {
    id: ChartId;
    name: string;
    type: ChartType;
  }[] => {
    return [
      { id: 'chart_histogram', name: 'Histogram', type: 'bar' },
      { id: 'chart_bar', name: 'Bar Chart', type: 'bar' },
      { id: 'chart_pie', name: 'Pie Chart', type: 'pie' },
      { id: 'chart_line', name: 'Line Chart', type: 'line' },
      { id: 'chart_table', name: 'Table', type: 'bar' }, // Table might be rendered as bar for visualization
      { id: 'chart_scatter', name: 'Scatter Plot', type: 'scatter' },
      { id: 'chart_heatmap', name: 'Heatmap', type: 'bar' }, // Heatmap might be rendered as specialized bar chart
    ];
  },
};

export default ChartService;
