import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileService from '../../services/file.service';
import { Link } from 'react-router-dom';
import { useFileContext } from '../../hooks/useFileContext';
import { formatFileSize } from '../../utils/fileUtils';
import { FileIcon } from '../../utils/fileIcons';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  padding: '40px 20px',
  borderWidth: 2,
  borderRadius: 12,
  borderColor: '#e5e7eb',
  borderStyle: 'dashed' as const,
  backgroundColor: '#f9fafb',
  color: '#6b7280',
  transition: 'border .3s ease-in-out, background-color .3s ease-in-out',
};

const activeStyle = {
  borderColor: '#3b82f6',
  backgroundColor: '#eff6ff',
};

const acceptStyle = {
  borderColor: '#10b981',
  backgroundColor: '#ecfdf5',
};

const rejectStyle = {
  borderColor: '#ef4444',
  backgroundColor: '#fef2f2',
};

interface ImportSectionProps {
  className?: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

const ImportSection: React.FC<ImportSectionProps> = ({ className = '' }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const { selectedFile, setSelectedFile } = useFileContext();

  // Convert selected file and uploaded files to display format
  const displayFiles: {
    name: string;
    size: number;
    type: string;
    isFromContext: boolean;
    file?: File;
    id?: string;
  }[] = useMemo(() => {
    const displayItems = [];

    // Add selected file from context if exists
    if (selectedFile) {
      displayItems.push({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        isFromContext: true,
        id: selectedFile.id,
      });
    }

    // Add uploaded files if no file from context
    if (!selectedFile && files.length > 0) {
      displayItems.push({
        name: files[0].name,
        size: files[0].size,
        type: files[0].type,
        isFromContext: false,
        file: files[0],
      });
    }

    return displayItems;
  }, [selectedFile, files]);

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadStatus('');

    try {
      // Upload the first file (you can modify this to handle multiple files)
      const file = files[0];
      const result = await FileService.uploadFile(file);

      // Handle different response formats
      const message =
        typeof result === 'string' ? result : 'File uploaded successfully';
      setUploadStatus(`✓ ${file.name} uploaded successfully: ${message}`);

      // Clear files after successful upload
      setFiles([]);
    } catch (error) {
      setUploadStatus(
        `✗ Upload failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    if (selectedFile) {
      setSelectedFile(null);
    } else {
      setFiles([]);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        // Clear any selected file from context when dropping new file
        if (selectedFile) {
          setSelectedFile(null);
        }
        setFiles([acceptedFiles[0]]); // Only take the first file
        setUploadStatus('');
      }
    },
    [selectedFile, setSelectedFile]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/json': ['.json'],
    },
    maxFiles: 1,
    noClick: false,
    noKeyboard: false,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  // Clean up object URLs
  useEffect(() => {
    return () => {
      for (const file of files) {
        const fileWithPreview = file as FileWithPreview;
        if (fileWithPreview.preview) {
          URL.revokeObjectURL(fileWithPreview.preview);
        }
      }
    };
  }, [files]);

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      {/* Header */}
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Import Data</h2>
        <p className='text-gray-500'>Upload your data files to get started</p>
      </div>

      {/* Upload Area */}
      <div className='mb-6'>
        <div {...getRootProps({ style })} className='cursor-pointer'>
          <input {...getInputProps()} />
          <div className='text-center'>
            {/* Upload Icon */}
            <div className='mx-auto mb-4'>
              <svg
                className='w-16 h-16 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Upload Icon</title>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                />
              </svg>
            </div>

            {/* Upload Text */}
            <div className='space-y-2'>
              {isDragActive ? (
                <p className='text-lg font-medium'>
                  {isDragAccept
                    ? 'Drop your file here!'
                    : 'File type not supported'}
                </p>
              ) : (
                <>
                  <p className='text-lg font-medium text-gray-700'>
                    Drag and drop your files here
                  </p>
                  <p className='text-sm text-gray-500'>
                    or click to browse files
                  </p>
                </>
              )}
            </div>

            {/* Supported Formats */}
            <div className='mt-4'>
              <p className='text-xs text-gray-400'>
                Supported formats: CSV, XLS, XLSX, JSON
              </p>
              <p className='text-xs text-gray-400 mt-1'>Max file size: 10MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Status */}
      {uploading && (
        <div className='mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <div className='flex items-center'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2' />
            <span className='text-blue-700'>Uploading...</span>
          </div>
        </div>
      )}

      {uploadStatus && !uploading && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            uploadStatus.startsWith('✓')
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {uploadStatus}
        </div>
      )}

      {/* File Preview */}
      {displayFiles.length > 0 && (
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-700 mb-3'>
            Selected File:
          </h3>
          <div className='space-y-2'>
            {displayFiles.map((file, index) => (
              <div
                key={
                  file.isFromContext ? `context-${file.id}` : `upload-${index}`
                }
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  file.isFromContext
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className='flex items-center'>
                  <FileIcon type={file.type} className='w-10 h-10 mr-3' />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {file.name}
                      {file.isFromContext && (
                        <span className='ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded'>
                          From Data Source
                        </span>
                      )}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className='text-red-500 hover:text-red-700 transition-colors'
                  aria-label='Remove file'
                  type='button'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <title>Remove file</title>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className='space-y-3'>
        <button
          type='button'
          onClick={handleUpload}
          className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'
          disabled={uploading || displayFiles.length === 0}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>

        <Link to='/data-source'>
          <button
            type='button'
            className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200'
          >
            Data Source
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ImportSection;
