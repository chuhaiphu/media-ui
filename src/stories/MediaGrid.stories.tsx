import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MediaGrid } from '../components/MediaGrid';
import { IMedia } from '../types';

const meta = {
  title: 'Components/MediaGrid',
  component: MediaGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onImageClick: fn(),
  },
} satisfies Meta<typeof MediaGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockImages: IMedia[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `${i}`,
  name: `image-${i}.jpg`,
  title: i % 3 === 0 ? `Image Title ${i}` : null,
  description: `Description for image ${i}`,
  url: `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${(i % 10) + 1}.png`,
  type: 'image/jpeg',
  folder: 'gallery',
  createdAt: new Date(2024, 0, i + 1),
  updatedAt: new Date(2024, 0, i + 1),
}));

export const Default: Story = {
  args: {
    images: mockImages,
  },
};

export const WithSelection: Story = {
  args: {
    images: mockImages,
    selectedImageId: '2',
  },
};

export const Empty: Story = {
  args: {
    images: [],
  },
};
