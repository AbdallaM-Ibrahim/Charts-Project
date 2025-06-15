// Export all services for easy importing
export { default as AuthService } from './auth.service';
export { default as HealthService } from './health.service';
export { default as FileService } from './file.service';
export { default as ChartService } from './chart.service';
export { default as TemplateService } from './template.service';
export { default as HistoryService } from './history.service';
export { default as AnalysisService } from './analysis.service';

// Export types for external use
export type {
  User,
  UserCredentials,
  UserData,
  UserRegister,
} from './auth.service';
export type { FileUploadResponse } from './file.service';
export type { HistoryEntry } from './history.service';
export type {
  AnalysisRequest,
  AnalysisResponse,
  AnalysisResult,
  ChartData,
  AnalysisStatus,
} from '../types/analysis';
