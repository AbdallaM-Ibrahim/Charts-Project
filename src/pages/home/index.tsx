import type React from 'react';
import { PieChart, AreaChart } from '../../components/charts';
import {
  salesDistributionData,
  salesDistributionData2,
  inventoryLevelsData,
  handleSalesChartClick,
  handleInventoryChartClick,
} from './chartData';

const Home: React.FC = () => {
  const domainCards = [
    {
      title: 'Sales',
      description: 'Analyze sales performance, trends and inventory',
      icon: '📊',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      selected: true,
    },
    {
      title: 'Finance',
      description: 'Analyze budget, profit and loss',
      icon: '💰',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      selected: false,
    },
    {
      title: 'Marketing',
      description: 'Analyze campaigns, web traffic and engagement',
      icon: '📢',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      selected: false,
    },
  ];

  return (
    <div className='px-6 py-4'>
      <div className='bg-white rounded-xl shadow-sm p-8'>
        {' '}
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Home</h1>
          <p className='text-gray-500'>Choose the domain to analyze</p>
        </div>
        {/* Domain Cards */}{' '}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          {domainCards.map((card) => (
            <div
              key={card.title}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                card.selected
                  ? `${card.bgColor} ${card.borderColor}`
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className='text-center'>
                <div className='text-4xl mb-4'>{card.icon}</div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {card.title}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>{' '}
        {/* Overview Section */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Overview</h2>
          <p className='text-gray-500'>Analyze your data and get insights</p>
        </div>{' '}
        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
          {/* Product Sales Distribution Chart 1 */}
          <PieChart
            title='Product Sales'
            subtitle='Distribution'
            data={salesDistributionData}
            showLabels={true}
            onSegmentClick={handleSalesChartClick}
          />

          {/* Current Inventory Levels Chart */}
          <AreaChart
            title='Current Inventory'
            subtitle='Levels'
            data={inventoryLevelsData}
            maxValue={2000}
            onPointClick={handleInventoryChartClick}
          />

          {/* Product Sales Distribution Chart 2 */}
          <PieChart
            title='Product Sales'
            subtitle='Distribution'
            data={salesDistributionData2}
            showLabels={true}
            onSegmentClick={handleSalesChartClick}
          />
        </div>{' '}
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
  );
};

export default Home;
