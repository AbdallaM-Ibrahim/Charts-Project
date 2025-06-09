import axios, { AxiosError } from 'axios';
import { apiUrl } from '../config/env';
import type { ChartId, Chart } from './chart.service';

export type TemplateId = 'template_1' | 'template_2' | 'template_3';

export interface Template {
  id: TemplateId;
  name: string;
  chartIds: ChartId[];
}

export interface TemplateWithCharts extends Template {
  charts?: Chart[]; // Chart definitions would be populated when fetching template details
}

const TemplateService = {
  /**
   * Get all available templates
   * @returns Promise with array of templates
   */
  getAllTemplates: async (): Promise<Template[]> => {
    try {
      const response = await axios.get<Template[]>(`${apiUrl}/templates`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 500) {
        throw new Error('Failed to fetch templates');
      }

      throw new Error('Failed to fetch templates');
    }
  },

  /**
   * Get template by ID with associated chart definitions
   * @param id - Template ID
   * @returns Promise with template and chart details
   */
  getTemplate: async (id: TemplateId): Promise<TemplateWithCharts> => {
    try {
      const response = await axios.get<TemplateWithCharts>(
        `${apiUrl}/templates/${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          throw new Error(data.message || 'Template not found.');
        }
        if (status === 500) {
          throw new Error('Failed to fetch template');
        }
      }

      throw new Error('Failed to fetch template');
    }
  },

  /**
   * Get available template IDs for validation
   * This is a helper method for form validation
   */
  getAvailableTemplateIds: (): TemplateId[] => {
    return ['template_1', 'template_2', 'template_3'];
  },
};

export default TemplateService;
