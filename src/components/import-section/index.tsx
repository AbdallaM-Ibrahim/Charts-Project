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
  onFileUploaded?: (file: File) => void;
  isAnalyzing?: boolean;
}

interface FileWithPreview extends File {
  preview?: string;
}

const ImportSection: React.FC<ImportSectionProps> = ({ 
  className = '', 
  onFileUploaded,
  isAnalyzing = false 
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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

    // Priority: uploaded file > selected file from context > newly dropped files
    if (uploadedFile) {
      displayItems.push({
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type,
        isFromContext: false,
        file: uploadedFile,
      });
    } else if (selectedFile) {
      displayItems.push({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        isFromContext: true,
        id: selectedFile.id,
      });
    } else if (files.length > 0) {
      displayItems.push({
        name: files[0].name,
        size: files[0].size,
        type: files[0].type,
        isFromContext: false,
        file: files[0],
      });
    }

    return displayItems;
  }, [selectedFile, files, uploadedFile]);  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    setUploadStatus('');    try {
      await FileService.uploadFile(file);

      setUploadStatus(`✓ ${file.name} uploaded successfully`);

      // Set the uploaded file and notify parent
      setUploadedFile(file);
      onFileUploaded?.(file);

      // Clear dropped files after successful upload
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
  }, [onFileUploaded]);

  // Auto-upload when file is dropped/selected
  useEffect(() => {
    if (files.length > 0 && !uploading && !uploadedFile) {
      handleUpload(files[0]);
    }
  }, [files, uploading, uploadedFile, handleUpload]);  const removeFile = () => {
    if (uploadedFile) {
      setUploadedFile(null);
      setUploadStatus('');
    } else if (selectedFile) {
      setSelectedFile(null);
    } else {
      setFiles([]);
    }
  };
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        // Clear any previous state when dropping new file
        if (selectedFile) {
          setSelectedFile(null);
        }
        if (uploadedFile) {
          setUploadedFile(null);
        }
        setFiles([acceptedFiles[0]]); // Only take the first file
        setUploadStatus('');
      }
    },
    [selectedFile, setSelectedFile, uploadedFile]
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

      {/* Upload Area or Selected File Display */}
      <div className='mb-6'>
        {displayFiles.length > 0 ? (
          // Selected File Display - clean, centered layout
          <div className='border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30 p-8'>
            <div className='flex flex-col items-center text-center'>
              {/* File Icon */}
              <div className='mb-4'>
                <FileIcon type={displayFiles[0].type} className='w-12 h-12' />
              </div>

              {/* File Info */}
              <div className='mb-6 space-y-1'>
                <h3 className='text-lg font-semibold text-gray-900 break-all'>
                  {displayFiles[0].name}
                </h3>
                <p className='text-sm text-gray-600'>
                  {formatFileSize(displayFiles[0].size)}
                </p>
                {displayFiles[0].isFromContext && (
                  <div className='pt-2'>
                    <span className='inline-block text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full'>
                      From Data Source
                    </span>
                  </div>
                )}
              </div>

              {/* Unselect Button */}
              <button
                onClick={removeFile}
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                type='button'
              >
                <svg
                  className='w-4 h-4 mr-2'
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
                Remove File
              </button>
            </div>
          </div>
        ) : (
          // Original Drag and Drop Area - improved spacing
          <div
            {...getRootProps({ style })}
            className='cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl'
          >
            <input {...getInputProps()} />
            <div className='text-center py-8'>
              {/* Upload Icon */}
              <div className='mb-4'>
                <svg
                  className='w-12 h-12 text-gray-400 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Upload Icon</title>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>
              </div>

              {/* Upload Text */}
              <div className='mb-4 space-y-1'>
                {isDragActive ? (
                  <p className='text-base font-medium text-gray-900'>
                    {isDragAccept
                      ? 'Drop your file here!'
                      : 'File type not supported'}
                  </p>
                ) : (
                  <>
                    <p className='text-base font-medium text-gray-900'>
                      Drag and drop your file here
                    </p>
                    <p className='text-sm text-gray-500'>
                      or click to browse files
                    </p>
                  </>
                )}
              </div>

              {/* Supported Formats */}
              <div className='space-y-1'>
                <p className='text-xs text-gray-500'>
                  Supported formats: CSV, XLS, XLSX, JSON
                </p>
                <p className='text-xs text-gray-500'>Max file size: 10MB</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Status */}
      {uploading && (
        <div className='mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
          <div className='flex items-center'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3' />
            <span className='text-sm font-medium text-blue-700'>
              Uploading...
            </span>
          </div>
        </div>
      )}

      {uploadStatus && !uploading && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            uploadStatus.startsWith('✓')
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <p
            className={`text-sm font-medium ${
              uploadStatus.startsWith('✓') ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {uploadStatus}
          </p>
        </div>
      )}      {/* Action Buttons */}
      <div className='space-y-3'>
        {/* Status indicator for uploaded file */}
        {uploadedFile && (
          <div className='bg-green-50 border border-green-200 rounded-lg p-3'>
            <div className='flex items-center'>              <svg className='w-4 h-4 text-green-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <title>Check</title>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
              <span className='text-sm font-medium text-green-700'>
                File ready for analysis
              </span>
            </div>
          </div>
        )}

        <Link to='/data-source' className='block'>
          <button
            type='button'
            className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
              isAnalyzing 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            disabled={isAnalyzing}
          >
            Data Source
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ImportSection;
