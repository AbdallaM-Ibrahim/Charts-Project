import type React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/primitive/back-button';
import FileService, { type FileInfo } from '../services/file.service';
import { useFileContext } from '../hooks/useFileContext';
import { FileIcon } from '../utils/fileIcons';
import { formatFileSize } from '../utils/fileUtils';

const DataSource: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { setSelectedFile, isFileSelected } = useFileContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const filesData = await FileService.getAllFiles();
      setFiles(filesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filename: string) => {
    try {
      const blob = await FileService.downloadFile(filename);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
    }
    setOpenMenuId(null);
  };

  const handleImport = (file: FileInfo) => {
    if (isFileSelected(file.id)) {
      // If already selected, deselect
      setSelectedFile(null);
    } else {
      // Select new file
      setSelectedFile({
        id: file.id,
        name: file.name,
        filename: file.filename,
        size: file.size,
        type: file.type,
      });
    }
    setOpenMenuId(null);
    navigate('/');
  };

  const toggleMenu = (fileId: string) => {
    setOpenMenuId(openMenuId === fileId ? null : fileId);
  };

  if (loading) {
    return (
      <div className='p-6'>
        <BackButton text='Back' />
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <BackButton text='Back' />

      <div className='space-y-8'>
        {/* Header Section */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                Recent Files
              </h1>
              <p className='text-gray-600 text-lg'>
                Manage and access your recently uploaded data files
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='bg-blue-50 rounded-lg px-4 py-2'>
                <div className='text-sm text-blue-600 font-medium'>
                  {files.length} {files.length === 1 ? 'File' : 'Files'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 rounded-xl p-8 max-w-lg mx-auto text-center'>
            <svg
              className='mx-auto h-12 w-12 text-red-400 mb-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <title>Error Icon</title>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <h3 className='text-xl font-semibold text-red-800 mb-3'>
              Something went wrong
            </h3>
            <p className='text-red-600 mb-6'>{error}</p>
            <button
              type='button'
              onClick={fetchFiles}
              className='bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium'
            >
              Try Again
            </button>
          </div>
        )}

        {/* Files Section */}
        {files.length === 0 && !loading && !error ? (
          <div className='text-center py-20'>
            <div className='max-w-md mx-auto'>
              <svg
                className='mx-auto h-20 w-20 text-gray-400 mb-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <title>No Files Found</title>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                No files found
              </h3>
              <p className='text-gray-500 text-lg leading-relaxed'>
                Upload your first data file to get started with analysis.
              </p>
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Available Files
            </h2>
            <div className='space-y-4'>
              {files.map((file) => (
                <div
                  key={file.id}
                  className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='relative'>
                        <FileIcon type={file.type} className='w-12 h-12' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-900 text-lg'>
                          {file.name}
                        </h3>
                        <p className='text-sm text-gray-500'>
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>

                    <div className='relative'>
                      <button
                        type='button'
                        onClick={() => toggleMenu(file.id)}
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                        aria-label='More options'
                      >
                        <svg
                          className='w-5 h-5 text-gray-500'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
                        </svg>
                      </button>

                      {openMenuId === file.id && (
                        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border'>
                          <div className='py-1'>
                            <button
                              onClick={() => handleDownload(file.filename)}
                              className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              Download
                            </button>
                            <button
                              onClick={() => handleImport(file)}
                              className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              Reuse to analyze
                            </button>
                            <button
                              disabled
                              className='block w-full text-left px-4 py-2 text-sm text-red-400 cursor-not-allowed opacity-50'
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSource;
