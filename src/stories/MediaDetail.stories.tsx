import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MediaDetail } from '../components/MediaDetail';
import { IMedia } from '../types';

const meta = {
  title: 'Components/MediaDetail',
  component: MediaDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onUpdate: fn(),
    onDelete: fn(),
    onCopyLink: fn(),
    onNotify: fn(),
  },
} satisfies Meta<typeof MediaDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockImage: IMedia = {
  id: '1',
  name: 'mountain-view.jpg',
  title: 'Mountain View',
  description: 'A beautiful view of the mountains during sunset.',
  url: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
  type: 'image/jpeg',
  folder: 'nature',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-02'),
};

export const Default: Story = {
  args: {
    image: mockImage,
  },
};

export const WithoutTitleAndDesc: Story = {
  args: {
    image: {
      ...mockImage,
      title: null,
      description: null,
    },
  },
};
