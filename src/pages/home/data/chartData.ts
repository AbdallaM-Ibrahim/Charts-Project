import type { ChartConfiguration } from 'chart.js/auto';

// Sales Distribution Chart 1 Configuration
export const salesDistributionConfig: Partial<ChartConfiguration<'pie'>> = {
  data: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        data: [35, 25, 25, 15],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
        hoverBackgroundColor: ['#2563EB', '#059669', '#D97706', '#7C3AED'],
      },
    ],
  },
};

// Sales Distribution Chart 2 Configuration
export const salesDistributionConfig2: Partial<ChartConfiguration<'pie'>> = {
  data: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        data: [35, 25, 25, 15],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'],
        hoverBackgroundColor: ['#059669', '#2563EB', '#D97706', '#7C3AED'],
      },
    ],
  },
};

// Inventory Levels Chart Configuration
export const inventoryLevelsConfig: Partial<ChartConfiguration<'line'>> = {
  data: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Inventory Levels',
        data: [1100, 800, 1400, 400],
      },
    ],
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Products',
        },
      },
      y: {
        max: 2000,
        title: {
          display: true,
          text: 'Units',
        },
      },
    },
  },
};
