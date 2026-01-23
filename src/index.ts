// index.ts
// Components
export { MediaUpload } from './components/MediaUpload';
export { MediaGrid } from './components/MediaGrid';
export { MediaDetail } from './components/MediaDetail';

// Types
export type {
  IMedia,
  ICreateMedia,
  IUpdateMedia,
  UploadResult,
  MediaUploadHandlers,
  MediaGridHandlers,
  MediaDetailHandlers,
  MediaTabsConfig,
} from './types';

// Component Props & ClassNames types
export type { MediaUploadProps, UploadFileItem, MediaUploadClassNames } from './components/MediaUpload';
export type { MediaGridProps, MediaGridClassNames } from './components/MediaGrid';
export type { MediaDetailProps, MediaDetailClassNames } from './components/MediaDetail';

// Utils
export { validateImageFile, formatFileSize, cx } from './utils/helpers';