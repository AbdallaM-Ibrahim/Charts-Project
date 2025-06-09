import { useEffect, useRef } from 'react';
import Chart, { type ChartConfiguration } from 'chart.js/auto';

/**
 * Custom hook for managing Chart.js instances
 * Handles chart creation, updates, and cleanup automatically
 */
export const useChart = (config: ChartConfiguration) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Destroy existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart
      chartRef.current = new Chart(canvasRef.current, config);
    }

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [config]);

  return {
    canvasRef,
    chartInstance: chartRef.current,
  };
};
