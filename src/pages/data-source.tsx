import type React from 'react';
import BackButton from '../components/primitive/back-button';

const DataSource: React.FC = () => {
  return (
    <div className='p-6'>
      <BackButton text='Back' />

      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Data Source</h1>
      <p className='text-gray-600'>Welcome to the Data Source page!</p>
    </div>
  );
};

export default DataSource;
