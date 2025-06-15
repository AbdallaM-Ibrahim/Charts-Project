import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  AnalysisStatus,
  AnalysisResult,
  AnalysisRequest,
} from '../types/analysis';
import { AnalysisService, FileService } from '../services';

interface UseAnalysisReturn {
  status: AnalysisStatus;
  result: AnalysisResult | null;
  error: string | null;
  progress: number;
  startAnalysis: (
    file: File,
    domain: 'finance' | 'sales' | 'marketing'
  ) => Promise<void>;
  resetAnalysis: () => void;
  isAnalyzing: boolean;
}

export const useAnalysis = (): UseAnalysisReturn => {
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const isAnalyzingRef = useRef(false);

  const isAnalyzing = status === 'uploading' || status === 'analyzing';

  // Prevent page navigation during analysis
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isAnalyzingRef.current) {
        event.preventDefault();
        event.returnValue =
          'Analysis is in progress. Are you sure you want to leave? This will cancel the analysis.';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Update ref when analysis status changes
  useEffect(() => {
    isAnalyzingRef.current = isAnalyzing;
  }, [isAnalyzing]);

  const getFileExtension = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const validExtensions = [
      'csv',
      'xlsx',
      'txt',
      'pdf',
      'png',
      'jpg',
      'jpeg',
      'gif',
    ];
    return validExtensions.includes(ext || '') ? ext! : 'txt';
  };

  const simulateProgress = useCallback(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 95) {
        currentProgress = 95;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const startAnalysis = useCallback(
    async (file: File, domain: 'finance' | 'sales' | 'marketing') => {
      try {
        setStatus('uploading');
        setError(null);
        setResult(null);
        setProgress(0); // Step 1: Upload file
        await FileService.uploadFile(file);
        setProgress(25);

        // Step 2: Start analysis
        setStatus('analyzing');

        // Start progress simulation
        const stopProgress = simulateProgress();

        const fileExt = getFileExtension(file.name);
        const analysisRequest: AnalysisRequest = {
          action: 'analyze',
          file_name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          file_ext: fileExt as AnalysisRequest['file_ext'],
          domain,
        };

        const analysisResult = await AnalysisService.analyzeFinancialData(
          analysisRequest
        );

        // Stop progress simulation and complete
        stopProgress();
        setProgress(100);

        setResult(analysisResult);
        setStatus('completed');

        // Reset progress after a short delay for smooth UI
        setTimeout(() => setProgress(0), 1000);
      } catch (err) {
        setStatus('error');
        setProgress(0);
        setError(err instanceof Error ? err.message : 'Analysis failed');
      }
    },
    [simulateProgress]
  );

  const resetAnalysis = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  return {
    status,
    result,
    error,
    progress,
    startAnalysis,
    resetAnalysis,
    isAnalyzing,
  };
};
