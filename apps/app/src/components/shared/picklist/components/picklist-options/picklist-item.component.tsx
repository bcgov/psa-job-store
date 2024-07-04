import { List } from 'antd';

export type PicklistItemExtraType = Record<string, unknown>;

export interface PicklistItemProps {
  type: 'item';
  extra?: Record<string, unknown>;
  searchText?: string;
  text: string;
  value: string;
}

export const PicklistItem = ({
  onChange,
  // renderItem,
  // checked,
  // extra,
  // searchText,
  selectedOptions,
  text,
  value,
}: Omit<PicklistItemProps, 'type'> & {
  onChange: (checkedOptions: string[]) => void;
  renderItem?: (item: PicklistItemProps) => React.ReactNode;
  checked: boolean;
  selectedOptions: string[];
}) => {
  return (
    <List.Item style={{ padding: 0 }}>
      {/* <List.Item.Meta avatar={<input type="checkbox"  />} title={text} /> */}
      {/* <List.Item.Meta
        avatar={
          <input
            type="checkbox"
            onChange={() => {
              const clone = [...selectedOptions];
              if (clone.includes(value)) {
                clone.splice(clone.indexOf(value), 1);
              } else {
                clone.push(value);
              }

              onChange(clone);
            }}
            checked={selectedOptions.includes(value)}
          />
        }
        title={text}
      /> */}
      {/* <Flex gap={4} style={{ backgroundColor: 'red', width: '100%' }}>
        <input
          type="checkbox"
          onChange={() => {
            const clone = [...selectedOptions];

            if (clone.includes(value)) {
              clone.splice(clone.indexOf(value), 1);
            } else {
              clone.push(value);
            }

            onChange(clone);
          }}
          checked={selectedOptions.includes(value)}
        />
        <div>
          <span>Title</span>
          <p>Lorem ipsum dolor amut...</p>
        </div>
      </Flex> */}
      <div style={{ height: '100%', width: '100%' }}>
        <label
          htmlFor={value}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            padding: '0.5rem',
            height: '100%',
            width: '100%',
          }}
        >
          <div style={{ padding: '4px' }}>
            <input
              onChange={() => {
                const clone = [...selectedOptions];

                if (clone.includes(value)) {
                  clone.splice(clone.indexOf(value), 1);
                } else {
                  clone.push(value);
                }

                onChange(clone);
              }}
              checked={selectedOptions.includes(value)}
              id={value}
              type="checkbox"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span>{text}</span>
            <span>{text}</span>
          </div>
        </label>
      </div>
    </List.Item>
  );
};
