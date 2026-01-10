import { Add01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox';
import { TAG_COLORS } from '@/config/tag';
import { tagsQueryOptions } from '@/server/queries/tags';
import type { TagItem } from '@/types/tag';
import { getRandomItem, getUUID } from '@/utils/misc';
import { ComboboxChipsInput, ComboboxContent } from '../combobox';

type ProjectTagComboboxProps = {
  value?: TagItem[];
  onChange?: (tags: TagItem[]) => void;
  name?: string;
  id?: string;
};

export default function ProjectTagCombobox(props: ProjectTagComboboxProps) {
  /**
   * Value of the combobox input
   */
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Created tags listed by combobox
   */
  const [createdTags, setCreatedTags] = useState<TagItem[]>([]);

  /**
   * Determine when to show "create tag" option
   */
  const isCreateOptionShown = () => {
    // Check if the current input value isn't already used by a tag
    const isInputUnique = !tags.some((tag) => inputValue === tag.name);
    return inputValue !== '' && isInputUnique;
  };

  // Fetch tags
  const { data: fetchedTags } = useQuery(tagsQueryOptions());

  const tags = [...(fetchedTags ?? []), ...createdTags];

  const tagItems: TagItem[] = isCreateOptionShown()
    ? [
        ...tags,
        {
          isCreatable: true,
          id: getUUID(),
          name: inputValue,
          color: getRandomItem<string>(TAG_COLORS),
        },
      ]
    : tags;

  const anchor = useComboboxAnchor();

  return (
    <Combobox
      multiple
      autoHighlight
      id={props.id}
      name={props.name}
      value={props.value}
      items={tagItems}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      onValueChange={(tags) => {
        const hasCreatable = tags.filter((tag) => tag.isCreatable);

        // Handle created tag
        if (hasCreatable.length) {
          const isCreatableIndex = tags.findIndex((tag) => tag.isCreatable);
          tags[isCreatableIndex].isCreatable = undefined;

          setCreatedTags((prev) => [...prev, tags[isCreatableIndex]]);
        }
        props.onChange?.(tags);
      }}
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: TagItem[]) => (
            <React.Fragment>
              {values.map((value) => (
                <ComboboxChip key={value.id}>
                  <div
                    className="mr-1 flex size-2 flex-5 rounded-full"
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
                  <HugeiconsIcon icon={Add01Icon} className="size-3" />
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
