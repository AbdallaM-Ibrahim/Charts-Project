import type React from 'react';
import { PieChart, AreaChart } from '../../components/charts';
import ImportSection from '../../components/import-section';
import {
  salesDistributionData,
  salesDistributionData2,
  inventoryLevelsData,
} from './chartData';

const Home: React.FC = () => {
  const domainCards = [
    {
      title: 'Sales',
      description: 'Analyze sales performance, trends and inventory',
      icon: 'assets/sales.svg',
      bgColor: 'bg-blue-100',
      borderColor: 'hover:border-blue-400',
      hoverColor: 'hover:bg-blue-200',
    },
    {
      title: 'Finance',
      description: 'Analyze budget, profit and loss',
      icon: 'assets/finance.svg',
      bgColor: 'bg-green-100',
      borderColor: 'hover:border-green-400',
      hoverColor: 'hover:bg-green-200',
    },
    {
      title: 'Marketing',
      description: 'Analyze campaigns, web traffic and engagement',
      icon: 'assets/marketing.svg',
      bgColor: 'bg-red-100',
      borderColor: 'hover:border-red-400',
      hoverColor: 'hover:bg-red-200',
    },
  ];
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

            {/* Domain Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 max-w-4xl mx-auto'>
              {domainCards.map((card) => (
                <div
                  key={card.title}
                  className={`flex justify-center items-center h-80 md:h-64 p-8 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${card.bgColor} bg-white border-gray-200 ${card.hoverColor} border-gray-300 ${card.borderColor}`}
                >
                  <div className='text-center'>
                    <div className='text-5xl mb-2 flex justify-center items-center'>
                      <img src={card.icon} alt={card.title} />
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 mb-3'>
                      {card.title}
                    </h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Overview Section */}
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                Overview
              </h2>
              <p className='text-gray-500'>
                Analyze your data and get insights
              </p>
            </div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
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

        {/* Import Section - Right side on desktop, below on mobile */}
        <div className='xl:col-span-1'>
          <ImportSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
