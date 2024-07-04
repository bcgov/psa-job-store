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
  renderItem,
  selectedOptions,
  ...props
}: Omit<PicklistItemProps, 'type'> & {
  onChange: (checkedOptions: string[]) => void;
  renderItem?: (item: Omit<PicklistItemProps, 'type'>) => React.ReactNode;
  checked: boolean;
  selectedOptions: string[];
}) => {
  return (
    <List.Item style={{ padding: 0 }}>
      <div style={{ height: '100%', width: '100%' }}>
        <label
          htmlFor={props.value}
          style={{
            cursor: 'pointer',
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

                if (clone.includes(props.value)) {
                  clone.splice(clone.indexOf(props.value), 1);
                } else {
                  clone.push(props.value);
                }

                onChange(clone);
              }}
              checked={selectedOptions.includes(props.value)}
              id={props.value}
              type="checkbox"
            />
          </div>
          {renderItem ? renderItem(props) : <span>{props.text}</span>}
        </label>
      </div>
    </List.Item>
  );
};
