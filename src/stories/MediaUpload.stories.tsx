import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MediaUpload } from '../components/MediaUpload';

const meta = {
  title: 'Components/MediaUpload',
  component: MediaUpload,
  tags: ['autodocs'],
  args: {
    onUpload: async (files) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
    },
    onSave: fn(),
    onUploadSuccess: fn(),
    onUploadError: fn(),
  },
} satisfies Meta<typeof MediaUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SingleFileOnly: Story = {
  args: {
    multiple: false,
    maxSize: 1024 * 1024, // 1MB
  },
};
