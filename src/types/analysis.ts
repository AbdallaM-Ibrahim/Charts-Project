// Types for financial analysis API

export interface AnalysisRequest {
  action: 'analyze';
  file_name: string;
  file_ext: 'csv' | 'xlsx' | 'txt' | 'pdf' | 'png' | 'jpg' | 'jpeg' | 'gif';
  domain?: 'finance' | 'sales' | 'marketing';
}

export interface ChartData {
  chart_id: string;
  chart_name:
    | 'chart_line'
    | 'chart_bar'
    | 'chart_pie'
    | 'chart_histogram'
    | 'chart_scatter'
    | 'chart_heatmap';
  chart_title: string;
  description: string;
  x_axis_data: number[];
  x_axis_title: string;
  y_axis_data: number[];
  y_axis_title: string;
  z_axis_data: number[] | null;
}

export interface ExplorationCharts {
  exploration_charts: ChartData[];
}

export interface FeatureCharts {
  Feature_charts: ChartData[];
}

export interface AnalysisResponse {
  data: {
    exploration_charts: ExplorationCharts;
    feature_charts: FeatureCharts;
  };
}

export interface AnalysisResult {
  id: string;
  fileName: string;
  fileExtension: string;
  domain: string;
  createdAt: string;
  explorationCharts: ChartData[];
  featureCharts: ChartData[];
}

export type AnalysisStatus =
  | 'idle'
  | 'uploading'
  | 'analyzing'
  | 'completed'
  | 'error';
