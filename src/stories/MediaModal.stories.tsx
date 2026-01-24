import type { Meta, StoryObj } from '@storybook/react';
import { MediaModal } from '../components/MediaModal';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IMedia } from '../types';

// Mock data
const mockImages: IMedia[] = Array.from({ length: 12 }).map((_, index) => ({
  id: `img-${index}`,
  name: `Image ${index + 1}.jpg`,
  title: `Beautiful Landscape ${index + 1}`,
  description: 'A sample description for the image',
  url: `https://picsum.photos/seed/${index}/400/400`, // Random images
  type: 'image/jpeg',
  folder: 'media',
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const meta: Meta<typeof MediaModal> = {
  title: 'Components/MediaModal',
  component: MediaModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MediaModal>;

// Wrapper component để quản lý state đóng/mở modal
const ModalWrapper = (args: any) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>Open Media Library</Button>
      <MediaModal
        {...args}
        opened={opened}
        onClose={close}
        onSelect={(image) => {
          console.log('Selected image:', image);
          args.onSelect?.(image);
          close();
        }}
        onUpload={async (files) => {
          // Mock upload delay
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return files.map((file) => ({
            url: URL.createObjectURL(file),
            name: file.name,
          }));
        }}
        onSave={async (data) => {
          // Mock save delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return data.map((item, index) => ({
            ...item,
            id: `new-${Date.now()}-${index}`,
            title: item.title || null,
            description: item.description || null,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    images: mockImages,
    title: 'Select an Image',
    submitLabel: 'Insert Image',
  },
};

export const Empty: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    images: [], // Không có ảnh
    title: 'Media Library (Empty)',
  },
};

export const CustomLabels: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    images: mockImages,
    title: 'Chọn ảnh đại diện',
    submitLabel: 'Xác nhận',
    cancelLabel: 'Đóng',
  },
};