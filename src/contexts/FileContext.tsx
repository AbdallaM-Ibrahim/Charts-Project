import type React from 'react';
import {
  createContext,
  useState,
  type ReactNode,
} from 'react';
import type { SelectedFile, FileContextType } from '../types/fileContext';

export const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  const addSelectedFile = (file: SelectedFile) => {
    setSelectedFiles((prev) => {
      if (prev.find((f) => f.id === file.id)) return prev;
      return [file];
    });
  };

  const removeSelectedFile = (fileId: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const clearSelectedFiles = () => {
    setSelectedFiles([]);
  };

  return (
    <FileContext.Provider
      value={{
        selectedFiles,
        addSelectedFile,
        removeSelectedFile,
        clearSelectedFiles,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
