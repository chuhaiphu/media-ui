// MediaUpload.tsx
'use client';
import '@mantine/dropzone/styles.css';
import { Group, Text, Loader, Stack, Paper, Image, Grid, GridCol, UnstyledButton } from "@mantine/core";
import { Dropzone, DropzoneAccept, DropzoneIdle, DropzoneReject, FileRejection } from '@mantine/dropzone';
import { TbUpload, TbPhoto } from "react-icons/tb";
import { HiOutlineX } from "react-icons/hi";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { IMedia, UploadResult, ICreateMedia } from '../types';
import { validateImageFile, formatFileSize, cx } from '../utils/helpers';
import defaultClasses from './styles/media-upload.module.scss';
import { MediaUploadProps, UploadFileItem } from './props/media-upload-props';

export type { MediaUploadProps, UploadFileItem, MediaUploadClassNames } from './props/media-upload-props';

export function MediaUpload({
  onUpload,
  onSave,
  onUploadSuccess,
  onUploadError,
  maxSize = 2 * 1024 ** 2,
  acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg'],
  multiple = true,
  folder = 'media',
  classNames,
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFileItem[]>([]);

  const handleDrop = async (files: File[]) => {
    if (files.length === 0) return;

    const invalidFiles = files.filter(file => !validateImageFile(file));
    if (invalidFiles.length > 0) {
      notifications.show({
        title: 'Invalid file type',
        message: `${invalidFiles.length} file(s) have invalid type.`,
        color: 'red',
      });
      return;
    }

    setIsUploading(true);

    const newUploadFiles: UploadFileItem[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading',
    }));

    setUploadFiles((prev) => [...newUploadFiles, ...prev]);

    try {
      // 1. Call external upload handler (Cloudinary, S3, etc.)
      const uploadResults = await onUpload(files);

      // Update status
      setUploadFiles((prev) =>
        prev.map((item) => {
          const idx = newUploadFiles.findIndex((f) => f.id === item.id);
          if (idx !== -1 && uploadResults[idx]) {
            return { ...item, status: 'success', url: uploadResults[idx].url };
          }
          return item;
        })
      );

      // 2. Save to database if handler provided
      if (onSave) {
        const mediaData: ICreateMedia[] = uploadResults.map((result) => ({
          name: result.name,
          title: null,
          description: null,
          url: result.url,
          type: 'image',
          folder,
        }));

        const savedMedia = await onSave(mediaData);
        onUploadSuccess?.(savedMedia);
      }

      notifications.show({
        title: 'Upload successful',
        message: `Successfully uploaded ${uploadResults.length} image(s)`,
        color: 'green',
      });
    } catch (error) {
      setUploadFiles((prev) =>
        prev.map((item) =>
          newUploadFiles.some((f) => f.id === item.id)
            ? { ...item, status: 'error', error: (error as Error).message }
            : item
        )
      );
      onUploadError?.(error as Error);
      notifications.show({
        title: 'Upload failed',
        message: (error as Error).message,
        color: 'red',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleReject = (files: FileRejection[]) => {
    notifications.show({
      title: 'Files rejected',
      message: `${files.length} file(s) were rejected. Please check file type and size (≤ 2MB).`,
      color: 'red',
    });
  };

  // Cleanup preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      uploadFiles.forEach((item) => {
        if (item.preview.startsWith('blob:')) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, [uploadFiles]);

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      notifications.show({
        title: 'Link copied',
        message: 'Image URL has been copied to clipboard',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Copy failed',
        message: error instanceof Error ? error.message : 'Failed to copy link to clipboard',
        color: 'red',
      });
    }
  };

  return (
    <Stack 
      gap="lg"
      classNames={{
        root: classNames?.rootStack?.root
      }}
    >
      <Dropzone
        onDrop={handleDrop}
        onReject={handleReject}
        maxSize={maxSize}
        accept={acceptedTypes}
        disabled={isUploading}
        multiple={multiple}
        classNames={classNames?.dropzone}
      >
        <Group 
          justify="center" 
          gap="xl" 
          mih={220}
          classNames={{
            root: classNames?.dropzoneGroup?.root
          }}
        >
          {isUploading ? (
            <Loader size={52} />
          ) : (
            <>
              <DropzoneAccept>
                <TbUpload size={52} color="blue" />
              </DropzoneAccept>
              <DropzoneReject>
                <HiOutlineX size={52} color="red" />
              </DropzoneReject>
              <DropzoneIdle>
                <TbPhoto size={52} />
              </DropzoneIdle>
            </>
          )}

          <div>
            <Text 
              size="xl" 
              inline
              classNames={{
                root: classNames?.dropzoneText?.root
              }}
            >
              Drag images here or click to select files
            </Text>
            <Text 
              size="sm" 
              c="dimmed" 
              inline 
              mt={7}
              classNames={{
                root: classNames?.dropzoneSubtext?.root
              }}
            >
              (png, jpg, jpeg; Size ≤ 2M)
            </Text>
          </div>
        </Group>
      </Dropzone>
      {uploadFiles.length > 0 && (
        <Stack 
          gap='xs'
          classNames={{
            root: classNames?.recentStack?.root
          }}
        >
          <Text 
            fw={500}
            classNames={{
              root: cx(defaultClasses.sectionTitleRoot, classNames?.sectionTitle?.root)
            }}
          >
            Recently Uploaded Images
          </Text>
          <Grid classNames={classNames?.grid}>
            {uploadFiles.map((item) => (
              <GridCol key={item.id} span={{ base: 6, sm: 6, md: 3, lg: 2 }}>
                <Paper 
                  p="sm" 
                  withBorder 
                  radius="md"
                  classNames={{
                    root: classNames?.itemPaper?.root
                  }}
                >
                  <Stack 
                    gap={6}
                    classNames={{
                      root: classNames?.itemStack?.root
                    }}
                  >
                    <div className={cx(defaultClasses.imageContainer, classNames?.imageContainer)}>
                      <Image
                        src={item.preview}
                        alt={item.file.name}
                        fit="cover"
                        classNames={{
                          root: cx(defaultClasses.itemImageRoot, classNames?.itemImage?.root)
                        }}
                      />
                      {item.status === 'uploading' && (
                        <div className={cx(defaultClasses.uploadingOverlay, classNames?.uploadingOverlay)}>
                          <Loader size="sm" color="white" />
                        </div>
                      )}
                      {item.status === 'success' && (
                        <div className={cx(
                          defaultClasses.statusBadge, 
                          defaultClasses.statusBadgeSuccess,
                          classNames?.statusBadge,
                          classNames?.statusBadgeSuccess
                        )}>
                          <Text size="xs" c="white" fw={700}>
                            ✓
                          </Text>
                        </div>
                      )}
                      {item.status === 'error' && (
                        <div className={cx(
                          defaultClasses.statusBadge,
                          defaultClasses.statusBadgeError,
                          classNames?.statusBadge,
                          classNames?.statusBadgeError
                        )}>
                          <HiOutlineX size={16} color="white" />
                        </div>
                      )}
                    </div>
                    <Text 
                      size="xs" 
                      c="dimmed" 
                      lineClamp={1} 
                      title={item.file.name}
                      classNames={{
                        root: classNames?.itemFilename?.root
                      }}
                    >
                      {item.file.name}
                    </Text>
                    <Group 
                      justify="space-between" 
                      align="end" 
                      gap="xs"
                      classNames={{
                        root: classNames?.itemGroup?.root
                      }}
                    >
                      <Text 
                        size="xs" 
                        c="dimmed"
                        classNames={{
                          root: classNames?.itemFilesize?.root
                        }}
                      >
                        {formatFileSize(item.file.size)}
                      </Text>
                      {item.status === 'success' && item.url && (
                        <UnstyledButton
                          onClick={() => handleCopyLink(item.url!)}
                          classNames={{
                            root: cx(defaultClasses.copyButtonRoot, classNames?.copyButton?.root)
                          }}
                        >
                          <Text 
                            size="sm" 
                            c="blue"
                            classNames={{
                              root: classNames?.copyButtonText?.root
                            }}
                          >
                            Copy link
                          </Text>
                        </UnstyledButton>
                      )}
                    </Group>
                    {item.status === 'error' && (
                      <Text 
                        size="xs" 
                        c="red"
                        classNames={{
                          root: classNames?.itemError?.root
                        }}
                      >
                        {item.error || 'Upload failed'}
                      </Text>
                    )}
                  </Stack>
                </Paper>
              </GridCol>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}