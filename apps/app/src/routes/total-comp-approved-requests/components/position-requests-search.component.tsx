/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, DatePicker, Input, Row, Tag } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Select, { components } from 'react-select';
import {
  GetPositionRequestSubmittedByResponseItem,
  useGetPositionRequestClassificationsQuery,
  useGetPositionRequestJobStoreNumbersQuery,
  useGetPositionRequestStatusesQuery,
  useGetPositionRequestSubmittedByQuery,
} from '../../../redux/services/graphql-api/position-request.api';
import { statusFilterDataMap } from '../../my-position-requests/my-position-requests.page';
// import './job-profile-search.component.css'; // todo: add as necessary

const { RangePicker } = DatePicker;
const { Search } = Input;

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

interface JobProfileSearchProps {
  searchPlaceHolderText?: string;
  searchButtonText?: string;
  fullWidth?: boolean;
  mode?: string | null;
}

// Unified state for all selections
interface Selection {
  value: string;
  type: string;
}

interface SelectionOption {
  value: string;
  label: string;
}

export const PositionRequestsSearch: React.FC<JobProfileSearchProps> = ({
  searchButtonText = 'Find requests',
  searchPlaceHolderText = 'Search by job title or keyword',
  fullWidth = false,
  mode = null,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dateRange, setDateRange] = useState<any>([]);
  // const isPositionRequestRoute = location.pathname.includes('/position-request/');

  // get unique classifications for approved position requests
  const classificationData = useGetPositionRequestClassificationsQuery().data?.positionRequestClassifications;

  // get unique job store numbers for approved position requests
  const jobStoreNumbersData = useGetPositionRequestJobStoreNumbersQuery().data?.positionRequestJobStoreNumbers;

  // if mode is classification, get unique statuses and approved by data
  // todo: load conditionally
  // if (mode=="classification") {
  // get unique statuses for approved position requests
  const statusData = useGetPositionRequestStatusesQuery().data?.positionRequestStatuses;

  // get unique approved by for approved position requests
  const submittedByData = useGetPositionRequestSubmittedByQuery().data?.positionRequestSubmittedBy;
  // }

  const [allSelections, setAllSelections] = useState<Selection[]>([]); // holds tags from all filters
  const [classificationFilterData, setClassificationOptions] = useState<SelectionOption[]>([]);
  const [jobStoreNumberFilterData, setJobStoreNumberOptions] = useState<SelectionOption[]>([]);
  const [statusFilterData, setStatusOptions] = useState<SelectionOption[]>([]);
  const [submittedByFilterData, setSubmittedByOptions] = useState<SelectionOption[]>([]);

  const [initialSelectionSet, setInitialSelectionSet] = useState(false); // used to prevent initial selections from being overwritten

  // Get the base path for the current route
  const getBasePath = useCallback((path: string) => {
    const pathParts = path.split('/');
    // Check if the last part is a number (ID), if so, remove it
    if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
      pathParts.pop(); // Remove the last part (job profile ID)
    }
    return pathParts.join('/');
  }, []);

  // Update the classification Select components when data changes
  useEffect(() => {
    if (classificationData) {
      const newOptions = classificationData.map((classification) => ({
        label: classification.code,
        value: classification.id,
      }));
      setClassificationOptions(newOptions);
    }
  }, [classificationData]);

  useEffect(() => {
    if (jobStoreNumbersData) {
      const newOptions = jobStoreNumbersData.map((ministriesDataItem: number) => ({
        label: ministriesDataItem.toString(),
        value: ministriesDataItem.toString(),
      }));
      setJobStoreNumberOptions(newOptions);
    }
  }, [jobStoreNumbersData]);

  useEffect(() => {
    if (statusData) {
      const newOptions = statusData.map((statusDataItem) => {
        const foundItem = statusFilterDataMap.find((item) => item.value === statusDataItem);
        return {
          label: foundItem ? foundItem.label : statusDataItem,
          value: statusDataItem,
        };
      });
      setStatusOptions(newOptions);
    }
  }, [statusData]);

  useEffect(() => {
    if (submittedByData) {
      const newOptions = submittedByData.map((submittedByDataItem: GetPositionRequestSubmittedByResponseItem) => ({
        label: submittedByDataItem.name,
        value: submittedByDataItem.id,
      }));
      setSubmittedByOptions(newOptions);
    }
  }, [submittedByData]);

  // Update the Select components when selections change
  const selectedClassification = allSelections.filter((s) => s.type === 'classification').map((s) => s.value);
  const selectedJobStoreNumber = allSelections.filter((s) => s.type === 'jobStoreNumber').map((s) => s.value);
  const selectedStatus = allSelections.filter((s) => s.type === 'status').map((s) => s.value);
  const selectedSubmittedBy = allSelections.filter((s) => s.type === 'submittedBy').map((s) => s.value);

  // Find the label for a given value
  const findLabel = (value: any, type: any) => {
    if (type === 'jobStoreNumber') {
      return jobStoreNumberFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'classification') {
      return classificationFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'status') {
      return statusFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'submittedBy') {
      return submittedByFilterData.find((option) => option.value === value)?.label || value;
    }
    return value;
  };

  // Sync state with URL parameters for selections
  useEffect(() => {
    const classificationParams = decodeURIComponent(searchParams.get('classification_id__in') || '')
      .split(',')
      .filter(Boolean);
    const jobStoreNumberParams = decodeURIComponent(searchParams.get('job_store_number__in') || '')
      .split(',')
      .filter(Boolean);
    const statusParams = decodeURIComponent(searchParams.get('status__in') || '')
      .split(',')
      .filter(Boolean);
    const submittedByParams = decodeURIComponent(searchParams.get('submitted_by__in') || '')
      .split(',')
      .filter(Boolean);

    const initialSelections = [
      ...jobStoreNumberParams.map((value) => ({ value, type: 'jobStoreNumber' })),
      ...classificationParams.map((value) => ({ value, type: 'classification' })),
      ...statusParams.map((value) => ({ value, type: 'status' })),
      ...submittedByParams.map((value) => ({ value, type: 'submittedBy' })),
    ];
    if (!initialSelectionSet) {
      setAllSelections(initialSelections);
      setInitialSelectionSet(true);
    }
  }, [searchParams, initialSelectionSet, setInitialSelectionSet]);

  useEffect(() => {
    const classificationValues = allSelections
      .filter((s) => s.type === 'classification')
      .map((s) => s.value)
      .join(',');
    const jobStoreNumberValues = allSelections
      .filter((s) => s.type === 'jobStoreNumber')
      .map((s) => s.value)
      .join(',');
    const statusValues = allSelections
      .filter((s) => s.type === 'status')
      .map((s) => s.value)
      .join(',');
    const submittedByValues = allSelections
      .filter((s) => s.type === 'submittedBy')
      .map((s) => s.value)
      .join(',');

    const newSearchParams = new URLSearchParams();

    // todo: refactor this to be generic (just use existing searchParams)
    // Get current URL parameters
    const pageFromURL = parseInt(searchParams.get('page') || '1', 10);
    const searchFromURL = searchParams.get('search');
    const pageSizeFromURL = searchParams.get('pageSize');
    const sortFieldFromURL = searchParams.get('sortField');
    const sortOrderFromURL = searchParams.get('sortOrder');

    // Update URL parameters if needed
    if (pageFromURL != 1) newSearchParams.set('page', pageFromURL.toString());
    if (searchFromURL) newSearchParams.set('search', searchFromURL.toString());
    if (pageSizeFromURL) newSearchParams.set('pageSize', pageSizeFromURL.toString());
    if (sortFieldFromURL) newSearchParams.set('sortField', sortFieldFromURL.toString());
    if (sortOrderFromURL) newSearchParams.set('sortOrder', sortOrderFromURL.toString());

    if (classificationValues) newSearchParams.set('classification_id__in', classificationValues);
    if (jobStoreNumberValues) newSearchParams.set('job_store_number__in', jobStoreNumberValues);
    if (statusValues) newSearchParams.set('status__in', statusValues);
    if (submittedByValues) newSearchParams.set('submitted_by__in', submittedByValues);

    if (dateRange.length === 2) {
      newSearchParams.set('startDate', dateRange[0].format('YYYY-MM-DD'));
      newSearchParams.set('endDate', dateRange[1].format('YYYY-MM-DD'));
    } else {
      newSearchParams.delete('startDate');
      newSearchParams.delete('endDate');
    }
    // const classificationChanged =
    //   newSearchParams.get('classification_id__in') != searchParams.get('classification_id__in');

    // const jobStoreNumberChanged = newSearchParams.get('classification_id__in') != searchParams.get('classification_id__in');

    // Only update search params if there's a change
    if (searchParams.toString() !== newSearchParams.toString()) {
      // console.log('navigating.. A', getBasePath(location.pathname));
      navigate(
        {
          pathname: getBasePath(location.pathname),
          search: newSearchParams.toString(),
        },
        { replace: true },
      );
    }
  }, [allSelections, searchParams, setSearchParams, location.pathname, navigate, getBasePath, dateRange]);

  // Add a new tag from any of the filters
  const addSelection = (value: any, type: any) => {
    const newSelection = { value, type };
    setAllSelections([...allSelections, newSelection]);
  };

  // Remove a tag
  const removeSelection = (removedValue: any, type: any) => {
    if (type === 'dateRange') {
      setDateRange([]);
    }
    setAllSelections(
      allSelections.filter((selection) => !(selection.value === removedValue && selection.type === type)),
    );
  };

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    // const basePath = getBasePath(location.pathname);
    searchParams.delete('selectedProfile');

    if (trimmedValue.length === 0) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', trimmedValue);
    }

    navigate(
      {
        // pathname: basePath,
        // pathname: `/my-position-requests/${positionRequestId}`,
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  const clearFilters = () => {
    setAllSelections([]);

    // Update the URL parameters
    const newSearchParams = new URLSearchParams();

    const pageFromUrl = searchParams.get('page');
    if (pageFromUrl) newSearchParams.set('page', pageFromUrl);

    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) newSearchParams.set('search', searchFromUrl);

    // setSearchParams(newSearchParams);

    const basePath = getBasePath(location.pathname);

    navigate(
      {
        pathname: basePath,
        search: newSearchParams.toString(),
      },
      { replace: true },
    );
  };

  useEffect(() => {
    if (dateRange.length === 2) {
      const dateRangeString = `${dateRange[0].format('YYYY-MM-DD')} to ${dateRange[1].format('YYYY-MM-DD')}`;
      setAllSelections((prevSelections) => {
        const existingIndex = prevSelections.findIndex((selection) => selection.type === 'dateRange');
        if (existingIndex >= 0) {
          // Update existing date range
          const updatedSelections = [...prevSelections];
          updatedSelections[existingIndex] = { value: dateRangeString, type: 'dateRange' };
          return updatedSelections;
        } else {
          // Add new date range
          return [...prevSelections, { value: dateRangeString, type: 'dateRange' }];
        }
      });
    }
  }, [dateRange, setAllSelections, allSelections]);

  return (
    <Row
      justify="center"
      gutter={fullWidth ? 0 : 8}
      style={{ margin: fullWidth ? '0' : '0 1rem', zIndex: 2, position: 'relative' }}
      role="search"
      data-testid="job-profile-search"
    >
      <Col lg={fullWidth ? 24 : 15} xs={24}>
        <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Row gutter={24} wrap>
            <Col span={fullWidth ? 10 : 12}>
              <Search
                defaultValue={searchParams.get('search') ?? undefined}
                enterButton={searchButtonText}
                aria-label={searchPlaceHolderText}
                onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                allowClear
                placeholder={searchPlaceHolderText}
                onSearch={handleSearch}
                style={{ width: fullWidth ? 500 : 400 }}
              />
            </Col>
            <Col span={fullWidth ? 14 : 12}>
              <Row gutter={8} justify="end">
                {mode === 'classification' && (
                  <Col data-testid="Status-filter" data-cy="Status-filter">
                    <Select
                      closeMenuOnSelect={false}
                      isClearable={false}
                      backspaceRemovesValue={false}
                      hideSelectedOptions={false}
                      value={statusFilterData.filter((jf) =>
                        allSelections
                          .filter((selection) => selection.type === 'status')
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
                      placeholder="Status"
                      aria-label="Status"
                      options={statusFilterData}
                      onChange={(selectedItems) => {
                        const newValues = selectedItems.map((item) => item.value);
                        if (newValues == null) return;

                        newValues.forEach((val: any) => {
                          if (!selectedStatus.includes(val)) addSelection(val, 'status');
                        });
                        selectedStatus.forEach((val) => {
                          if (!newValues.includes(val)) removeSelection(val, 'status');
                        });
                      }}
                    ></Select>
                  </Col>
                )}
                <Col data-testid="Classification-filter" data-cy="Classification-filter">
                  <Select
                    closeMenuOnSelect={false}
                    isClearable={false}
                    backspaceRemovesValue={false}
                    hideSelectedOptions={false}
                    value={classificationFilterData.filter((jf) =>
                      allSelections
                        .filter((selection) => selection.type === 'classification')
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
                    placeholder="Classification"
                    aria-label="Classification"
                    options={classificationFilterData}
                    onChange={(selectedItems) => {
                      const newValues = selectedItems.map((item) => item.value);
                      if (newValues == null) return;

                      newValues.forEach((val: any) => {
                        if (!selectedClassification.includes(val)) addSelection(val, 'classification');
                      });
                      selectedClassification.forEach((val) => {
                        if (!newValues.includes(val)) removeSelection(val, 'classification');
                      });
                    }}
                  ></Select>
                </Col>

                {mode != 'classification' && (
                  <>
                    <Col data-testid="JobStoreNumber-filter" data-cy="JobStoreNumber-filter">
                      <Select
                        closeMenuOnSelect={false}
                        isClearable={false}
                        backspaceRemovesValue={false}
                        hideSelectedOptions={false}
                        value={jobStoreNumberFilterData.filter((jf) =>
                          allSelections
                            .filter((selection) => selection.type === 'jobStoreNumber')
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
                        placeholder="JobStore number"
                        aria-label="JobStore number"
                        options={jobStoreNumberFilterData}
                        onChange={(selectedItems) => {
                          const newValues = selectedItems.map((item) => item.value);
                          if (newValues == null) return;

                          newValues.forEach((val: any) => {
                            if (!selectedJobStoreNumber.includes(val)) addSelection(val, 'jobStoreNumber');
                          });
                          selectedJobStoreNumber.forEach((val) => {
                            if (!newValues.includes(val)) removeSelection(val, 'jobStoreNumber');
                          });
                        }}
                      ></Select>
                    </Col>
                    <Col data-testid="Daterange-filter" data-cy="Daterange-filter">
                      {/* <Dropdown overlay={menu} trigger={['click']}>
                    <Button>
                      Select Date Range <DownOutlined />
                    </Button>
                  </Dropdown> */}
                      <RangePicker
                        value={dateRange.length === 2 ? [dayjs(dateRange[0]), dayjs(dateRange[1])] : undefined}
                        onChange={(dates) => {
                          setDateRange(dates || []);
                        }}
                      />
                    </Col>
                  </>
                )}

                {mode === 'classification' && (
                  <Col data-testid="Created-by-filter" data-cy="Created-by-filter">
                    <Select
                      closeMenuOnSelect={false}
                      isClearable={false}
                      backspaceRemovesValue={false}
                      hideSelectedOptions={false}
                      value={submittedByFilterData.filter((jf) =>
                        allSelections
                          .filter((selection) => selection.type === 'submittedBy')
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
                      placeholder="Submitted by"
                      aria-label="Submitted by"
                      options={submittedByFilterData}
                      onChange={(selectedItems) => {
                        const newValues = selectedItems.map((item) => item.value);
                        if (newValues == null) return;

                        newValues.forEach((val: any) => {
                          if (!selectedSubmittedBy.includes(val)) addSelection(val, 'submittedBy');
                        });
                        selectedSubmittedBy.forEach((val) => {
                          if (!newValues.includes(val)) removeSelection(val, 'submittedBy');
                        });
                      }}
                    ></Select>
                  </Col>
                )}
              </Row>
            </Col>
            {allSelections.length > 0 && (
              <Col style={{ marginTop: '10px' }}>
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
            )}
          </Row>
          <Row>
            <Col data-testid="filters-tags-section">
              {allSelections.map((selection) => (
                <Tag
                  style={{ marginTop: '10px' }}
                  key={`${selection.type}-${selection.value}`}
                  closable
                  onClose={() => removeSelection(selection.value, selection.type)}
                >
                  {selection.type === 'dateRange'
                    ? `Date: ${selection.value}`
                    : findLabel(selection.value, selection.type)}
                </Tag>
              ))}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
