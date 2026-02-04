import { IMedia, MediaUploadHandlers } from '../../types';

export interface MediaModalClassNames {
  tabs?: {
    root?: string;
    list?: string;
    panel?: string;
    tab?: string;
  };
  footer?: {
    root?: string;
  };
}

export interface MediaModalProps extends MediaUploadHandlers {
  opened: boolean;
  onClose: () => void;

  images: IMedia[];
  onSelect: (image: IMedia) => void;

  title?: string;
  submitLabel?: string;
  cancelLabel?: string;

  classNames?: MediaModalClassNames;
}