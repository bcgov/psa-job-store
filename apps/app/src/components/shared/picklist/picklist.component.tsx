import { CheckSquareOutlined, CloseOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Drawer, List, Row, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import NoResultsView from '../../../routes/my-position-requests/components/no-results.component';
import { PicklistOption } from './components/picklist-options';
import { PicklistGroup, PicklistGroupProps } from './components/picklist-options/picklist-group.component';
import { PicklistItem, PicklistItemProps } from './components/picklist-options/picklist-item.component';

export interface PicklistProps {
  info?: {
    message?: React.ReactNode;
  };
  options: PicklistOption[];
  selectedOptions: string[];
  title: string;
  trigger: {
    text: string;
  };
}

export const Picklist = ({ info, options, selectedOptions = [], title, trigger }: PicklistProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = () => {
    const groupedItemIds = [
      ...options
        .filter((o) => o.type === 'group')
        .flatMap((o) => (o as PicklistGroupProps).items.flatMap((i) => i.value)),
      ...options.filter((o) => o.type === 'item').map((o) => (o as PicklistItemProps).value),
    ];

    // Filter out department IDs which don't exist in `groupItemIds`.
    const filtered = checked.filter((o) => groupedItemIds.includes(o));
    console.log(filtered);
    return filtered;
  };

  const openPicklist = () => setOpen(true);
  const closePicklist = () => {
    setOpen(false);
    setChecked(selectedOptions);
  };

  const [checked, setChecked] = useState<string[]>(selectedOptions);

  useEffect(() => {
    setChecked(selectedOptions);
  }, [selectedOptions]);

  return (
    <div>
      <Tooltip title={options.length === 0 ? 'No options available' : ''}>
        <Button
          onClick={openPicklist}
          disabled={options.length === 0}
          icon={<CheckSquareOutlined />}
          style={{ paddingLeft: 0 }}
          type="link"
        >
          {trigger.text}
        </Button>
      </Tooltip>
      <Drawer
        onClose={closePicklist}
        extra={
          <>
            <Button type="primary" style={{ marginRight: '16px' }} onClick={onSubmit}>
              Add
            </Button>
            <Button type="text" icon={<CloseOutlined />} onClick={closePicklist} />
          </>
        }
        open={open}
        placement="right"
        style={{ backgroundColor: 'rgb(240,242,245)' }}
        title={title}
        width="50%"
      >
        {/* Info Box */}
        {info?.message != null && <Alert message={info.message} type="info" />}

        {/* Option List */}
        <Row>
          {options.length === 0 ? (
            <Col span={24}>
              <NoResultsView />
            </Col>
          ) : (
            <Col span={24}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {options.map((option) => {
                  if (option.type === 'group') {
                    return (
                      <PicklistGroup
                        key={option.text}
                        setChecked={setChecked}
                        items={option.items}
                        selectedOptions={checked}
                        text={option.text}
                      />
                    );
                  } else if (option.type === 'item') {
                    return (
                      <List
                        key={option.value}
                        bordered
                        dataSource={[option]}
                        itemLayout="horizontal"
                        renderItem={(item) => (
                          <PicklistItem
                            onChange={setChecked}
                            key={item.value}
                            checked={checked.includes(item.value)}
                            selectedOptions={checked}
                            {...item}
                          />
                        )}
                      />
                    );
                  } else {
                    return <></>;
                  }
                })}
              </Space>
            </Col>
          )}
        </Row>
      </Drawer>
    </div>
  );
};
