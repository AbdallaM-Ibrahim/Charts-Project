import axios, { AxiosError } from 'axios';
import { apiUrl } from '../config/env';

export interface FileUploadResponse {
  message: string;
  filename?: string;
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

      return response.data;
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
   * Get the URL for accessing an uploaded file
   * @param filename - Name of the file
   * @returns URL string for the file
   */
  getFileUrl: (filename: string): string => {
    return `${apiUrl}/uploads/${encodeURIComponent(filename)}`;
  },

  /**
   * Download a file by filename
   * @param filename - Name of the file to download
   * @returns Promise with file blob
   */
  downloadFile: async (filename: string): Promise<Blob> => {
    try {
      const response = await axios.get(
        `${apiUrl}/uploads/${encodeURIComponent(filename)}`,
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
