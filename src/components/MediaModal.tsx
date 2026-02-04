'use client';

import { Modal, Tabs, Button, Stack, Text, Flex } from '@mantine/core';
import { useState, useEffect } from 'react';
import { MediaGrid } from './MediaGrid';
import { MediaUpload } from './MediaUpload';
import defaultClasses from './styles/media-modal.module.scss';
import { cx } from '../utils/helpers';
import { IMedia } from '../types';
import { MediaModalProps } from './props/media-modal-props';

export function MediaModal({
  opened,
  onClose,
  images,
  onSelect,
  title = "Media Library",
  submitLabel = "Select",
  cancelLabel = "Cancel",
  onUpload,
  onSave,
  onUploadSuccess,
  onUploadError,
  classNames,
}: MediaModalProps) {
  const [activeTab, setActiveTab] = useState<string | null>('library');
  const [selectedImage, setSelectedImage] = useState<IMedia | null>(null);

  // Reset selection when modal opens/closes
  useEffect(() => {
    if (opened) {
      setSelectedImage(null);
      setActiveTab('library');
    }
  }, [opened]);

  const handleImageClick = (id: string) => {
    const image = images.find((img) => img.id === id);
    if (image) {
      setSelectedImage(image);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onSelect(selectedImage);
      onClose();
    }
  };

  const handleInternalUploadSuccess = (media: IMedia[]) => {
    if (onUploadSuccess) {
      onUploadSuccess(media);
    }
    setActiveTab('library');
    if (media.length > 0) {
      setSelectedImage(media[0]);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size={'60vw'}
      styles={{
        body: {
          paddingBottom: 0
        }
      }}
    >
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        classNames={classNames?.tabs}
      >
        <Tabs.List>
          <Tabs.Tab value="library">Library</Tabs.Tab>
          <Tabs.Tab value="upload">Upload</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="library" className={cx(defaultClasses.tabPanel, classNames?.tabs?.panel)}>
          {images.length === 0 ? (
            <Stack align="center" justify="center" h={300}>
              <Text c="dimmed">No images found</Text>
              <Button variant="light" onClick={() => setActiveTab('upload')}>
                Upload new image
              </Button>
            </Stack>
          ) : (
            <MediaGrid
              images={images}
              selectedImageId={selectedImage?.id}
              onImageClick={handleImageClick}
            />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="upload" className={cx(defaultClasses.tabPanel, classNames?.tabs?.panel)}>
          <MediaUpload
            onUpload={onUpload}
            onSave={onSave}
            onUploadSuccess={handleInternalUploadSuccess}
            onUploadError={onUploadError}
            folder="media"
            multiple={true}
          />
        </Tabs.Panel>
      </Tabs>

      <Flex className={cx(defaultClasses.footer, classNames?.footer?.root)} justify="flex-end" gap="sm">
        <Button variant="default" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!selectedImage}
        >
          {submitLabel}
        </Button>
      </Flex>
    </Modal>
  );
}