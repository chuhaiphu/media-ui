import { MediaUploadHandlers } from '../../types';

export interface UploadFileItem {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

// ClassNames interface for style overrides
export interface MediaUploadClassNames {
  // Mantine components - object with options
  rootStack?: {
    root?: string;
  };
  dropzone?: {
    root?: string;
    inner?: string;
  };
  dropzoneGroup?: {
    root?: string;
  };
  dropzoneText?: {
    root?: string;
  };
  dropzoneSubtext?: {
    root?: string;
  };
  recentStack?: {
    root?: string;
  };
  sectionTitle?: {
    root?: string;
  };
  grid?: {
    root?: string;
    inner?: string;
    col?: string;
  };
  itemPaper?: {
    root?: string;
  };
  itemStack?: {
    root?: string;
  };
  itemImage?: {
    root?: string;
  };
  itemFilename?: {
    root?: string;
  };
  itemFilesize?: {
    root?: string;
  };
  itemError?: {
    root?: string;
  };
  itemGroup?: {
    root?: string;
  };
  copyButton?: {
    root?: string;
  };
  copyButtonText?: {
    root?: string;
  };
  
  // Native HTML - string directly
  imageContainer?: string;
  uploadingOverlay?: string;
  statusBadge?: string;
  statusBadgeSuccess?: string;
  statusBadgeError?: string;
}

export interface MediaUploadProps extends MediaUploadHandlers {
  maxSize?: number;
  acceptedTypes?: string[];
  multiple?: boolean;
  folder?: string;
  classNames?: MediaUploadClassNames;
}
