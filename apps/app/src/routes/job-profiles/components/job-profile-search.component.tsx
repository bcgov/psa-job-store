/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Input, Row, Tag } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Select, { components } from 'react-select';
import { useGetFilteredClassificationsQuery } from '../../../redux/services/graphql-api/classification.api';
import { useGetJobFamiliesQuery } from '../../../redux/services/graphql-api/job-family.api';
import {
  useGetJobProfilesCareerGroupsQuery,
  useGetJobProfilesMinistriesQuery,
} from '../../../redux/services/graphql-api/job-profile.api';
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

interface JobProfileSearchProps {
  searchPlaceHolderText?: string;
  additionalFilters?: boolean;
  fullWidth?: boolean;
  ministriesData?: any;
  careerGroupData?: any;
}

// Unified state for all selections
interface Selection {
  value: string;
  type: string;
}

interface ClassificationOption {
  value: string;
  label: string;
}

interface CareerGroupOption {
  value: string;
  label: string;
}

interface MinistriesOption {
  value: string;
  label: string;
}

export const JobProfileSearch: React.FC<JobProfileSearchProps> = ({
  searchPlaceHolderText = 'Search by job title or keyword',
  additionalFilters = false,
  fullWidth = false,
  ministriesData = null,
  careerGroupData = null,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isPositionRequestRoute = location.pathname.includes('/position-request/');

  // const organizationData = useGetOrganizationsQuery().data?.organizations;
  // const jobRoleData = useGetJobRolesQuery().data?.jobRoles;
  const jobFamilyData = useGetJobFamiliesQuery().data?.jobFamilies;
  const classificationData = useGetFilteredClassificationsQuery().data?.classifications;

  if (!careerGroupData)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    careerGroupData = useGetJobProfilesCareerGroupsQuery().data?.jobProfilesCareerGroups;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (!ministriesData) ministriesData = useGetJobProfilesMinistriesQuery().data?.jobProfilesMinistries;

  const [allSelections, setAllSelections] = useState<Selection[]>([]); // holds tags from all filters
  const [classificationFilterData, setClassificationOptions] = useState<ClassificationOption[]>([]); // holds options for classification filter
  const [jobFamilyFilterData, setJobFamilyOptions] = useState<ClassificationOption[]>([]); // holds options for job family filter
  const [careerGroupFilterData, setCareerGroupOptions] = useState<CareerGroupOption[]>([]);
  const [ministriesFilterData, setMinistriesOptions] = useState<MinistriesOption[]>([]);

  const [initialSelectionSet, setInitialSelectionSet] = useState(false); // used to prevent initial selections from being overwritten

  // Get the base path for the current route
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
    if (ministriesData) {
      const newOptions = ministriesData.map((ministriesDataItem: { name: any; id: any }) => ({
        label: ministriesDataItem.name,
        value: ministriesDataItem.id,
      }));
      setMinistriesOptions(newOptions);
    }
  }, [ministriesData]);

  useEffect(() => {
    if (careerGroupData) {
      const newOptions = careerGroupData.map((careerGroupDataItem: { name: any; id: { toString: () => any } }) => ({
        label: careerGroupDataItem.name,
        value: careerGroupDataItem.id.toString(),
      }));
      setCareerGroupOptions(newOptions);
    }
  }, [careerGroupData]);

  // Update the job family Select components when data changes
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
  const selectedCareerGroup = allSelections.filter((s) => s.type === 'careerGroup').map((s) => s.value);
  const selectedMinistry = allSelections.filter((s) => s.type === 'ministry').map((s) => s.value);

  // Find the label for a given value
  const findLabel = (value: any, type: any) => {
    if (type === 'jobFamily') {
      return jobFamilyFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'classification') {
      return classificationFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'careerGroup') {
      return careerGroupFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'ministry') {
      return ministriesFilterData.find((option) => option.value === value)?.label || value;
    }
    return value;
  };

  // Sync state with URL parameters for selections
  useEffect(() => {
    const jobFamilyParams = decodeURIComponent(searchParams.get('job_family_id__in') || '')
      .split(',')
      .filter(Boolean);
    const classificationParams = decodeURIComponent(searchParams.get('classification_id__in') || '')
      .split(',')
      .filter(Boolean);
    // const careerGroupParams = decodeURIComponent(searchParams.get('career_group_id__in') || '')
    //   .split(',')
    //   .filter(Boolean);
    const ministriesParams = decodeURIComponent(searchParams.get('ministry_id__in') || '')
      .split(',')
      .filter(Boolean);

    const initialSelections = [
      ...jobFamilyParams.map((value) => ({ value, type: 'jobFamily' })),
      ...classificationParams.map((value) => ({ value, type: 'classification' })),
      // ...careerGroupParams.map((value) => ({ value, type: 'careerGroup' })),
      ...ministriesParams.map((value) => ({ value, type: 'ministry' })),
    ];
    if (!initialSelectionSet) {
      setAllSelections(initialSelections);
      setInitialSelectionSet(true);
    }
  }, [searchParams, initialSelectionSet, setInitialSelectionSet]);

  useEffect(() => {
    const jobFamilyValues = allSelections
      .filter((s) => s.type === 'jobFamily')
      .map((s) => s.value)
      .join(',');
    const classificationValues = allSelections
      .filter((s) => s.type === 'classification')
      .map((s) => s.value)
      .join(',');

    // const careerGroupValues = allSelections
    //   .filter((s) => s.type === 'careerGroup')
    //   .map((s) => s.value)
    //   .join(',');
    const ministryValues = allSelections
      .filter((s) => s.type === 'ministry')
      .map((s) => s.value)
      .join(',');

    const newSearchParams = new URLSearchParams();

    // todo: refactor this to be generic (just use existing searchParams)
    // Get current URL parameters
    const pageFromURL = parseInt(searchParams.get('page') || '1', 10);
    const searchFromURL = searchParams.get('search');
    const selectedProfileFromUrl = searchParams.get('selectedProfile');
    const pageSizeFromURL = searchParams.get('pageSize');
    const sortFieldFromURL = searchParams.get('sortField');
    const sortOrderFromURL = searchParams.get('sortOrder');

    // Update URL parameters if needed
    if (selectedProfileFromUrl) newSearchParams.set('selectedProfile', selectedProfileFromUrl);
    if (pageFromURL != 1) newSearchParams.set('page', pageFromURL.toString());
    if (searchFromURL) newSearchParams.set('search', searchFromURL.toString());
    if (pageSizeFromURL) newSearchParams.set('pageSize', pageSizeFromURL.toString());
    if (sortFieldFromURL) newSearchParams.set('sortField', sortFieldFromURL.toString());
    if (sortOrderFromURL) newSearchParams.set('sortOrder', sortOrderFromURL.toString());

    if (jobFamilyValues) newSearchParams.set('job_family_id__in', jobFamilyValues);
    if (classificationValues) newSearchParams.set('classification_id__in', classificationValues);
    // if (careerGroupValues) newSearchParams.set('career_group_id__in', careerGroupValues);
    if (ministryValues) newSearchParams.set('ministry_id__in', ministryValues);

    const jobFamilyChanged = newSearchParams.get('job_family_id__in') != searchParams.get('job_family_id__in');
    const classificationChanged =
      newSearchParams.get('classification_id__in') != searchParams.get('classification_id__in');

    // const careerGroupChanged = newSearchParams.get('career_group_id__in') != searchParams.get('career_group_id__in');
    const ministryChanged = newSearchParams.get('ministry_id__in') != searchParams.get('ministry_id__in');

    // If the job family or classification filters have changed, de-select the selected profile
    if (jobFamilyChanged || classificationChanged || ministryChanged) {
      newSearchParams.delete('selectedProfile');
      // console.log('navigating.. B', getBasePath(location.pathname));
      navigate(
        {
          pathname: getBasePath(location.pathname),
          search: newSearchParams.toString(),
        },
        { replace: true },
      );
    } else {
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
    }
  }, [allSelections, searchParams, setSearchParams, location.pathname, navigate, getBasePath]);

  // Add a new tag from any of the filters
  const addSelection = (value: any, type: any) => {
    const newSelection = { value, type };
    setAllSelections([...allSelections, newSelection]);
  };

  // Remove a tag
  const removeSelection = (removedValue: any, type: any) => {
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
        // pathname: `/position-request/${positionRequestId}`,
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

  // <Row
  //   justify="center"
  //   gutter={0}
  //   style={{ margin: '0 0rem', zIndex: '2', position: 'relative' }}
  //   role="search"
  //   data-testid="job-profile-search"
  // >
  //   <Col lg={24} xs={24}>
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
                enterButton="Find job profiles"
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

                {/* if filters contains careerGroup, then render it */}
                {additionalFilters && (
                  <Col data-testid="Career-group-filter" data-cy="Career-group-filter">
                    <Select
                      closeMenuOnSelect={false}
                      isClearable={false}
                      backspaceRemovesValue={false}
                      hideSelectedOptions={false}
                      value={careerGroupFilterData.filter((jf) =>
                        allSelections
                          .filter((selection) => selection.type === 'careerGroup')
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
                      placeholder="Career Group"
                      options={careerGroupFilterData}
                      onChange={(selectedItems) => {
                        const newValues = selectedItems.map((item) => item.value);
                        if (newValues == null) return;

                        newValues.forEach((val: any) => {
                          if (!selectedCareerGroup.includes(val)) addSelection(val, 'careerGroup');
                        });
                        selectedCareerGroup.forEach((val) => {
                          if (!newValues.includes(val)) removeSelection(val, 'careerGroup');
                        });
                      }}
                    ></Select>
                  </Col>
                )}

                {additionalFilters && (
                  <Col data-testid="Ministry-filter" data-cy="Ministry-filter">
                    <Select
                      closeMenuOnSelect={false}
                      isClearable={false}
                      backspaceRemovesValue={false}
                      hideSelectedOptions={false}
                      value={ministriesFilterData.filter((jf) =>
                        allSelections
                          .filter((selection) => selection.type === 'ministry')
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
                      placeholder="Ministry"
                      options={ministriesFilterData}
                      onChange={(selectedItems) => {
                        const newValues = selectedItems.map((item) => item.value);
                        if (newValues == null) return;

                        newValues.forEach((val: any) => {
                          if (!selectedMinistry.includes(val)) addSelection(val, 'ministry');
                        });
                        selectedMinistry.forEach((val) => {
                          if (!newValues.includes(val)) removeSelection(val, 'ministry');
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
