export interface FileIconConfig {
  bgColor: string;
  iconPath: string;
}

export const getFileIconConfig = (type: string): FileIconConfig => {
  const normalizedType = type.toLowerCase();

  // CSV files
  if (normalizedType.includes('csv') || normalizedType.includes('text/csv')) {
    return {
      bgColor: 'bg-green-500',
      iconPath: '/assets/file-icons/csv.svg',
    };
  }

  // Excel files
  if (
    normalizedType.includes('excel') ||
    normalizedType.includes('spreadsheet') ||
    normalizedType.includes('xlsx') ||
    normalizedType.includes('xls') ||
    normalizedType.includes('application/vnd.ms-excel') ||
    normalizedType.includes(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
  ) {
    return {
      bgColor: 'bg-green-600',
      iconPath: '/assets/file-icons/excel.svg',
    };
  }

  // JSON files
  if (
    normalizedType.includes('json') ||
    normalizedType.includes('application/json')
  ) {
    return {
      bgColor: 'bg-yellow-500',
      iconPath: '/assets/file-icons/json.svg',
    };
  }

  // PDF files
  if (
    normalizedType.includes('pdf') ||
    normalizedType.includes('application/pdf')
  ) {
    return {
      bgColor: 'bg-red-500',
      iconPath: '/assets/file-icons/pdf.svg',
    };
  }

  // Image files
  if (normalizedType.includes('image')) {
    return {
      bgColor: 'bg-purple-500',
      iconPath: '/assets/file-icons/image.svg',
    };
  }

  // Word documents
  if (
    normalizedType.includes('word') ||
    normalizedType.includes('doc') ||
    normalizedType.includes('application/msword') ||
    normalizedType.includes(
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
  ) {
    return {
      bgColor: 'bg-blue-500',
      iconPath: '/assets/file-icons/word.svg',
    };
  }

  // Text files
  if (normalizedType.includes('txt') || normalizedType.includes('text/plain')) {
    return {
      bgColor: 'bg-gray-500',
      iconPath: '/assets/file-icons/txt.svg',
    };
  }

  // Archive files
  if (
    normalizedType.includes('zip') ||
    normalizedType.includes('rar') ||
    normalizedType.includes('archive') ||
    normalizedType.includes('application/zip') ||
    normalizedType.includes('application/x-rar')
  ) {
    return {
      bgColor: 'bg-orange-500',
      iconPath: '/assets/file-icons/zip.svg',
    };
  }

  // PowerPoint files
  if (
    normalizedType.includes('powerpoint') ||
    normalizedType.includes('ppt') ||
    normalizedType.includes('application/vnd.ms-powerpoint') ||
    normalizedType.includes(
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    )
  ) {
    return {
      bgColor: 'bg-red-600',
      iconPath: '/assets/file-icons/ppt.svg',
    };
  }

  // Default file icon
  return {
    bgColor: 'bg-gray-500',
    iconPath: '/assets/file-icons/default.svg',
  };
};
