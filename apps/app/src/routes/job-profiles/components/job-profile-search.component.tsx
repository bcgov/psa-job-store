/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Input, Row, Tag } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Select, { components } from 'react-select';
import { useGetClassificationsQuery } from '../../../redux/services/graphql-api/classification.api';
import { useGetJobFamiliesQuery } from '../../../redux/services/graphql-api/job-family.api';
import './job-profile-search.component.css';

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

export const JobProfileSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // const organizationData = useGetOrganizationsQuery().data?.organizations;
  // const jobRoleData = useGetJobRolesQuery().data?.jobRoles;
  const jobFamilyData = useGetJobFamiliesQuery().data?.jobFamilies;
  const classificationData = useGetClassificationsQuery().data?.classifications;
  const isPositionRequestRoute = location.pathname.includes('/position-request/');

  const getBasePath = useCallback(
    (path: string) => {
      if (isPositionRequestRoute) return location.pathname.split('/').slice(0, 3).join('/');

      const pathParts = path.split('/');
      // Check if the last part is a number (ID), if so, remove it
      if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
        pathParts.pop(); // Remove the last part (job profile ID)
      }
      return pathParts.join('/');
    },
    [isPositionRequestRoute, location.pathname],
  );

  const { positionRequestId } = useParams();

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
        pathname: `/position-request/${positionRequestId}`,
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  const [allSelections, setAllSelections] = useState<Selection[]>([]);
  const [classificationFilterData, setClassificationOptions] = useState<ClassificationOption[]>([]);
  const [jobFamilyFilterData, setJobFamilyOptions] = useState<ClassificationOption[]>([]);
  const [initialSelectionSet, setInitialSelectionSet] = useState(false);

  // Unified state for all selections
  interface Selection {
    value: string;
    type: string;
  }

  // Add a new selection
  const addSelection = (value: any, type: any) => {
    const newSelection = { value, type };
    setAllSelections([...allSelections, newSelection]);
  };

  // Remove a selection
  const removeSelection = (removedValue: any, type: any) => {
    setAllSelections(
      allSelections.filter((selection) => !(selection.value === removedValue && selection.type === type)),
    );
  };

  interface ClassificationOption {
    label: string;
    value: string;
  }

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
    if (jobFamilyData) {
      const newOptions = jobFamilyData.map((classification) => ({
        label: classification.name,
        value: classification.id.toString(),
      }));
      setJobFamilyOptions(newOptions);
    }
  }, [jobFamilyData]);

  // Update the Select components when selections change
  const selectedJobFamily = allSelections.filter((s) => s.type === 'jobFamily').map((s) => s.value);
  const selectedClassification = allSelections.filter((s) => s.type === 'classification').map((s) => s.value);

  const findLabel = (value: any, type: any) => {
    if (type === 'jobFamily') {
      return jobFamilyFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'classification') {
      return classificationFilterData.find((option) => option.value === value)?.label || value;
    }
    return value;
  };

  useEffect(() => {
    const jobFamilyParams = decodeURIComponent(searchParams.get('job_family_id__in') || '')
      .split(',')
      .filter(Boolean);
    const classificationParams = decodeURIComponent(searchParams.get('classification_id__in') || '')
      .split(',')
      .filter(Boolean);
    const initialSelections = [
      ...jobFamilyParams.map((value) => ({ value, type: 'jobFamily' })),
      ...classificationParams.map((value) => ({ value, type: 'classification' })),
    ];
    if (!initialSelectionSet) {
      setAllSelections(initialSelections);
      setInitialSelectionSet(true);
    }
  }, [searchParams, initialSelectionSet, setInitialSelectionSet]);

  useEffect(() => {
    // Sync state with URL parameters for selections and pagination
    const jobFamilyValues = allSelections
      .filter((s) => s.type === 'jobFamily')
      .map((s) => s.value)
      .join(',');
    const classificationValues = allSelections
      .filter((s) => s.type === 'classification')
      .map((s) => s.value)
      .join(',');

    const pageFromURL = parseInt(searchParams.get('page') || '1', 10);
    const searchFromURL = searchParams.get('search');
    const selectedProfileFromUrl = searchParams.get('selectedProfile');

    // console.log('selectedProfileFromUrl: ', selectedProfileFromUrl);

    // Update URL parameters if needed
    const newSearchParams = new URLSearchParams();
    if (selectedProfileFromUrl) newSearchParams.set('selectedProfile', selectedProfileFromUrl);
    if (pageFromURL != 1) newSearchParams.set('page', pageFromURL.toString());
    if (searchFromURL) newSearchParams.set('search', searchFromURL.toString());

    if (jobFamilyValues) newSearchParams.set('job_family_id__in', jobFamilyValues);
    if (classificationValues) newSearchParams.set('classification_id__in', classificationValues);

    const jobFamilyChanged = newSearchParams.get('job_family_id__in') != searchParams.get('job_family_id__in');
    const classificationChanged =
      newSearchParams.get('classification_id__in') != searchParams.get('classification_id__in');

    if (jobFamilyChanged || classificationChanged) {
      // console.log('searchparams changed 1: ', newSearchParams);
      if (searchParams.toString() !== newSearchParams.toString()) {
        newSearchParams.delete('selectedProfile');
        navigate(
          {
            pathname: getBasePath(location.pathname),
            search: newSearchParams.toString(),
          },
          { replace: true },
        );
        // setSearchParams(newSearchParams);
        return;
      }
    }

    // Only update search params if there's a change
    if (searchParams.toString() !== newSearchParams.toString()) {
      // console.log('searchParams changed 2: ', newSearchParams.toString());
      navigate(
        {
          pathname: getBasePath(location.pathname),
          search: newSearchParams.toString(),
        },
        { replace: true },
      );
      // setSearchParams(newSearchParams);
    }
  }, [allSelections, searchParams, setSearchParams, location.pathname, navigate, getBasePath]);

  const clearFilters = () => {
    setAllSelections([]);
    // setSearchParams(''); // Clear the search query

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

  return (
    <Row
      justify="center"
      gutter={8}
      style={{ margin: '0 1rem', zIndex: '2', position: 'relative' }}
      role="search"
      data-testid="job-profile-search"
    >
      <Col lg={15} xs={24}>
        <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Row gutter={24} wrap>
            <Col span={12}>
              <Search
                defaultValue={searchParams.get('search') ?? undefined}
                enterButton="Find job profiles"
                aria-label="Search by job title or keyword"
                onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                allowClear
                placeholder="Search by job title or keyword"
                onSearch={handleSearch}
                style={{ width: 400 }}
              />
            </Col>
            <Col span={12}>
              <Row gutter={8} justify="end">
                <Col data-testid="Job Family-filter" data-cy="Job Family-filter">
                  <Select
                    closeMenuOnSelect={false}
                    isClearable={false}
                    backspaceRemovesValue={false}
                    hideSelectedOptions={false}
                    value={jobFamilyFilterData.filter((jf) =>
                      allSelections
                        .filter((selection) => selection.type === 'jobFamily')
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
                    placeholder="Job Family"
                    options={jobFamilyFilterData}
                    onChange={(selectedItems) => {
                      const newValues = selectedItems.map((item) => item.value);
                      if (newValues == null) return;

                      newValues.forEach((val: any) => {
                        if (!selectedJobFamily.includes(val)) addSelection(val, 'jobFamily');
                      });
                      selectedJobFamily.forEach((val) => {
                        if (!newValues.includes(val)) removeSelection(val, 'jobFamily');
                      });
                    }}
                  ></Select>
                </Col>
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
            <Col>
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
      </Col>
    </Row>
  );
};
