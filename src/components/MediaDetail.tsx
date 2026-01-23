'use client';
import {
  ActionIcon,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Textarea,
  Title
} from "@mantine/core";
import { useState } from "react";
import { MdOutlineFileCopy } from "react-icons/md";
import { GrTrash } from "react-icons/gr";
import { IoCheckmark } from "react-icons/io5";
import defaultClasses from './styles/media-detail.module.scss';
import { cx } from '../utils/helpers';
import { MediaDetailProps } from './props/media-detail-props';

export type { MediaDetailClassNames, MediaDetailProps } from './props/media-detail-props';

export function MediaDetail({
  image,
  onUpdate,
  onDelete,
  onCopyLink,
  onNotify,
  classNames,
}: MediaDetailProps) {
  // Form state
  const [title, setTitle] = useState(image.title || '');
  const [description, setDescription] = useState(image.description || '');

  // Original values state (for dirty checking)
  const [originalTitle, setOriginalTitle] = useState(image.title || '');
  const [originalDescription, setOriginalDescription] = useState(image.description || '');

  // Dirty state - track if field has changed from original
  const isTitleDirty = title !== originalTitle;
  const isDescriptionDirty = description !== originalDescription;

  // Saving state for each field
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const [isSavingDescription, setIsSavingDescription] = useState(false);

  const handleSaveTitle = async () => {
    setIsSavingTitle(true);
    try {
      await onUpdate(image.id, { title: title || null });
      setOriginalTitle(title); // Update original to reset dirty state
      onNotify?.('success', 'Title saved');
    } catch (error) {
      onNotify?.('error', (error as Error).message);
    } finally {
      setIsSavingTitle(false);
    }
  };

  const handleSaveDescription = async () => {
    setIsSavingDescription(true);
    try {
      await onUpdate(image.id, { description: description || null });
      setOriginalDescription(description); // Update original to reset dirty state
      onNotify?.('success', 'Description saved');
    } catch (error) {
      onNotify?.('error', (error as Error).message);
    } finally {
      setIsSavingDescription(false);
    }
  };

  const handleCopyLink = async () => {
    if (onCopyLink) {
      onCopyLink(image.url);
    } else {
      try {
        await navigator.clipboard.writeText(image.url);
        onNotify?.('success', 'Link copied');
      } catch {
        onNotify?.('error', 'Failed to copy link');
      }
    }
  };

  return (
    <>
      <Paper
        p="md"
        radius="md"
        withBorder
        classNames={{
          root: cx(defaultClasses.paperRoot, classNames?.paper?.root)
        }}
      >
        <Stack gap="md">
          <Title 
            order={4}
            classNames={{
              root: cx(defaultClasses.titleRoot, classNames?.title?.root)
            }}
          >
            Image Details
          </Title>

          <div className={cx(defaultClasses.imageWrapper, classNames?.imageWrapper)}>
            <Image
              src={image.url}
              alt={image.title || image.name}
              fit="contain"
              radius="md"
              classNames={{
                root: cx(defaultClasses.imageRoot, classNames?.image?.root),
              }}
            />
          </div>

          <Stack 
            gap="xs"
            classNames={{
              root: cx(defaultClasses.fieldsStackRoot, classNames?.fieldsStack?.root)
            }}
          >
            {/* Name (readonly) */}
            <div className={cx(defaultClasses.fieldGroup, classNames?.fieldGroup)}>
              <Text 
                size="sm" 
                fw={500} 
                c="dimmed"
                classNames={{
                  root: cx(defaultClasses.fieldLabelRoot, classNames?.fieldLabel?.root)
                }}
              >
                Name
              </Text>
              <Text 
                classNames={{
                  root: cx(defaultClasses.fieldValueRoot, classNames?.fieldValue?.root)
                }}
              >
                {image.name}
              </Text>
            </div>

            {/* Title with inline save button */}
            <div className={cx(defaultClasses.fieldGroup, classNames?.fieldGroup)}>
              <Group gap={4} align="center">
                <Text 
                  size="sm" 
                  fw={500} 
                  c="dimmed"
                  classNames={{
                    root: cx(defaultClasses.fieldLabelRoot, classNames?.fieldLabel?.root)
                  }}
                >
                  Title
                </Text>
                {isTitleDirty && (
                  <ActionIcon
                    size="xs"
                    variant="filled"
                    color="green"
                    onClick={handleSaveTitle}
                    loading={isSavingTitle}
                    title="Save title"
                    classNames={{
                      root: cx(defaultClasses.saveButtonRoot, classNames?.saveButton?.root)
                    }}
                  >
                    <IoCheckmark size={12} />
                  </ActionIcon>
                )}
              </Group>
              <Textarea
                value={title}
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
                minRows={2}
                autosize
                classNames={{
                  root: cx(defaultClasses.textareaRoot, classNames?.textarea?.root),
                  input: cx(defaultClasses.textareaInput, classNames?.textarea?.input),
                  wrapper: cx(defaultClasses.textareaWrapper, classNames?.textarea?.wrapper),
                }}
              />
            </div>

            {/* Description with inline save button */}
            <div className={cx(defaultClasses.fieldGroup, classNames?.fieldGroup)}>
              <Group gap={4} align="center">
                <Text 
                  size="sm" 
                  fw={500} 
                  c="dimmed"
                  classNames={{
                    root: cx(defaultClasses.fieldLabelRoot, classNames?.fieldLabel?.root)
                  }}
                >
                  Description
                </Text>
                {isDescriptionDirty && (
                  <ActionIcon
                    size="xs"
                    variant="filled"
                    color="green"
                    onClick={handleSaveDescription}
                    loading={isSavingDescription}
                    title="Save description"
                    classNames={{
                      root: cx(defaultClasses.saveButtonRoot, classNames?.saveButton?.root)
                    }}
                  >
                    <IoCheckmark size={12} />
                  </ActionIcon>
                )}
              </Group>
              <Textarea
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
                minRows={3}
                autosize
                classNames={{
                  root: cx(defaultClasses.textareaRoot, classNames?.textarea?.root),
                  input: cx(defaultClasses.textareaInput, classNames?.textarea?.input),
                  wrapper: cx(defaultClasses.textareaWrapper, classNames?.textarea?.wrapper),
                }}
              />
            </div>

            {/* Type (readonly) */}
            <div className={cx(defaultClasses.fieldGroup, classNames?.fieldGroup)}>
              <Text 
                size="sm" 
                fw={500} 
                c="dimmed"
                classNames={{
                  root: cx(defaultClasses.fieldLabelRoot, classNames?.fieldLabel?.root)
                }}
              >
                Type
              </Text>
              <Text 
                classNames={{
                  root: cx(defaultClasses.fieldValueRoot, classNames?.fieldValue?.root)
                }}
              >
                {image.type}
              </Text>
            </div>

            {/* URL with copy button */}
            <div className={cx(defaultClasses.fieldGroup, classNames?.fieldGroup)}>
              <Text 
                size="sm" 
                fw={500} 
                c="dimmed"
                classNames={{
                  root: cx(defaultClasses.fieldLabelRoot, classNames?.fieldLabel?.root)
                }}
              >
                URL
              </Text>
              <Group gap="xs" align="center" wrap="nowrap">
                <Text
                  size="xs"
                  c="dimmed"
                  classNames={{
                    root: cx(defaultClasses.urlText, classNames?.urlText)
                  }}
                >
                  {image.url}
                </Text>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={handleCopyLink}
                  size="sm"
                  classNames={{
                    root: cx(defaultClasses.copyButtonRoot, classNames?.copyButton?.root)
                  }}
                >
                  <MdOutlineFileCopy size={18} />
                </ActionIcon>
              </Group>
            </div>

            {/* Timestamps */}
            <div className={cx(defaultClasses.fieldGroup, classNames?.fieldGroup)}>
              <Text 
                size="sm" 
                fw={500} 
                c="dimmed"
                classNames={{
                  root: cx(defaultClasses.fieldLabelRoot, classNames?.fieldLabel?.root)
                }}
              >
                Created At
              </Text>
              <Text 
                size="sm"
                classNames={{
                  root: cx(defaultClasses.fieldValueRoot, classNames?.fieldValue?.root)
                }}
              >
                {new Date(image.createdAt).toLocaleString()}
              </Text>
            </div>
            <div className={cx(defaultClasses.fieldGroup, classNames?.fieldGroup)}>
              <Text 
                size="sm" 
                fw={500} 
                c="dimmed"
                classNames={{
                  root: cx(defaultClasses.fieldLabelRoot, classNames?.fieldLabel?.root)
                }}
              >
                Updated At
              </Text>
              <Text 
                size="sm"
                classNames={{
                  root: cx(defaultClasses.fieldValueRoot, classNames?.fieldValue?.root)
                }}
              >
                {new Date(image.updatedAt).toLocaleString()}
              </Text>
            </div>
          </Stack>
        </Stack>

        {/* Delete button */}
        {onDelete && (
          <ActionIcon
            variant="filled"
            color="red"
            size="lg"
            onClick={() => onDelete(image.id)}
            classNames={{
              root: cx(defaultClasses.deleteButtonRoot, classNames?.deleteButton?.root)
            }}
          >
            <GrTrash size={20} />
          </ActionIcon>
        )}
      </Paper>
    </>
  );
}