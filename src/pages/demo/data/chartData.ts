import type { ChartConfiguration } from 'chart.js/auto';

// Custom interface for matrix data points
export interface MatrixDataPoint {
  x: number;
  y: number;
  v: number;
}

export interface ChartConfigWithType<
  T extends 'pie' | 'line' | 'scatter' | 'bar' | 'matrix'
> {
  type: T;
  title: string;
  config: T extends 'matrix'
    ? Partial<ChartConfiguration> & {
        data: {
          datasets: Array<{
            label: string;
            data: MatrixDataPoint[];
          }>;
        };
      }
    : Partial<ChartConfiguration<T>>;
}

// Pie Chart Data
export const pieChartData: ChartConfigWithType<'pie'> = {
  type: 'pie',
  title: 'Browser Usage Statistics',
  config: {
    data: {
      labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'],
      datasets: [
        {
          data: [65, 20, 8, 5, 2],
          backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6',
          ],
          hoverBackgroundColor: [
            '#2563EB',
            '#059669',
            '#D97706',
            '#DC2626',
            '#7C3AED',
          ],
        },
      ],
    },
  },
};

// Area Chart Data
export const areaChartData: ChartConfigWithType<'line'> = {
  type: 'line',
  title: 'Sales Performance',
  config: {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Monthly Sales',
          data: [1200, 1900, 800, 1400, 1700, 2100],
        },
      ],
    },
    options: {
      scales: {
        y: {
          max: 2500,
          title: {
            display: true,
            text: 'Sales ($)',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Month',
          },
        },
      },
    },
  },
};

// Scatter Chart Data
export const scatterChartData: ChartConfigWithType<'scatter'> = {
  type: 'scatter',
  title: 'Data Correlation',
  config: {
    data: {
      datasets: [
        {
          label: 'Dataset 1',
          data: [
            { x: 10, y: 20 },
            { x: 15, y: 25 },
            { x: 20, y: 30 },
            { x: 25, y: 35 },
            { x: 30, y: 28 },
            { x: 35, y: 45 },
          ],
        },
        {
          label: 'Dataset 2',
          data: [
            { x: 12, y: 15 },
            { x: 18, y: 22 },
            { x: 22, y: 18 },
            { x: 28, y: 32 },
            { x: 32, y: 40 },
            { x: 38, y: 38 },
          ],
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'X Values',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Y Values',
          },
        },
      },
    },
  },
};

// Histogram Chart Data
export const histogramChartData: ChartConfigWithType<'bar'> = {
  type: 'bar',
  title: 'Value Distribution',
  config: {
    data: {
      labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
      datasets: [
        {
          label: 'Frequency Distribution',
          data: [5, 12, 18, 25, 15, 8],
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Value Ranges',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Frequency',
          },
        },
      },
    },
  },
};

// Heatmap Chart Data
export const heatmapChartData: ChartConfigWithType<'matrix'> = {
  type: 'matrix',
  title: 'Activity Heatmap',
  config: {
    data: {
      datasets: [
        {
          label: 'Activity Heatmap',
          data: [
            { x: 0, y: 0, v: 5 }, // Mon Morning
            { x: 0, y: 1, v: 12 }, // Mon Afternoon
            { x: 0, y: 2, v: 3 }, // Mon Evening
            { x: 1, y: 0, v: 18 }, // Tue Morning
            { x: 1, y: 1, v: 25 }, // Tue Afternoon
            { x: 1, y: 2, v: 8 }, // Tue Evening
            { x: 2, y: 0, v: 22 }, // Wed Morning
            { x: 2, y: 1, v: 35 }, // Wed Afternoon
            { x: 2, y: 2, v: 15 }, // Wed Evening
            { x: 3, y: 0, v: 10 }, // Thu Morning
            { x: 3, y: 1, v: 28 }, // Thu Afternoon
            { x: 3, y: 2, v: 20 }, // Thu Evening
            { x: 4, y: 0, v: 30 }, // Fri Morning
            { x: 4, y: 1, v: 40 }, // Fri Afternoon
            { x: 4, y: 2, v: 25 }, // Fri Evening
          ],
        },
      ],
    },
    options: {
      scales: {
        x: {
          min: -0.5,
          max: 4.5,
          ticks: {
            stepSize: 1,
            callback: (value: string | number) => {
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
              return days[Math.round(Number(value))] || '';
            },
          },
        },
        y: {
          min: -0.5,
          max: 2.5,
          ticks: {
            stepSize: 1,
            callback: (value: string | number) => {
              const times = ['Morning', 'Afternoon', 'Evening'];
              return times[Math.round(Number(value))] || '';
            },
          },
        },
      },
    },
  },
};

// Helper data for heatmap labels
export const heatmapLabels = {
  xLabels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  yLabels: ['Morning', 'Afternoon', 'Evening'],
};

// Export all chart data for easy iteration
export const allChartData = [
  pieChartData,
  areaChartData,
  scatterChartData,
  histogramChartData,
  heatmapChartData,
];
