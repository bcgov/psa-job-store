/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Divider, Form, Modal, Select, Tag, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

const { Option } = Select;

type JobStreamDisciplineProps = {
  index: number;
  control: any;
  getJobStreamsForFamily: (familyId: number) => any[];
  selectedProfession: any;
};

const JobStreamDiscipline: React.FC<JobStreamDisciplineProps> = ({
  index,
  control,
  getJobStreamsForFamily,
  selectedProfession,
}) => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  // use ref for tag closed state
  const tagClosed = useRef(false);

  const handleSelectAll = (checked: boolean, onChange: (value: any[]) => void, jobStreams: any[]) => {
    if (checked) {
      onChange(jobStreams.map((stream) => stream.id));
    } else {
      onChange([]);
    }
    setIsAllSelected(checked);
  };

  const showConfirmationModal = (): Promise<boolean> => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: 'Confirmation',
        content:
          'Removing job family or stream may result in removal of some of the fields selected from pick lists in the Job Profile page. Are you sure you want to continue?',
        onOk: () => {
          resolve(true);
        },
        onCancel: () => {
          resolve(false);
        },
      });
    });
  };

  const handleOptionChange = async (
    selectedStreams: any[],
    onChange: (value: any[]) => void,
    jobStreams: any[],
    value: any,
  ) => {
    if (selectedStreams.includes('all')) {
      if (isAllSelected) {
        const confirmed = await showConfirmationModal();
        if (confirmed) {
          handleSelectAll(!isAllSelected, onChange, jobStreams);
        }
      } else {
        handleSelectAll(!isAllSelected, onChange, jobStreams);
      }
    } else {
      if (selectedStreams.length < value.length) {
        // user pressed close tag, and already confirmed they want to proceed,
        // do not show confirmation modal again
        let confirmed = true;
        if (tagClosed.current) {
          tagClosed.current = false;
        } else {
          confirmed = await showConfirmationModal();
        }
        if (confirmed) {
          onChange(selectedStreams);
          setIsAllSelected(selectedStreams.length === jobStreams.length);
        } else {
          // If the user cancels the removal, revert the selectedStreams to the previous value
          onChange(value);
        }
      } else {
        onChange(selectedStreams);
        setIsAllSelected(selectedStreams.length === jobStreams.length);
      }
    }
  };

  const tagRender = (props: any) => {
    const { label, closable, onClose } = props;
    const labelText = label[1];

    const onPreventMouseDown = (event: { preventDefault: () => void; stopPropagation: () => void }) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleClose = async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const confirmed = await showConfirmationModal();
      if (confirmed) {
        tagClosed.current = true;
        onClose();
      }
    };

    return (
      <Tag
        closable={closable}
        onClose={handleClose}
        style={{ margin: '3px 3px 3px 0px', fontSize: '110%' }}
        onMouseDown={onPreventMouseDown}
      >
        {labelText}
      </Tag>
    );
  };

  return (
    <Form.Item
      label="Job Streams / Disciplines"
      labelCol={{ className: 'card-label' }}
      style={{ borderLeft: '2px solid rgba(5, 5, 5, 0.06)', paddingLeft: '1rem' }}
    >
      <Controller
        control={control}
        name={`professions.${index}.jobStreams`}
        render={({ field: { onChange, onBlur, value } }) => {
          const jobStreams = getJobStreamsForFamily(selectedProfession?.[index]?.jobFamily ?? -1);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            setIsAllSelected(value?.length === jobStreams.length);
          }, [value, jobStreams]);

          return (
            <div>
              <Select
                mode="multiple"
                placeholder="Select the job streams this role is part of"
                style={{ width: '100%' }}
                onChange={(selectedStreams) => handleOptionChange(selectedStreams, onChange, jobStreams, value)}
                value={value}
                onBlur={onBlur}
                tagRender={tagRender}
              >
                <Option key="all" value="all" style={{ position: 'relative', marginBottom: '10px' }}>
                  <Checkbox
                    style={{ marginRight: '5px' }}
                    checked={isAllSelected}
                    // onChange={(e) => {
                    // console.log('e.target.checked: ', e.target.checked);
                    // if (!e.target.checked)
                    //   showConfirmationModal(() => {
                    //     handleSelectAll(e.target.checked, onChange, jobStreams);
                    //   });
                    // else handleSelectAll(e.target.checked, onChange, jobStreams);
                    // }}
                  ></Checkbox>
                  Select All
                  <Divider style={{ margin: '5px -15px', bottom: '-10px', position: 'absolute' }} />
                </Option>

                {jobStreams.map((stream) => (
                  <Option key={stream.id} value={stream.id}>
                    <Checkbox
                      id={`stream-${stream.id}`}
                      checked={value?.includes(stream.id)}
                      style={{ marginRight: '5px' }}
                    ></Checkbox>
                    {stream.name}
                  </Option>
                ))}
              </Select>
              <Typography.Text type="secondary">You can enter multiple disciplines in this field.</Typography.Text>
            </div>
          );
        }}
      />
    </Form.Item>
  );
};

export default JobStreamDiscipline;
