/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Divider, Form, Select, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
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

  const handleSelectAll = (checked: boolean, onChange: (value: any[]) => void, jobStreams: any[]) => {
    if (checked) {
      onChange(jobStreams.map((stream) => stream.id));
    } else {
      onChange([]);
    }
    setIsAllSelected(checked);
  };

  const handleOptionChange = (selectedStreams: any[], onChange: (value: any[]) => void, jobStreams: any[]) => {
    if (selectedStreams.includes('all')) {
      handleSelectAll(!isAllSelected, onChange, jobStreams);
    } else {
      onChange(selectedStreams);
      setIsAllSelected(selectedStreams.length === jobStreams.length);
    }
  };

  const tagRender = (props: any) => {
    const { label, closable, onClose } = props;
    const labelText = label[1];

    const onPreventMouseDown = (event: { preventDefault: () => void; stopPropagation: () => void }) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        closable={closable}
        onClose={onClose}
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
            <Select
              mode="multiple"
              placeholder="Select the job streams this role is part of"
              style={{ width: '100%' }}
              onChange={(selectedStreams) => handleOptionChange(selectedStreams, onChange, jobStreams)}
              value={value}
              onBlur={onBlur}
              tagRender={tagRender}
            >
              <Option key="all" value="all" style={{ position: 'relative', marginBottom: '10px' }}>
                <Checkbox
                  style={{ marginRight: '5px' }}
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked, onChange, jobStreams)}
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
          );
        }}
      />
    </Form.Item>
  );
};

export default JobStreamDiscipline;
