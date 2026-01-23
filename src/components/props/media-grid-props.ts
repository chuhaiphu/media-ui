import { IMedia } from '../../types';

// ClassNames interface for style overrides
export interface MediaGridClassNames {
  // Mantine components - object with options
  rootStack?: {
    root?: string;
  };
  filterGroup?: {
    root?: string;
  };
  sortSelect?: {
    root?: string;
    wrapper?: string;
    input?: string;
    section?: string;
    dropdown?: string;
  };
  searchInput?: {
    root?: string;
    wrapper?: string;
    input?: string;
    section?: string;
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
  itemText?: {
    root?: string;
  };
  
  // Native HTML - string directly
  imageContainer?: string;
  
  // Special modifiers (applied conditionally)
  selectedPaper?: string;
}

export interface MediaGridProps {
  images: IMedia[];
  selectedImageId?: string | null;
  onImageClick: (imageId: string) => void;
  sortOptions?: { value: string; label: string }[];
  classNames?: MediaGridClassNames;
}
