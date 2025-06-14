import type { PieChartData } from '../../../components/charts/PieChart';
import type { AreaChartData } from '../../../components/charts/AreaChart';

// Chart data configurations
export const salesDistributionData: PieChartData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  data: [35, 25, 25, 15],
  backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
  hoverBackgroundColor: ['#2563EB', '#059669', '#D97706', '#7C3AED'],
  showLabels: true,
};

export const salesDistributionData2: PieChartData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  data: [35, 25, 25, 15],
  backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'],
  hoverBackgroundColor: ['#059669', '#2563EB', '#D97706', '#7C3AED'],
  showLabels: true,
};

export const inventoryLevelsData: AreaChartData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  data: [1100, 800, 1400, 400],
  label: 'Inventory Levels',
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  borderColor: '#3B82F6',
  pointBackgroundColor: '#3B82F6',
  xAxisLabel: 'Products',
  yAxisLabel: 'Units',
};
