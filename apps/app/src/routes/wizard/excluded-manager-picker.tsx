import { Col, Empty, Form, Row, Select, Space } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useGetSuggestedManagersQuery } from '../../redux/services/graphql-api/position-request.api';
import { PositionProfileModel } from '../../redux/services/graphql-api/position.api';
import { useLazySearchUsersQuery } from '../../redux/services/graphql-api/user.api';
import { WizardConfirmDetailsModel } from './wizard-confirm-details.page';

interface ExcludedManagerPickerProps {
  control: Control<WizardConfirmDetailsModel, any>;
  errors: any;
  positionNumber?: string;
  positionRequestId?: number;
}

interface ManagerOption {
  value: string;
  label: string;
  position?: PositionProfileModel;
}

export const ExcludedManagerPicker: React.FC<ExcludedManagerPickerProps> = ({
  control,
  errors,
  positionNumber,
  positionRequestId,
}) => {
  const [searchResults, setSearchResults] = useState<ManagerOption[]>([]);
  // console.log('control._formValues?.excludedManagerName: ', control._formValues?.excludedManagerName);
  const [selectedOption, setSelectedOption] = useState<ManagerOption | null>(
    !control._formValues?.excludedManagerName
      ? null
      : {
          value: `${control._formValues?.excludedManagerPositionNumber}|${control._formValues?.excludedManagerName}`,
          label: `${control._formValues?.excludedManagerPositionNumber} ${control._formValues?.excludedManagerName}`,
        },
  );
  // console.log('selectedOption: ', selectedOption);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [totalResults, setTotalResults] = useState<number>(0);

  const {
    data: suggestedManagers,
    isLoading: suggestedIsLoading,
    isFetching: suggestedIsFetching,
  } = useGetSuggestedManagersQuery(
    {
      positionNumber,
      positionRequestId,
    },
    { skip: !positionNumber || !positionRequestId },
  );

  // console.log('suggestedManagers: ', suggestedManagers, suggestedIsLoading, suggestedIsFetching);

  const [searchUsers] = useLazySearchUsersQuery();

  const handleSearch = useCallback(
    debounce(async (searchText: string) => {
      console.log('debounce search text: ', searchText);
      setSearchText(searchText);

      if (!searchText) {
        setSearchResults([]);
        setTotalResults(0);
        return;
      }

      if (searchText.length < 2) return;
      setIsLoading(true);
      try {
        console.log('searching users..');
        const response = await searchUsers(searchText).unwrap();
        console.log('searchUsers response: ', response);

        if (response?.searchUsers.results.length > 0) {
          const activePositions = response.searchUsers.results.map((result) => ({
            value: `${result.position_number}|${result.name}`,
            label: `${result.position_number} ${result.name}`,
            key: `sr${result.position_number}|${result.name}`,
          }));
          setSearchResults(activePositions);
          setTotalResults(response.searchUsers.numberOfResults);
        } else {
          setSearchResults([]);
          setTotalResults(0);
        }
      } catch (error) {
        setSearchResults([]);
        setTotalResults(0);
        console.error('Error searching users:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [searchUsers],
  );

  // Transform suggestions into grouped format
  const options = useMemo(() => {
    // console.log('constructing options, suggestedManagers: ', suggestedManagers);
    const groups = [];

    // Create a suggestions group that includes both suggested managers and the selected option
    const suggestedOptions = [
      ...(suggestedManagers?.suggestedManagers || []).map(
        (manager) =>
          ({
            value: `${manager.positionNumber}|${manager.name}`,
            label: `${manager.positionNumber} ${manager.name}`,
          }) as unknown as ManagerOption,
      ),
      ...(selectedOption &&
      !suggestedManagers?.suggestedManagers.some(
        (manager) => `${manager.positionNumber}|${manager.name}` === selectedOption.value,
      )
        ? [selectedOption]
        : []),
    ];

    // console.log('suggestedOptions: ', suggestedOptions);

    const totalOptions = suggestedOptions.length + searchResults.length;
    let currentPosition = 1;

    // Show Search Results section when loading, has results, or has performed a search
    if (isLoading || searchResults.length > 0 || searchText) {
      groups.push({
        label: <div role="presentation">Search Results</div>,
        options: isLoading
          ? [{ value: 'loading', label: 'Loading...', disabled: true }]
          : searchResults.length > 0
            ? [
                ...searchResults.map((option) => ({
                  ...option,
                  'aria-label': `${option.label} - Search Result`,
                  'aria-setsize': totalOptions,
                  'aria-posinset': currentPosition++,
                })),
                ...(totalResults > 10
                  ? [
                      {
                        value: 'more-results',
                        label:
                          'Additional results may be available. Please refine your search to see more specific matches.',
                        disabled: true,
                      },
                    ]
                  : []),
              ]
            : [{ value: 'no-results', label: 'No results found', disabled: true }],
      });
    }

    if (suggestedOptions.length > 0) {
      groups.push({
        label: <div role="presentation">Suggestions</div>,
        options: suggestedOptions.map((option) => ({
          ...option,
          'aria-label': `${option.label} - Suggestion`,
          'aria-setsize': totalOptions,
          'aria-posinset': currentPosition++,
        })),
      });
    }

    // console.log('groups: ', groups);
    return groups;
  }, [searchResults, suggestedManagers, selectedOption, isLoading]);

  // console.log(
  //   'isLoading || suggestedIsLoading || suggestedIsFetching: ',
  //   isLoading,
  //   suggestedIsLoading,
  //   suggestedIsFetching,
  // );
  return (
    <Row justify="start">
      <Col xs={24} sm={24} md={24} lg={18} xl={12}>
        <Form.Item
          style={{ margin: 0 }}
          name="firstLevelExcludedManagerAndName"
          validateStatus={errors.excludedManagerPositionNumberAndName ? 'error' : ''}
          help={errors.excludedManagerPositionNumberAndName?.message}
        >
          <div aria-live="polite" style={{ height: '0' }}>
            {isLoading
              ? 'Loading search results'
              : searchResults.length
                ? `${searchResults.length} results found`
                : searchText
                  ? 'No results found'
                  : ''}
          </div>
          <Controller
            name="excludedManagerPositionNumberAndName"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <Select
                  aria-label="Select the excluded manager who approved the use of the job profile."
                  showSearch
                  value={value}
                  onBlur={onBlur}
                  onChange={(newValue, option) => {
                    // Store the selected option
                    console.log('on change option: ', option);
                    setSelectedOption(option as unknown as ManagerOption);
                    setSearchResults([]);
                    setSearchText('');
                    onChange(newValue);
                    setTotalResults(0);
                  }}
                  onSearch={handleSearch}
                  loading={isLoading}
                  filterOption={false}
                  options={options}
                  placeholder="Select an excluded manager"
                  style={{ width: '100%' }}
                  notFoundContent={
                    isLoading || suggestedIsLoading || suggestedIsFetching ? (
                      <span style={{ margin: '8px 13px 0 13px' }} aria-live="polite">
                        Loading...
                      </span>
                    ) : (
                      <Empty
                        style={{ margin: '10px' }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No suggestions"
                      />
                    )
                  }
                  defaultActiveFirstOption={false}
                  optionRender={(option) => (
                    <Space direction="vertical" size={0}>
                      <div>{option.data.label}</div>
                      {/* {option.data.description && (
                        <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                          {option.data.description}
                        </Typography.Text>
                      )} */}
                    </Space>
                  )}
                  onDropdownVisibleChange={(open) => {
                    if (!open) {
                      setSearchResults([]);
                      setSearchText('');
                      setTotalResults(0);
                    }
                  }}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <hr
                        style={{ margin: '8px 13px 0 13px', color: '#ccc', border: '0', borderTop: '1px solid #ccc' }}
                      ></hr>
                      <div style={{ padding: '8px 12px', color: '#666', fontStyle: 'italic' }}>
                        For more options, search by name or position number.
                      </div>
                    </div>
                  )}
                />
              );
            }}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
