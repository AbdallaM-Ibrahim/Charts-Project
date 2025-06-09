// Export all services for easy importing
export { default as AuthService } from './auth.service';
export { default as HealthService } from './health.service';
export { default as FileService } from './file.service';
export { default as ChartService } from './chart.service';
export { default as TemplateService } from './template.service';
export { default as HistoryService } from './history.service';

// Export types for external use
export type {
  User,
  UserCredentials,
  UserData,
  UserRegister,
} from './auth.service';
export type { HealthStatus } from './health.service';
export type { FileUploadResponse } from './file.service';
export type {
  Chart,
  ChartData,
  ChartDataset,
  ChartWithData,
  AddChartDataRequest,
  AddChartDataResponse,
  ChartType,
  ChartId,
} from './chart.service';
export type {
  Template,
  TemplateWithCharts,
  TemplateId,
} from './template.service';
export type {
  HistoryEntry,
  HistoryFilters,
  ActivityType,
  TargetType,
} from './history.service';
