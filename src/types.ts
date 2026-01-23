// types.ts
export interface IMedia {
  id: string;
  name: string;
  title: string | null;
  description: string | null;
  url: string;
  type: string;
  folder: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateMedia {
  name: string;
  title?: string | null;
  description?: string | null;
  url: string;
  type: string;
  folder: string;
}

export interface IUpdateMedia {
  name?: string;
  title?: string | null;
  description?: string | null;
}

// Upload result interface
export interface UploadResult {
  url: string;
  name: string;
}

// Callback types for decoupling
export interface MediaUploadHandlers {
  onUpload: (files: File[]) => Promise<UploadResult[]>;
  onSave?: (data: ICreateMedia[]) => Promise<IMedia[]>;
  onUploadSuccess?: (media: IMedia[]) => void;
  onUploadError?: (error: Error) => void;
}

export interface MediaGridHandlers {
  onImageSelect: (imageId: string) => void;
  onLoadImages: () => Promise<IMedia[]>;
}

export interface MediaDetailHandlers {
  onUpdate: (id: string, data: IUpdateMedia) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onNavigateBack: () => void;
}

export interface MediaTabsConfig {
  tabs: { value: string; label: string }[];
  activeTab: string;
  onTabChange: (value: string) => void;
}