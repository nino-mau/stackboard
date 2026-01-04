'use client';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from '@/components/ui/combobox';
import { TAG_COLORS } from '@/config/tag';
import { TagItem } from '@/types/tag';
import { getRandomItem, getUUID } from '@/utils/misc';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { ComboboxChipsInput, ComboboxContent } from '../combobox';
import { getTags } from '@/server/actions/tag';

type ProjectTagComboboxProps = {
  tags?: TagItem[];
};

// const tags: Array<TagItem> = [
//   {
//     id: 'tag1',
//     name: 'tag1',
//     color: getRandomItem<string>(TAG_COLORS)
//   },
//   {
//     id: 'tag2',
//     name: 'tag2',
//     color: getRandomItem<string>(TAG_COLORS)
//   },
//   {
//     id: 'tag3',
//     name: 'tag3',
//     color: getRandomItem<string>(TAG_COLORS)
//   },
//   {
//     id: 'tag4',
//     name: 'tag4',
//     color: getRandomItem<string>(TAG_COLORS)
//   },
//   { id: 'tag5', name: 'tag5', color: getRandomItem<string>(TAG_COLORS) }
// ];

export default function ProjectTagCombobox(props: ProjectTagComboboxProps) {
  /**
   * Value of the combobox input
   */
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Value of tags selected in the combobox
   */
  const [selectedTags, setSelectedTags] = useState<TagItem[]>([]);

  /**
   * Value of tags listed by combobox
   */
  const [tags, setTags] = useState<TagItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      // fetch tags to be listed
      const res = await getTags();
      setTags(res);
    }

    fetchData();
  }, []);

  /**
   * Determine when to show "create tag" option
   */
  const isCreateOptionShown = () => {
    // Check if the current input value isn't already used by a tag
    const isInputUnique = !tags.some((tag) => inputValue === tag.name);
    return inputValue !== '' && isInputUnique;
  };

  const items: TagItem[] = isCreateOptionShown()
    ? [
        ...tags,
        {
          isCreatable: true,
          id: getUUID(),
          name: inputValue,
          color: getRandomItem<string>(TAG_COLORS)
        }
      ]
    : tags;

  const anchor = useComboboxAnchor();

  return (
    <Combobox
      multiple
      autoHighlight
      items={items}
      value={selectedTags}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      onValueChange={(tags) => {
        const hasCreatable = tags.filter((tag) => tag.isCreatable);

        // Handle created tag
        if (hasCreatable.length) {
          const isCreatableIndex = tags.findIndex((tag) => tag.isCreatable);
          tags[isCreatableIndex].isCreatable = false;

          // Add created tag to the combobox listed tags
          setTags((prev) => [...prev, tags[isCreatableIndex]]);
        }
        setSelectedTags(tags);
      }}
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: TagItem[]) => (
            <React.Fragment>
              {values.map((value) => (
                <ComboboxChip key={value.id}>
                  <div
                    className="mr-1 size-2 rounded-full"
                    style={{ backgroundColor: value.color }}
                  />
                  {value.name}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Change or add tags..." />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: TagItem) =>
            item.isCreatable ? (
              <ComboboxItem key={item.id} value={item}>
                <span className="col-start-1">
                  <Icon icon="hugeicons:add-01" className="size-3" />
                </span>
                <div className="col-start-2">{item.name}</div>
              </ComboboxItem>
            ) : (
              <ComboboxItem key={item.id} value={item}>
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </ComboboxItem>
            )
          }
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
