import type React from 'react';
import { useState } from 'react';
import { PieChart, AreaChart } from '../../components/charts';
import ImportSection from '../../components/import-section';
import DomainCards, { type DomainCard } from './components/DomainCards';
import AnalysisResults from '../analysis-results';
import AnalysisLoadingModal from '../../components/analysis-loading-modal';
import { useAnalysis } from '../../hooks/useAnalysis';
import {
  salesDistributionConfig,
  salesDistributionConfig2,
  inventoryLevelsConfig,
} from './data/chartData';

const Home: React.FC = () => {
  const [selectedDomainId, setSelectedDomainId] = useState<number>(0);
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  
  // Analysis hook
  const {
    status,
    result,
    error,
    progress,
    startAnalysis,
    resetAnalysis,
    isAnalyzing,
  } = useAnalysis();
  const domainCards: DomainCard[] = [
    {
      id: 0,
      title: 'Sales',
      description: 'Analyze sales performance, trends and inventory',
      icon: 'assets/sales.svg',
      iconClass: 'rotate-y-180',
      bgColor: 'bg-blue-100',
      borderColor: 'hover:border-blue-400',
      hoverColor: 'hover:bg-blue-200',
    },
    {
      id: 1,
      title: 'Finance',
      description: 'Analyze budget, profit and loss',
      icon: 'assets/finance.svg',
      bgColor: 'bg-green-100',
      borderColor: 'hover:border-green-400',
      hoverColor: 'hover:bg-green-200',
    },
    {
      id: 2,
      title: 'Marketing',
      description: 'Analyze campaigns, web traffic and engagement',
      icon: 'assets/marketing.svg',
      bgColor: 'bg-red-100',
      borderColor: 'hover:border-red-400',
      hoverColor: 'hover:bg-red-200',
    },
  ];

  // Map domain IDs to domain names
  const getDomainName = (id: number): 'finance' | 'sales' | 'marketing' => {
    const mapping = {
      0: 'sales',
      1: 'finance',
      2: 'marketing',
    } as const;
    return mapping[id as keyof typeof mapping] || 'finance';
  };

  const handleDomainSelect = (cardId: number) => {
    setSelectedDomainId(cardId === selectedDomainId ? 0 : cardId);
  };  const handleStartAnalysis = async () => {
    if (currentFile) {
      // Use the current file for analysis
      try {
        const domain = getDomainName(selectedDomainId);
        await startAnalysis(currentFile, domain);
        setShowAnalysisResults(true);
      } catch (err) {
        console.error('Analysis failed:', err);
      }
    } else {
      // Trigger file selection if no file is available
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.csv,.xlsx,.txt,.pdf,.png,.jpg,.jpeg,.gif';
      
      fileInput.onchange = async (event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        
        if (file) {
          try {
            const domain = getDomainName(selectedDomainId);
            await startAnalysis(file, domain);
            setShowAnalysisResults(true);
          } catch (err) {
            console.error('Analysis failed:', err);
          }
        }
      };
      
      fileInput.click();
    }
  };

  const handleFileUploaded = (file: File) => {
    setCurrentFile(file);
  };

  const handleBackFromAnalysis = () => {
    setShowAnalysisResults(false);
    resetAnalysis();
  };

  // Show analysis results if we have completed analysis
  if (showAnalysisResults && result) {
    return <AnalysisResults result={result} onBack={handleBackFromAnalysis} />;
  }
  return (
    <div className='px-6'>
      {/* Analysis Loading Modal */}
      <AnalysisLoadingModal
        isVisible={isAnalyzing}
        status={status}
        progress={progress}
        onCancel={status === 'uploading' ? () => resetAnalysis() : undefined}
      />

      {/* Main Container with Responsive Layout */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        {/* Main Content Section */}
        <div className='xl:col-span-2'>
          <div className='bg-white rounded-xl shadow-sm p-8'>
            {/* Header */}
            <div className='mb-8'>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Home</h1>
              <p className='text-gray-500'>Choose the domain to analyze</p>
            </div>
            {/* Domain Cards Component */}
            <DomainCards
              cards={domainCards}
              selectedCardId={selectedDomainId}
              onCardSelect={handleDomainSelect}
            />
            {/* Overview Section */}
            <div className='hidden lg:block mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                Overview
              </h2>
              <p className='text-gray-500'>
                Analyze your data and get insights
              </p>
            </div>
            {/* Charts Section - Hidden on md screens and lower */}
            <div className='hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
              {/* Product Sales Distribution Chart 1 */}
              <PieChart
                title='Product Sales Distribution'
                config={salesDistributionConfig}
              />

              {/* Current Inventory Levels Chart */}
              <AreaChart
                title='Current Inventory Levels'
                config={inventoryLevelsConfig}
              />

              {/* Product Sales Distribution Chart 2 */}
              <PieChart
                title='Product Sales Distribution'
                config={salesDistributionConfig2}
              />
            </div>            {/* Import Section - Shows before button on xl screens and below */}
            <div className='xl:hidden mb-8'>
              <ImportSection 
                onFileUploaded={handleFileUploaded}
                isAnalyzing={isAnalyzing}
              />
            </div>{' '}
            {/* Start Analyze Button */}
            <div className='text-center space-y-4'>
              {/* Error Display */}
              {error && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
                  <div className='flex items-center'>                    <svg
                      className='w-5 h-5 text-red-400 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <title>Error</title>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <p className='text-red-700 text-sm'>{error}</p>
                  </div>
                </div>
              )}
              {/* Progress Bar */}
              {isAnalyzing && (
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-blue-700 text-sm font-medium'>
                      {status === 'uploading'
                        ? 'Uploading file...'
                        : 'Analyzing data...'}
                    </span>
                    <span className='text-blue-600 text-sm'>
                      {Math.round(progress)}%
                    </span>
                  </div>{' '}
                  <div className='w-full bg-blue-200 rounded-full h-2 relative'>
                    <div
                      className='bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out absolute top-0 left-0'
                      data-progress={Math.min(progress, 100)}
                      ref={(el) => {
                        if (el) {
                          el.style.width = `${Math.min(progress, 100)}%`;
                        }
                      }}
                    />
                  </div>
                  <p className='text-blue-600 text-xs mt-2'>
                    This may take up to 5 minutes. Please don't close this tab.
                  </p>
                </div>
              )}
              {/* Start Analyze Button */}
              <button
                type='button'
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className={`font-semibold py-4 px-16 rounded-xl transition-all duration-200 text-lg flex items-center justify-center gap-3 mx-auto ${
                  isAnalyzing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent' />
                    {status === 'uploading' ? 'Uploading...' : 'Analyzing...'}
                  </>
                ) : (
                  <>                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <title>Charts</title>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                      />
                    </svg>
                    Start Analyze
                  </>
                )}
              </button>{' '}
              {/* Domain Selection Helper */}
              <p className='text-gray-500 text-sm'>
                Selected domain:{' '}
                <span className='font-medium text-gray-700 capitalize'>
                  {getDomainName(selectedDomainId)}
                </span>
              </p>
              {/* Instructions */}
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4'>
                <div className='flex items-center justify-center text-blue-800'>                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <title>Info</title>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>                  <span className='text-sm'>
                    {currentFile 
                      ? 'Click "Start Analyze" to analyze your uploaded file'
                      : 'Click "Start Analyze" to select a file and begin the analysis process'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Import Section - Right side on 2xl screens only */}
        <div className='hidden xl:block xl:col-span-1'>
          <ImportSection 
            onFileUploaded={handleFileUploaded}
            isAnalyzing={isAnalyzing}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
