import type {
  AnalysisRequest,
  AnalysisResponse,
  AnalysisResult,
} from '../types/analysis';

// Simple mock data that matches our interface structure
const createMockResponse = (domain: string): AnalysisResponse => {
  const baseCharts = {
    finance: {
      exploration: [
        {
          chart_id: 'finance_exp_1',
          chart_name: 'chart_pie' as const,
          chart_title: 'Revenue Distribution by Department',
          description: 'Breakdown of total revenue across different business departments',
          x_axis_data: [1, 2, 3, 4, 5],
          x_axis_title: 'Departments',
          y_axis_data: [250000, 180000, 320000, 150000, 200000],
          y_axis_title: 'Revenue ($)',
          z_axis_data: null,
        },
        {
          chart_id: 'finance_exp_2',
          chart_name: 'chart_line' as const,
          chart_title: 'Monthly Cash Flow Trend',
          description: 'Monthly cash flow analysis showing income vs expenses over time',
          x_axis_data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          x_axis_title: 'Months',
          y_axis_data: [45000, 52000, 48000, 61000, 58000, 65000, 72000, 69000, 74000, 71000, 78000, 82000],
          y_axis_title: 'Cash Flow ($)',
          z_axis_data: null,
        },
      ],
      feature: [
        {
          chart_id: 'finance_feat_1',
          chart_name: 'chart_histogram' as const,
          chart_title: 'Expense Category Distribution',
          description: 'Histogram showing the distribution of expenses across different categories',
          x_axis_data: [1, 2, 3, 4, 5, 6, 7, 8],
          x_axis_title: 'Expense Categories',
          y_axis_data: [35000, 42000, 28000, 51000, 39000, 33000, 47000, 41000],
          y_axis_title: 'Amount ($)',
          z_axis_data: null,
        },
      ],
    },
    sales: {
      exploration: [
        {
          chart_id: 'sales_exp_1',
          chart_name: 'chart_bar' as const,
          chart_title: 'Sales Performance by Region',
          description: 'Quarterly sales performance comparison across different regions',
          x_axis_data: [1, 2, 3, 4, 5],
          x_axis_title: 'Regions',
          y_axis_data: [120000, 95000, 150000, 110000, 130000],
          y_axis_title: 'Sales ($)',
          z_axis_data: null,
        },
        {
          chart_id: 'sales_exp_2',
          chart_name: 'chart_scatter' as const,
          chart_title: 'Customer Acquisition vs Revenue',
          description: 'Relationship between customer acquisition cost and revenue generated',
          x_axis_data: [50, 75, 100, 125, 150, 175, 200, 225, 250, 275],
          x_axis_title: 'Acquisition Cost ($)',
          y_axis_data: [500, 750, 1200, 1500, 1800, 2100, 2500, 2800, 3200, 3500],
          y_axis_title: 'Revenue ($)',
          z_axis_data: null,
        },
      ],
      feature: [
        {
          chart_id: 'sales_feat_1',
          chart_name: 'chart_pie' as const,
          chart_title: 'Product Sales Distribution',
          description: 'Distribution of sales across different product categories',
          x_axis_data: [1, 2, 3, 4],
          x_axis_title: 'Products',
          y_axis_data: [300000, 200000, 250000, 180000],
          y_axis_title: 'Sales ($)',
          z_axis_data: null,
        },
      ],
    },
    marketing: {
      exploration: [
        {
          chart_id: 'marketing_exp_1',
          chart_name: 'chart_line' as const,
          chart_title: 'Campaign Performance Over Time',
          description: 'Marketing campaign effectiveness tracking over the past year',
          x_axis_data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          x_axis_title: 'Months',
          y_axis_data: [2.5, 3.2, 2.8, 4.1, 3.8, 4.5, 5.2, 4.9, 5.4, 5.1, 5.8, 6.2],
          y_axis_title: 'Conversion Rate (%)',
          z_axis_data: null,
        },
        {
          chart_id: 'marketing_exp_2',
          chart_name: 'chart_heatmap' as const,
          chart_title: 'Channel Performance Heatmap',
          description: 'Performance comparison across different marketing channels and time periods',
          x_axis_data: [1, 2, 3, 4, 5, 6],
          x_axis_title: 'Channels',
          y_axis_data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          y_axis_title: 'Months',
          z_axis_data: [85, 92, 78, 89, 95, 81, 87, 93, 76, 91, 88, 94, 82, 86, 90, 77, 83, 96, 79, 84, 92, 88, 85, 91, 93, 80, 87, 89, 94, 86, 81, 95, 78, 90, 84, 92, 87, 83, 96, 79, 85, 91, 88, 82, 94, 86, 80, 93, 77, 89, 85, 92, 90, 84, 87, 95, 81, 88, 93, 79, 86, 91, 84, 96, 82, 89, 87, 94, 80, 85, 92, 88],
        },
      ],
      feature: [
        {
          chart_id: 'marketing_feat_1',
          chart_name: 'chart_bar' as const,
          chart_title: 'ROI by Marketing Channel',
          description: 'Return on investment comparison across different marketing channels',
          x_axis_data: [1, 2, 3, 4, 5, 6],
          x_axis_title: 'Marketing Channels',
          y_axis_data: [15.5, 12.8, 18.2, 14.1, 16.7, 13.4],
          y_axis_title: 'ROI (%)',
          z_axis_data: null,
        },
      ],
    },
  };

  const domainData = baseCharts[domain as keyof typeof baseCharts] || baseCharts.finance;

  return {
    data: {
      exploration_charts: {
        exploration_charts: domainData.exploration,
      },
      feature_charts: {
        Feature_charts: domainData.feature,
      },
    },
  };
};

const AnalysisService = {
  /**
   * Analyze a file with financial data (using mock data)
   * @param request - Analysis request with file details and domain
   * @returns Promise with analysis result
   */
  analyzeFinancialData: async (
    request: AnalysisRequest
  ): Promise<AnalysisResult> => {
    try {
      // Simulate network delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
        // Get mock data based on domain
      const mockResponse = createMockResponse(request.domain || 'finance');

      // Transform the response to match our internal structure
      const analysisResult: AnalysisResult = {
        id: crypto.randomUUID(),
        fileName: request.file_name,
        fileExtension: request.file_ext,
        domain: request.domain || 'finance',
        createdAt: new Date().toISOString(),
        explorationCharts: mockResponse.data.exploration_charts.exploration_charts,
        featureCharts: mockResponse.data.feature_charts.Feature_charts,
      };

      return analysisResult;
    } catch (error) {
      throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};

export default AnalysisService;
