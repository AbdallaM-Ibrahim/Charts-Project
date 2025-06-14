import type React from 'react';
import { useState } from 'react';
import { PieChart, AreaChart } from '../../components/charts';
import ImportSection from '../../components/import-section';
import DomainCards, { type DomainCard } from './components/DomainCards';
import {
  salesDistributionData,
  salesDistributionData2,
  inventoryLevelsData,
} from './chartData';

const Home: React.FC = () => {
  const [selectedDomainId, setSelectedDomainId] = useState<number>(0);

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

  const handleDomainSelect = (cardId: number) => {
    setSelectedDomainId(cardId === selectedDomainId ? 0 : cardId);
  };

  return (
    <div className='px-6'>
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
                data={salesDistributionData}
                showLabels={true}
              />

              {/* Current Inventory Levels Chart */}
              <AreaChart
                title='Current Inventory Levels'
                data={inventoryLevelsData}
                maxValue={2000}
              />

              {/* Product Sales Distribution Chart 2 */}
              <PieChart
                title='Product Sales Distribution'
                data={salesDistributionData2}
              />
            </div>

            {/* Import Section - Shows before button on xl screens and below */}
            <div className='xl:hidden mb-8'>
              <ImportSection />
            </div>

            {/* Start Analyze Button */}
            <div className='text-center'>
              <button
                type='button'
                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-16 rounded-xl transition-colors duration-200 text-lg'
              >
                Start Analyze
              </button>
            </div>
          </div>
        </div>

        {/* Import Section - Right side on 2xl screens only */}
        <div className='hidden xl:block xl:col-span-1'>
          <ImportSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
