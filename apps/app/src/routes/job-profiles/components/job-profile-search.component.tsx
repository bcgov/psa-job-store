/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Tag, Tooltip } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Select, { components } from 'react-select';
import AccessibleTreeSelect from '../../../components/app/common/components/accessible-tree-select';
import { useGetJobFamiliesQuery } from '../../../redux/services/graphql-api/job-family.api';
import {
  JobProfileStreamModel,
  useGetJobProfileStreamsQuery,
} from '../../../redux/services/graphql-api/job-profile-stream';
import { ClassificationModel } from '../../../redux/services/graphql-api/job-profile-types';
import {
  useGetJobProfilesClassificationsQuery,
  useGetJobProfilesMinistriesQuery,
} from '../../../redux/services/graphql-api/job-profile.api';
import './job-profile-search.component.css';
import { useJobProfilesProvider } from './job-profiles.context';

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
  classificationData?: ClassificationModel[] | undefined;
  positionRequestId?: number;
}

// Unified state for all selections
interface Selection {
  value: string;
  type: string;
}

interface ClassificationOption {
  value: string;
  label: string;
  data: {
    name: string;
    code: string;
  };
}

interface SelectOption {
  value: string;
  label: string;
}

interface MinistriesOption {
  value: string;
  label: string;
}

export const JobProfileSearch: React.FC<JobProfileSearchProps> = ({
  positionRequestId,
  searchPlaceHolderText = 'Search by job title or keyword',
  // additionalFilters = false,
  fullWidth = false,
  ministriesData = null,
  classificationData = undefined,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { clearingFilters, setClearingFilters, clearingSearch, setClearingSearch } = useJobProfilesProvider();
  const isPositionRequestRoute = location.pathname.includes('/requests/positions/');

  // const organizationData = useGetOrganizationsQuery().data?.organizations;
  // const jobRoleData = useGetJobRolesQuery().data?.jobRoles;
  const jobFamilyData = useGetJobFamiliesQuery().data?.jobFamilies;
  const jobRoleTypeData = useMemo(
    () => [
      {
        id: 1,
        name: 'Individual Contributor',
      },
      {
        id: 2,
        name: 'People Leader',
      },
    ],
    [],
  );

  if (!classificationData) {
    const classData = useGetJobProfilesClassificationsQuery();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    classificationData = classData.data?.jobProfilesClassifications;
  }

  const [searchText, setSearchText] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setSearchText(searchParams.get('search') || '');
  }, [searchParams]);

  // JOB FAMILIES AND STREAMS TREE VIEW
  const { data: jobFamiliesData } = useGetJobFamiliesQuery();
  const { data: jobProfileStreamsData } = useGetJobProfileStreamsQuery();

  // const [searchValue, setSearchValue] = useState('');
  const [treeData, setTreeData] = useState<any>([]);
  // const { SHOW_CHILD } = TreeSelect;

  useEffect(() => {
    if (jobFamiliesData && jobProfileStreamsData) {
      const formattedTreeData = jobFamiliesData.jobFamilies.map((jobFamily) => {
        const children = jobProfileStreamsData.jobProfileStreams
          .filter((stream) => stream.job_family_id === jobFamily.id)
          .map((stream) => ({
            value: `stream-${stream.id}`, // Prefix with 'stream-'
            title: stream.name,
            key: `stream-${stream.id}`,
          }));

        return {
          value: `job_family-${jobFamily.id}`, // Prefix with 'job_family-'
          title: jobFamily.name,
          key: `job_family-${jobFamily.id}`,
          children: children,
        };
      });

      setTreeData(formattedTreeData);
    }
  }, [jobFamiliesData, jobProfileStreamsData]);

  // DONE JOB FAMILIES AND STREAMS TREE VIEW

  // if (!careerGroupData)
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   careerGroupData = useGetJobProfilesCareerGroupsQuery().data?.jobProfilesCareerGroups;

  if (!ministriesData)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ministriesData = useGetJobProfilesMinistriesQuery({ positionRequestId }).data?.jobProfilesMinistries;

  const [allSelections, setAllSelections] = useState<Selection[]>([]); // holds tags from all filters
  const [classificationFilterData, setClassificationOptions] = useState<ClassificationOption[]>([]); // holds options for classification filter
  const [jobFamilyFilterData, setJobFamilyOptions] = useState<SelectOption[]>([]); // holds options for job family filter
  const [jobStreamFilterData, setJobStreamOptions] = useState<SelectOption[]>([]); // holds options for job family filter
  const [jobRoleTypeFilterData, setjobRoleTypeOptions] = useState<SelectOption[]>([]);
  // const [professionAndDisciplineFilterData, setProfessionAndDisciplineOptions] = useState<ClassificationOption[]>([]);
  const [ministriesFilterData, setMinistriesOptions] = useState<MinistriesOption[]>([]);

  const [initialSelectionSet, setInitialSelectionSet] = useState(false); // used to prevent initial selections from being overwritten

  // Get the base path for the current route
  const getBasePath = useCallback(
    (path: string) => {
      if (isPositionRequestRoute) return location.pathname.split('/').slice(0, 4).join('/');

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
      const newOptions = classificationData.map((classification) => {
        const { id, employee_group_id, code, peoplesoft_id, name } = classification;

        return {
          label: `${name} (${employee_group_id})`,
          value: `${id}.${employee_group_id}.${peoplesoft_id}`,
          // Add searchable data
          data: {
            name: name,
            code: code,
          },
        };
      });
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
    if (jobProfileStreamsData) {
      const newOptions = jobProfileStreamsData.jobProfileStreams.map((stream: JobProfileStreamModel) => ({
        label: stream.name,
        value: stream.id.toString(),
      }));
      setJobStreamOptions(newOptions);
    }
  }, [jobProfileStreamsData]);

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

  // Update the job role type Select components when data changes
  useEffect(() => {
    if (jobRoleTypeData) {
      const newOptions = jobRoleTypeData.map((classification) => ({
        label: classification.name,
        value: classification.id.toString(),
      }));
      setjobRoleTypeOptions(newOptions);
    }
  }, [jobRoleTypeData]);

  // Update the Select components when selections change
  // const selectedProfessionAndDisciplineFamily = allSelections.filter((s) => s.type === 'professionAndDiscipline').map((s) => s.value);
  const selectedJobRoleType = allSelections.filter((s) => s.type === 'jobRoleType').map((s) => s.value);
  const selectedClassification = allSelections.filter((s) => s.type === 'classification').map((s) => s.value);
  // const selectedCareerGroup = allSelections.filter((s) => s.type === 'careerGroup').map((s) => s.value);
  const selectedMinistry = allSelections.filter((s) => s.type === 'ministry').map((s) => s.value);

  // Find the label for a given value
  const findLabel = (value: any, type: any) => {
    if (type === 'jobFamily') {
      return jobFamilyFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'jobRoleType') {
      return jobRoleTypeFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'jobStream') {
      return jobStreamFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'classification') {
      return classificationFilterData.find((option) => option.value === value)?.label || value;
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
    const jobStreamParams = decodeURIComponent(searchParams.get('job_stream_id__in') || '')
      .split(',')
      .filter(Boolean);
    const jobRoleTypeParams = decodeURIComponent(searchParams.get('job_role_type_id__in') || '')
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
      ...jobRoleTypeParams.map((value) => ({ value, type: 'jobRoleType' })),
      ...jobStreamParams.map((value) => ({ value, type: 'jobStream' })),
      ...classificationParams.map((value) => ({ value, type: 'classification' })),
      // ...careerGroupParams.map((value) => ({ value, type: 'careerGroup' })),
      ...ministriesParams.map((value) => ({ value, type: 'ministry' })),
    ];
    if (!initialSelectionSet) {
      setAllSelections(initialSelections);
      setInitialSelectionSet(true);
    }
  }, [searchParams, initialSelectionSet, setInitialSelectionSet]);

  // user updated filters, now update the search params to reflect that
  useEffect(() => {
    if (!initialSelectionSet) return;

    // get filters from allSelections (these are the tags that are displayed on the page)
    const jobFamilyValues = allSelections
      .filter((s) => s.type === 'jobFamily')
      .map((s) => s.value)
      .join(',');
    const jobStreamValues = allSelections
      .filter((s) => s.type === 'jobStream')
      .map((s) => s.value)
      .join(',');
    const jobRoleTypeValues = allSelections
      .filter((s) => s.type === 'jobRoleType')
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
    const idFromUrl = searchParams.get('id');
    const versionFromUrl = searchParams.get('version');
    const pageSizeFromURL = searchParams.get('pageSize');
    const sortFieldFromURL = searchParams.get('sortField');
    const sortOrderFromURL = searchParams.get('sortOrder');

    // construct new url params
    // Update URL parameters if needed
    if (selectedProfileFromUrl) newSearchParams.set('selectedProfile', selectedProfileFromUrl);

    if (pageFromURL != 1) newSearchParams.set('page', pageFromURL.toString());
    if (searchFromURL) newSearchParams.set('search', searchFromURL.toString());
    if (pageSizeFromURL) newSearchParams.set('pageSize', pageSizeFromURL.toString());
    if (sortFieldFromURL) newSearchParams.set('sortField', sortFieldFromURL.toString());
    if (sortOrderFromURL) newSearchParams.set('sortOrder', sortOrderFromURL.toString());

    if (jobFamilyValues) newSearchParams.set('job_family_id__in', jobFamilyValues);
    if (jobRoleTypeValues) newSearchParams.set('job_role_type_id__in', jobRoleTypeValues);
    if (jobStreamValues) newSearchParams.set('job_stream_id__in', jobStreamValues);
    if (classificationValues) newSearchParams.set('classification_id__in', classificationValues);
    // if (careerGroupValues) newSearchParams.set('career_group_id__in', careerGroupValues);
    if (ministryValues) newSearchParams.set('ministry_id__in', ministryValues);
    if (idFromUrl) newSearchParams.set('id', idFromUrl);
    if (versionFromUrl) newSearchParams.set('version', versionFromUrl);

    const jobFamilyChanged = newSearchParams.get('job_family_id__in') != searchParams.get('job_family_id__in');
    const jobStreamChanged = newSearchParams.get('job_stream_id__in') != searchParams.get('job_stream_id__in');
    const jobRoleTypeChanged = newSearchParams.get('job_role_type_id__in') != searchParams.get('job_role_type_id__in');
    const classificationChanged =
      newSearchParams.get('classification_id__in') != searchParams.get('classification_id__in');

    // const careerGroupChanged = newSearchParams.get('career_group_id__in') != searchParams.get('career_group_id__in');
    const ministryChanged = newSearchParams.get('ministry_id__in') != searchParams.get('ministry_id__in');

    // If the job family or classification filters have changed, de-select the selected profile
    if (jobFamilyChanged || classificationChanged || ministryChanged || jobRoleTypeChanged || jobStreamChanged) {
      // do not run this if we're clearing filters - in that case we want to have the profile still selected
      if (clearingFilters) {
        return;
      }
      newSearchParams.set('page', '1');
      newSearchParams.delete('selectedProfile');
      // console.log('navigating.. B', getBasePath(location.pathname), 'searchParams: ', searchParams.toString());

      navigate(
        {
          pathname: getBasePath(location.pathname),
          search: newSearchParams.toString(),
        },
        { replace: true },
      );
    } else {
      // filters did not change, but some other parameters did
      // Only update search params if there's a change
      if (searchParams.toString() !== newSearchParams.toString()) {
        // console.log('navigating.. A', getBasePath(location.pathname), newSearchParams.toString());
        // console.log('search params were: ', searchParams.toString());
        // console.log('search params now: ', newSearchParams.toString());

        navigate(
          {
            pathname: getBasePath(location.pathname),
            search: newSearchParams.toString(),
          },
          { replace: true },
        );
      }
    }
  }, [allSelections, initialSelectionSet, searchParams, setSearchParams, location.pathname, navigate, getBasePath]); //]);

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
    searchParams.delete('page');

    if (trimmedValue.length === 0) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', trimmedValue);
    }

    // Get the current URL and split the path
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);

    // Check if the path follows the pattern '/job-profiles/<id>'
    let basePath = currentPath;
    if (pathSegments.length === 2 && pathSegments[0] === 'job-profiles' && !isNaN(parseInt(pathSegments[1], 10))) {
      basePath = `/${pathSegments[0]}`;
    }

    // console.log('handle search navigate: ', basePath, searchParams.toString());
    navigate(
      {
        pathname: basePath,
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  useEffect(() => {
    // if searchparams has clear filters flag, do that
    if (clearingFilters) {
      // console.log('CLEARING FILTERS: ', clearingFilters);
      setAllSelections([]);
      setClearingFilters(false);
      // console.log('setSearchParams A: ', searchParams);
      // setSearchParams(searchParams);
    }
  }, [setAllSelections, clearingFilters, setClearingFilters]); // searchParams, setSearchParams,

  useEffect(() => {
    if (clearingSearch) {
      setSearchText('');
      handleSearch('');
      setClearingSearch(false);
    }
  }, [clearingSearch, setClearingSearch, setSearchText, handleSearch]);

  const clearFilters = () => {
    // console.log('clearFilters');
    // setAllSelections([]);

    // Update the URL parameters
    const newSearchParams = new URLSearchParams();

    // do not preserve the page when resetting filters - go to page 1
    // const pageFromUrl = searchParams.get('page');
    // if (pageFromUrl) newSearchParams.set('page', pageFromUrl);

    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) newSearchParams.set('search', searchFromUrl);

    // console.log('setting clearing filters 1');
    setClearingFilters(true);
    // newSearchParams.set('clearFilters', 'true');
    // setSearchParams(newSearchParams);

    // console.log('location.pathname: ', location.pathname);
    // const basePath = getBasePath(location.pathname);

    // search is used on saved profiles, explore profiles, wizard profiles, draft profiles and published profiles
    // saved:
    // - /job-profiles/saved?selectedProfile=304
    // - /job-profiles/saved/101
    // wizard:
    // - /requests/positions/360?selectedProfile=304
    // explore:
    // /job-profiles/saved/304

    const selectedProfileFromUrl = searchParams.get('selectedProfile');

    const selectedProfileFromPath =
      !isPositionRequestRoute && !isNaN(Number(location.pathname.split('/').pop()))
        ? location.pathname.split('/').pop()
        : null;

    const basePath = getBasePath(location.pathname);
    // console.log('basePath: ', basePath);

    // if profile is currently selected, leave it selected (depending if either selectedProfileFromUrl or selectedProfileFromPath is set)
    // if it's selectedProfileFromUrl, then navigate to ?selectedProfile=selectedProfileFromUrl
    // if it's selectedProfileFromPath, then navigate to basePath/selectedProfileFromPath

    // console.log('selectedProfileFromUrl: ', selectedProfileFromUrl, selectedProfileFromPath);

    // console.log('selectedProfileFromPath: ', selectedProfileFromPath);
    let navigateToPath = selectedProfileFromPath ? `${basePath}/${selectedProfileFromPath}` : basePath;

    if (selectedProfileFromUrl) {
      // console.log('selectedProfileFromUrl')
      if (isPositionRequestRoute) {
        // console.log('isPositionRequestRoute')
        navigateToPath = `${basePath}`;
        newSearchParams.set('selectedProfile', selectedProfileFromUrl);
      } else {
        // console.log('not isPositionRequestRoute')
        navigateToPath = `${basePath}/${selectedProfileFromUrl}`;
      }
    } else {
      // console.log('not selectedProfileFromUrl')
    }

    // console.log('navigateToPath: ', navigateToPath);
    // console.log('newSearchParams: ', newSearchParams.toString());

    // console.log('clearing filters navigate: ', navigateToPath, newSearchParams.toString());
    navigate(
      {
        pathname: navigateToPath,
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
  // console.log('allSelections: ', allSelections);

  const selectedJobFamilyValues = allSelections
    .filter((selection) => selection.type === 'jobFamily')
    .map((selection) => `job_family-${selection.value}`);

  const selectedJobStreamValues = allSelections
    .filter((selection) => selection.type === 'jobStream')
    .map((selection) => `stream-${selection.value}`);

  const treeSelectValues = [...selectedJobFamilyValues, ...selectedJobStreamValues];
  // console.log('treeSelectValues: ', treeSelectValues);

  return (
    <Row
      justify="center"
      gutter={8}
      style={{ zIndex: 2, position: 'relative' }}
      role="search"
      data-testid="job-profile-search"
    >
      <Form style={{ width: '100%' }}>
        <Col sm={24} md={24} lg={24} xl={24} xxl={fullWidth ? 24 : 22}>
          <Card style={{ marginTop: '1rem', marginBottom: '1rem', borderColor: '#D9D9D9' }} bordered={true}>
            <Row gutter={24}>
              <Col xl={6} lg={8} md={12} sm={24}>
                <Search
                  // defaultValue={searchParams.get('search') ?? undefined}
                  enterButton="Find job profiles"
                  aria-label={searchPlaceHolderText}
                  onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                  // allowClear
                  placeholder={searchPlaceHolderText}
                  onSearch={handleSearch}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  value={searchText}
                  onBlur={() => {
                    // doing on this blur causes unexpected behaviour when using keyboard navigation
                    // for example there may be previously selected profile, then when user tabs through the fields
                    // it gets deselected
                    // handleSearch(searchText);
                  }}
                  suffix={
                    <Tooltip placement="top" title={'Clear search'}>
                      <CloseCircleFilled
                        style={{ fontSize: '0.8rem', color: '#bfbfbf', display: searchText == '' ? 'none' : 'block' }}
                        onClick={() => {
                          setSearchText('');
                          handleSearch('');
                        }}
                      />
                    </Tooltip>
                  }
                  // style={{ width: fullWidth ? 500 : 400 }}
                />
              </Col>

              <Col xl={18} lg={16} md={12} sm={24}>
                <Row gutter={8} justify="end">
                  {ministriesFilterData.length > 1 && (
                    <Col data-testid="Ministry-filter" data-cy="Ministry-filter">
                      {/* dragon naturally speaking doesn't pick up on aria-label alone */}
                      <Form.Item label="Ministries" className="sr-only-label" style={{ marginBottom: '0' }}>
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
                          aria-label="Ministries"
                          placeholder="Ministries"
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
                      </Form.Item>
                    </Col>
                  )}
                  <Col data-testid="Job Family-filter" data-cy="Job Family-filter">
                    <AccessibleTreeSelect
                      width={'300px'}
                      placeholderText={'Profession and Discipline'}
                      treeData={JSON.parse(JSON.stringify(treeData))}
                      treeValue={treeSelectValues}
                      onChange={(selectedItems) => {
                        // separate selectedItems into jobFamily and jobStream
                        const selectedJobFamilies: any[] = [];
                        const selectedJobStreams: any[] = [];

                        selectedItems.forEach((item: any) => {
                          if (item.startsWith('job_family-')) {
                            // Extract the job family ID and store it
                            selectedJobFamilies.push(item.replace('job_family-', ''));
                          } else if (item.startsWith('stream-')) {
                            // Extract the job stream ID and store it
                            selectedJobStreams.push(item.replace('stream-', ''));
                          }
                        });

                        // console.log('tree on change: ', selectedJobFamilies, selectedJobStreams);

                        const selections: { value: any; type: string }[] = [];
                        const newValues = selectedJobFamilies;
                        if (newValues != null) {
                          newValues.forEach((val: any) => {
                            selections.push({ value: val, type: 'jobFamily' });
                          });
                        }

                        // console.log('selectedJobStream: ', selectedJobStream);
                        const newValues2 = selectedJobStreams;
                        if (newValues2 != null) {
                          newValues2.forEach((val: any) => {
                            selections.push({ value: val, type: 'jobStream' });
                          });
                        }

                        // console.log('selections: ', selections);

                        // remove previous settings and set new ones
                        // get all the unique types from the selections, removing duplicates
                        const types = ['jobStream', 'jobFamily'];

                        // remove these types from the current selections
                        const cleanedSelections = allSelections.filter((selection) => !types.includes(selection.type));

                        // selections has value and type
                        const newSelections = selections.map((item: any) => ({ value: item.value, type: item.type }));

                        // console.log('cleaned, new: ', cleanedSelections, newSelections);
                        setAllSelections([...cleanedSelections, ...newSelections]);
                      }}
                    />
                  </Col>
                  <Col data-testid="Job role type-filter" data-cy="Job role type-filter">
                    {/* dragon naturally speaking doesn't pick up on aria-label alone */}
                    <Form.Item label="Role" className="sr-only-label" style={{ marginBottom: '0' }}>
                      <Select
                        closeMenuOnSelect={false}
                        isClearable={false}
                        backspaceRemovesValue={false}
                        hideSelectedOptions={false}
                        value={jobRoleTypeFilterData.filter((jf) =>
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
                        placeholder="Role"
                        aria-label="Role"
                        options={jobRoleTypeFilterData}
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
                    </Form.Item>
                  </Col>
                  <Col data-testid="Classification-filter" data-cy="Classification-filter">
                    {/* dragon naturally speaking doesn't pick up on aria-label alone */}
                    <Form.Item label="Classification" className="sr-only-label" style={{ marginBottom: '0' }}>
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
                          menu: (base) => ({
                            ...base,
                            width: 'max-content',
                            minWidth: '100%',
                            right: 0, // since it's near the edge of the screen, this prevents it from showing horizontal scroll
                          }),
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
                        filterOption={(option, inputValue) => {
                          const searchTerm = inputValue.toLowerCase();
                          const searchTermNoSpaces = searchTerm.replace(/\s+/g, '');
                          const name = option.data.data.name.toLowerCase();
                          const nameNoSpaces = name.replace(/\s+/g, '');
                          const code = option.data.data.code.toLowerCase();
                          const codeNoSpaces = code.replace(/\s+/g, '');

                          // Regular matching
                          const regularMatch =
                            name.includes(searchTerm) ||
                            code.includes(searchTerm) ||
                            `${name} ${code}`.includes(searchTerm);

                          // No-spaces matching
                          const noSpacesMatch =
                            nameNoSpaces.includes(searchTermNoSpaces) ||
                            codeNoSpaces.includes(searchTermNoSpaces) ||
                            `${nameNoSpaces}${codeNoSpaces}`.includes(searchTermNoSpaces);

                          return regularMatch || noSpacesMatch;
                        }}
                      ></Select>
                    </Form.Item>
                  </Col>

                  {/* if filters contains careerGroup, then render it */}
                  {/* {additionalFilters && (
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
                )} */}
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
                    closeIcon={
                      <Button
                        type="link"
                        size="small"
                        style={{ padding: '0', width: 'auto', height: 'auto' }}
                        icon={
                          <CloseOutlined aria-hidden style={{ fontSize: '0.7rem', color: 'rgba(0, 0, 0, 0.88)' }} />
                        }
                        aria-label={`Remove ${findLabel(selection.value, selection.type)} filter`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            removeSelection(selection.value, selection.type);
                          }
                        }}
                      />
                    }
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
      </Form>
    </Row>
  );
};
