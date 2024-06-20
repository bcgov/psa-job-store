/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckSquareOutlined, CloseCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Checkbox, Col, Drawer, Form, Input, Row, Tag, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import './wizard-edit-profile-options-picker.css';
const { Search } = Input;

interface EditFormOptionsPickerProps {
  buttonText: string;
  filterOptions?: OptionsPickerOption[];
  selectableOptions: SelectableOption[];
  renderOption?: (option: SelectableOption) => React.ReactNode;
  title: string;
  selectedOptions: string[];
  onAdd: (selectedItems: string[]) => void;
  infoContent?: React.ReactNode;
  renderOptionExtra?: (option: SelectableOption) => React.ReactNode;
}

export interface OptionsPickerOption {
  value: string;
  label: string;
  type: string;
}

export interface SelectableOption {
  searchText?: string;
  text?: string;
  value: string;
  object?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomValueContainer = (props: any) => {
  const children = props.children;
  return (
    <components.ValueContainer {...props}>
      {props.selectProps.inputValue == '' ? (
        <components.Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </components.Placeholder>
      ) : (
        <></>
      )}
      {...children}
    </components.ValueContainer>
  );
};

const EditFormOptionsPicker: React.FC<EditFormOptionsPickerProps> = ({
  buttonText,
  filterOptions,
  selectableOptions,
  renderOption,
  renderOptionExtra,
  title,
  selectedOptions,
  onAdd,
  infoContent,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedOptions);
  const [allSelections, setAllSelections] = useState<OptionsPickerOption[]>([]); // holds tags from all filters
  const [filteredOptions, setFilteredOptions] = useState<SelectableOption[]>([]);

  useEffect(() => {
    setFilteredOptions(selectableOptions);
  }, [selectableOptions]);

  useEffect(() => {
    setSelectedItems(selectedOptions);
  }, [selectedOptions]);

  const findLabel = (value: any, type: any) => {
    if (type === 'jobRoleType') {
      return filterOptions?.find((option) => option.value === value)?.label || value;
    }
    return value;
  };

  const [searchText, setSearchText] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearchAndFilter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_value: string) => {
      if (!filterOptions) return;
      const searchTermLower = searchText.toLowerCase();
      let filtered = selectableOptions.filter((option) => option.searchText?.toLowerCase().includes(searchTermLower));

      // Sort the filtered options based on the position of the search term
      filtered.sort((a, b) => {
        const aIndex = a.searchText?.toLowerCase().indexOf(searchTermLower) ?? -1;
        const bIndex = b.searchText?.toLowerCase().indexOf(searchTermLower) ?? -1;
        return aIndex - bIndex;
      });

      const selectedCategories = allSelections
        .filter((selection) => selection.type === 'jobRoleType')
        .map((selection) => selection.value);

      if (selectedCategories.length !== 0) {
        filtered = filtered.filter((option) => selectedCategories.includes(option.object.category));
      }

      // console.log('setFiltered: ', filtered);
      setFilteredOptions(filtered);
    },
    [allSelections, searchText, selectableOptions, filterOptions],
  );

  // Add a new tag from any of the filters
  const addSelection = (value: any, type: any) => {
    const newSelection = { value, type, label: '' };
    setAllSelections([...allSelections, newSelection]);
  };

  // Remove a tag
  const removeSelection = (removedValue: any, type: any) => {
    setAllSelections(
      allSelections.filter((selection) => !(selection.value === removedValue && selection.type === type)),
    );
  };

  useEffect(() => {
    handleSearchAndFilter('');
  }, [allSelections, handleSearchAndFilter]);

  const clearFilters = () => {};

  const selectedJobRoleType = allSelections.filter((s) => s.type === 'jobRoleType').map((s) => s.value);

  // DRAWER LOGIC
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onAddAction = () => {
    setVisible(false);
    onAdd(selectedItems);
  };

  return (
    <div>
      <Form.Item>
        <Button style={{ paddingLeft: 0 }} type="link" onClick={showDrawer} icon={<CheckSquareOutlined />}>
          {buttonText}
        </Button>
        <Drawer
          title={title}
          placement="right"
          width="50%"
          onClose={onClose}
          open={visible}
          style={{ backgroundColor: 'rgb(240, 242, 245)' }}
          extra={
            <>
              <Button type="primary" style={{ marginRight: '16px' }} onClick={onAddAction}>
                Add
              </Button>
              <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
            </>
          }
        >
          {/* Render the Alert component with the infoContent */}
          {infoContent && <Alert message={infoContent} type="info" />}

          <Row
            className="wizardOptionsPicker"
            justify="center"
            gutter={8}
            style={{ zIndex: 2, position: 'relative' }}
            role="search"
            data-testid="job-profile-search"
          >
            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
              {/* Search block */}
              {filterOptions && (
                <Card style={{ marginTop: '1rem', marginBottom: '1rem', borderColor: '#D9D9D9' }} bordered={true}>
                  <Row gutter={24}>
                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Search
                        // defaultValue={searchParams.get('search') ?? undefined}
                        enterButton="Find competency"
                        aria-label={'Search by keyword'}
                        onPressEnter={(e) => handleSearchAndFilter(e.currentTarget.value)}
                        // allowClear
                        placeholder={'Search by keyword'}
                        onSearch={handleSearchAndFilter}
                        style={{ width: '100%' }}
                        onChange={(e) => {
                          setSearchText(e.target.value);
                        }}
                        value={searchText}
                        onBlur={() => {
                          handleSearchAndFilter(searchText);
                        }}
                        suffix={
                          <Tooltip placement="top" title={'Clear search'}>
                            <CloseCircleFilled
                              style={{
                                fontSize: '0.8rem',
                                color: '#bfbfbf',
                                display: searchText == '' ? 'none' : 'block',
                              }}
                              onClick={() => {
                                setSearchText('');
                                handleSearchAndFilter('');
                              }}
                            />
                          </Tooltip>
                        }
                        // style={{ width: fullWidth ? 500 : 400 }}
                      />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Row gutter={8} justify="end">
                        <Col data-testid="category-filter" data-cy="category-filter">
                          <Select
                            closeMenuOnSelect={false}
                            isClearable={false}
                            backspaceRemovesValue={false}
                            hideSelectedOptions={false}
                            value={filterOptions.filter((jf) =>
                              allSelections
                                .filter((selection) => selection.type === 'jobRoleType')
                                .map((selection) => selection.value)
                                .includes(jf.value),
                            )}
                            styles={{
                              container: (css) => ({ ...css, width: '200px' }),
                              menu: (styles) => ({ ...styles, width: 'max-content', minWidth: '100%' }),
                            }}
                            components={{
                              ValueContainer: CustomValueContainer,
                            }}
                            classNamePrefix="react-select"
                            isMulti
                            placeholder="Category"
                            aria-label="Category"
                            options={filterOptions}
                            onChange={(selectedItems) => {
                              const newValues = selectedItems.map((item) => item.value);
                              if (newValues == null) return;

                              newValues.forEach((val: any) => {
                                if (!selectedJobRoleType.includes(val)) addSelection(val, 'jobRoleType');
                              });
                              selectedJobRoleType.forEach((val) => {
                                if (!newValues.includes(val)) removeSelection(val, 'jobRoleType');
                              });
                            }}
                          ></Select>
                        </Col>
                      </Row>
                    </Col>
                    {allSelections.length > 0 && (
                      <Row>
                        <Col span={24} style={{ marginTop: '10px' }}>
                          <span
                            style={{
                              fontWeight: 500,
                              margin: '8px',
                              marginLeft: 0,
                              paddingRight: '8px',
                              borderRight: '2px solid rgba(0, 0, 0, 0.06)',
                              marginRight: '10px',
                            }}
                          >
                            Applied filters
                          </span>
                          <Button
                            onClick={clearFilters}
                            type="link"
                            style={{ padding: '0', fontWeight: 400 }}
                            data-cy="clear-filters-button"
                          >
                            Clear all filters
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Row>
                  <Row data-testid="filters-tags-section">
                    <Col lg={15} xs={24}>
                      {allSelections.map((selection) => (
                        <Tag
                          style={{ marginTop: '10px' }}
                          key={`${selection.type}-${selection.value}`}
                          closable
                          onClose={() => removeSelection(selection.value, selection.type)}
                        >
                          {findLabel(selection.value, selection.type)}
                        </Tag>
                      ))}
                    </Col>
                  </Row>
                </Card>
              )}
              {/* Render the list of selectable items, each one in a card, with a checkbox */}
              <Row>
                {filteredOptions.length == 0 && (
                  <Col span={24}>
                    <Card>No items found</Card>
                  </Col>
                )}
                {filteredOptions.map((option) => (
                  <Col key={option.value} span={24} style={{ marginBottom: '0.5rem' }}>
                    <Card>
                      {renderOptionExtra && <div style={{ marginLeft: '2rem' }}>{renderOptionExtra(option)}</div>}
                      <Checkbox
                        checked={selectedItems.includes(option.value.toString())}
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, option.value.toString()]);
                          } else {
                            setSelectedItems(selectedItems.filter((item) => item !== option.value.toString()));
                          }
                        }}
                      >
                        <div style={{ marginLeft: '8px' }}>{renderOption ? renderOption(option) : option?.text}</div>
                      </Checkbox>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Drawer>
      </Form.Item>
    </div>
  );
};

export default EditFormOptionsPicker;
