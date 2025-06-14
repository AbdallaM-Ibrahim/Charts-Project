export interface SelectedFile {
  id: string;
  name: string;
  filename: string;
  size: number;
  type: string;
}

export interface FileContextType {
  selectedFiles: SelectedFile[];
  addSelectedFile: (file: SelectedFile) => void;
  removeSelectedFile: (fileId: string) => void;
  clearSelectedFiles: () => void;
}
