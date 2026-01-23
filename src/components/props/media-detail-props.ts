import { IMedia, IUpdateMedia } from '../../types';

// ClassNames interface for style overrides
export interface MediaDetailClassNames {
  // Mantine components - object with options
  paper?: {
    root?: string;
  };
  image?: {
    root?: string;
  };
  title?: {
    root?: string;
  };
  fieldsStack?: {
    root?: string;
  };
  fieldLabel?: {
    root?: string;
  };
  fieldValue?: {
    root?: string;
  };
  textarea?: {
    root?: string;
    input?: string;
    wrapper?: string;
  };
  saveButton?: {
    root?: string;
  };
  copyButton?: {
    root?: string;
  };
  deleteButton?: {
    root?: string;
  };
  
  // Native HTML - string directly
  imageWrapper?: string;
  fieldGroup?: string;
  urlText?: string;
}

export interface MediaDetailProps {
  image: IMedia;
  onUpdate: (id: string, data: IUpdateMedia) => Promise<void>;
  onDelete?: (id: string) => void;
  onCopyLink?: (url: string) => void;
  onNotify?: (type: 'success' | 'error', message: string) => void;
  classNames?: MediaDetailClassNames;
}
