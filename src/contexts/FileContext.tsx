import type React from 'react';
import { createContext, useState, type ReactNode } from 'react';
import type { SelectedFile, FileContextType } from '../types/fileContext';

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export const FileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedFile, setSelectedFileState] = useState<SelectedFile | null>(
    null
  );

  const setSelectedFile = (file: SelectedFile | null) => {
    setSelectedFileState(file);
  };

  const isFileSelected = (fileId: string) => {
    return selectedFile?.id === fileId;
  };

  return (
    <FileContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        isFileSelected,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
