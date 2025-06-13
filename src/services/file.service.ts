import axios, { AxiosError } from 'axios';
import { apiUrl } from '../config/env';

export interface FileUploadResponse {
  message: string;
  filename?: string;
}

export interface FileInfo {
  id: string;
  name: string;
  filename: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

const FileService = {
  /**
   * Upload a file to the server
   * @param file - File to upload
   * @returns Promise with upload result message
   */
  uploadFile: async (file: File): Promise<string> => {
    try {
      if (!file) {
        throw new Error('No file provided');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle different response formats
      if (typeof response.data === 'string') {
        return response.data;
      }

      if (response.data.message) {
        return response.data.message;
      }

      return 'File uploaded successfully';
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          throw new Error(data || 'No file uploaded.');
        }
        if (status === 500) {
          throw new Error(data || 'File uploaded but failed to log history.');
        }
      }

      throw new Error('File upload failed. Please try again.');
    }
  },

  /**
   * Get all uploaded files
   * @returns Promise with array of file information
   */
  getAllFiles: async (): Promise<FileInfo[]> => {
    try {
      const response = await axios.get<{ success: boolean; data: FileInfo[] }>(
        `${apiUrl}/files`
      );

      if (!response.data.success) {
        throw new Error('Failed to fetch files');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          throw new Error(data.message || 'No files found.');
        }
        if (status === 500) {
          throw new Error('Failed to fetch files');
        }
      }

      throw new Error('Failed to fetch files');
    }
  },

  /**
   * Get specific file information
   * @param fileId - File ID or filename
   * @returns Promise with file information
   */
  getFileInfo: async (fileId: string): Promise<FileInfo> => {
    try {
      const response = await axios.get<{ success: boolean; data: FileInfo }>(
        `${apiUrl}/files/${encodeURIComponent(fileId)}`
      );

      if (!response.data.success) {
        throw new Error('File not found');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Error('File not found');
      }

      throw new Error('Failed to get file information');
    }
  },

  /**
   * Get the URL for accessing an uploaded file
   * @param filename - Name of the file
   * @returns URL string for the file
   */
  getFileUrl: (filename: string): string => {
    return `${apiUrl}/files/${encodeURIComponent(filename)}`;
  },

  /**
   * Download a file by filename
   * @param filename - Name of the file to download
   * @returns Promise with file blob
   */
  downloadFile: async (filename: string): Promise<Blob> => {
    try {
      const response = await axios.get(
        `${apiUrl}/files/${encodeURIComponent(filename)}`,
        {
          responseType: 'blob',
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Error('File not found');
      }

      throw new Error('Failed to download file');
    }
  },
};

export default FileService;
