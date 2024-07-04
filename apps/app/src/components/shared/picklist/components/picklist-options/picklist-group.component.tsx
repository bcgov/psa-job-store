import { Checkbox, Collapse, List, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { PicklistItem, PicklistItemProps } from './picklist-item.component';

const { Text } = Typography;

export interface PicklistGroupProps {
  type: 'group';
  items: PicklistItemProps[];
  text: string;
}

export const PicklistGroup = ({
  setChecked,
  items,
  selectedOptions,
  text,
}: Omit<PicklistGroupProps, 'type'> & {
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOptions: string[];
}) => {
  const isIndeterminate = useMemo(() => {
    const filtered = items.map((item) => item.value);

    if (filtered.length === 0) {
      return false;
    } else if (filtered.every((id) => selectedOptions.includes(id))) {
      return false;
    } else {
      return filtered.some((value) => selectedOptions.includes(value));
    }
  }, [items, selectedOptions]);
  const isChecked = useMemo(
    () => items.map((item) => item.value).every((value) => selectedOptions.includes(value)),
    [items, selectedOptions],
  );

  useEffect(() => {
    if (text === 'Thompson RHB') {
      console.log('isIndeterminate: ', isIndeterminate);
      console.log('isChecked: ', isChecked);
    }
  }, [isChecked, isIndeterminate, text]);

  return (
    <>
      <Collapse
        items={[
          {
            key: 0,
            label: text,
            children: (
              <List
                dataSource={items}
                itemLayout="horizontal"
                renderItem={(item) => (
                  <PicklistItem
                    onChange={(checkedValues) => {
                      setChecked(checkedValues);
                    }}
                    checked={selectedOptions.includes(item.value)}
                    selectedOptions={selectedOptions}
                    {...item}
                  />
                )}
              />
            ),
            extra: (
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  onClick={() => {
                    const itemIds = items.map((item) => item.value);

                    if (isChecked) {
                      // Remove all values from the selectedOptions array
                      const diff = [...selectedOptions.filter((o) => !itemIds.includes(o as string))];
                      setChecked(diff);
                    } else {
                      // Add values not currently present in
                      const diff = [...selectedOptions, ...itemIds.filter((id) => !selectedOptions.includes(id))];
                      setChecked(diff);
                    }
                  }}
                  indeterminate={isIndeterminate}
                  checked={isChecked}
                >
                  <Text>Select All</Text>
                </Checkbox>
              </div>
            ),
            forceRender: true,
          },
        ]}
        size="small"
      />
    </>
  );
};
