'use client';
import { Grid, GridCol, Group, Image, Paper, Stack, Text, TextInput, Select } from "@mantine/core";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import defaultClasses from './styles/media-grid.module.scss';
import { MediaGridProps } from './props/media-grid-props';
import { cx } from '../utils/helpers';

export function MediaGrid({
  images,
  selectedImageId = null,
  onImageClick,
  sortOptions = [
    { value: 'createdAt', label: 'By created date' },
    { value: 'updatedAt', label: 'By updated date' },
    { value: 'title', label: 'By title' },
  ],
  classNames,
}: MediaGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string | null>('createdAt');

  const filteredAndSortedImages = () => {
    let result = [...images];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((image) =>
        image.title?.toLowerCase().includes(query)
      );
    }
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'createdAt':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'updatedAt':
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          case 'title':
            return (a.title ?? '').localeCompare(b.title ?? '');
          default:
            return 0;
        }
      });
    }
    return result;
  };

  return (
    <Stack 
      gap="md"
      classNames={{
        root: classNames?.rootStack?.root
      }}
    >
      <Group 
        justify="space-between" 
        align="center"
        classNames={{
          root: classNames?.filterGroup?.root
        }}
      >
        <Select
          placeholder="Sort by"
          value={sortBy}
          onChange={setSortBy}
          data={sortOptions}
          w={200}
          clearable={false}
          classNames={classNames?.sortSelect}
        />
        <TextInput
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          leftSection={<IoSearch size={16} />}
          w={250}
          classNames={classNames?.searchInput}
        />
      </Group>

      <Grid 
        gutter="md"
        classNames={classNames?.grid}
      >
        {filteredAndSortedImages().map((image) => {
          const isSelected = selectedImageId === image.id;
          return (
            <GridCol key={image.id} span={{ base: 6, sm: 4, md: 3, lg: 2 }}>
              <Paper
                p="xs"
                withBorder
                radius="md"
                onClick={() => onImageClick(image.id)}
                classNames={{
                  root: cx(
                    defaultClasses.itemPaperRoot,
                    classNames?.itemPaper?.root,
                    isSelected ? defaultClasses.selectedPaper : undefined,
                    isSelected ? classNames?.selectedPaper : undefined
                  )
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
                      src={image.url}
                      alt={image.title || image.name}
                      fit="cover"
                      classNames={{
                        root: cx(defaultClasses.itemImageRoot, classNames?.itemImage?.root)
                      }}
                    />
                  </div>
                  <Text 
                    size="xs" 
                    c="dimmed" 
                    lineClamp={1}
                    title={image.title ?? image.name}
                    classNames={{
                      root: cx(defaultClasses.itemTextRoot, classNames?.itemText?.root)
                    }}
                  >
                    {image.title ?? image.name}
                  </Text>
                </Stack>
              </Paper>
            </GridCol>
          );
        })}
      </Grid>
    </Stack>
  );
}