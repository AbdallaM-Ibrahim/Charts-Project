export interface SelectedFile {
  id: string;
  name: string;
  filename: string;
  size: number;
  type: string;
}

export interface FileContextType {
  selectedFile: SelectedFile | null;
  setSelectedFile: (file: SelectedFile | null) => void;
  isFileSelected: (fileId: string) => boolean;
}
