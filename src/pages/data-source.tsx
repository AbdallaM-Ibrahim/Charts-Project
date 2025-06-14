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
  const { addSelectedFile } = useFileContext();
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
    console.log('Importing file:', file);
    addSelectedFile({
      id: file.id,
      name: file.name,
      filename: file.filename,
      size: file.size,
      type: file.type,
    });
    navigate('/');
    setOpenMenuId(null);
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
    <div className='p-6'>
      <BackButton text='Back' />

      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Recent</h1>
      </div>

      {error && (
        <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700'>
          {error}
        </div>
      )}

      <div className='space-y-3'>
        {files.map((file) => (
          <div
            key={file.id}
            className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow relative'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <FileIcon type={file.type} className='w-12 h-12' />
                <div>
                  <h3 className='font-medium text-gray-900'>{file.name}</h3>
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
                        Import to Home
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

        {files.length === 0 && !loading && (
          <div className='text-center py-12'>
            <p className='text-gray-500'>No files found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSource;
