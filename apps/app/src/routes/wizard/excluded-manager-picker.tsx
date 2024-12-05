import { Col, Form, Row, Select, Space, Typography } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useGetSuggestedManagersQuery } from '../../redux/services/graphql-api/position-request.api';
import { PositionProfileModel, useLazyGetPositionProfileQuery } from '../../redux/services/graphql-api/position.api';
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

  const [getPositionProfile] = useLazyGetPositionProfileQuery();
  const { data: suggestedManagers } = useGetSuggestedManagersQuery(
    {
      positionNumber,
      positionRequestId,
    },
    { skip: !positionNumber || !positionRequestId },
  );

  // Transform suggestions into grouped format
  const options = useMemo(() => {
    const groups = [];

    // Show Search Results section when loading, has results, or has performed a search
    if (isLoading || searchResults.length > 0 || searchText) {
      groups.push({
        label: 'Search Results',
        options: isLoading
          ? [{ value: 'loading', label: 'Loading...', disabled: true }]
          : searchResults.length > 0
            ? searchResults.map((option) => ({
                ...option,
              }))
            : [{ value: 'no-results', label: 'No results found', disabled: true }],
      });
    }

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

    if (suggestedOptions.length > 0) {
      groups.push({
        label: 'Suggestions',
        options: suggestedOptions,
      });
    }

    return groups;
  }, [searchResults, suggestedManagers, selectedOption, isLoading]);

  const handleSearch = useCallback(
    debounce(async (searchText: string) => {
      setSearchText(searchText); // Add this line to update searchText state

      if (!searchText) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getPositionProfile({
          positionNumber: searchText,
          uniqueKey: 'excludedManagerProfile',
          suppressGlobalError: true,
        }).unwrap();

        if (response?.positionProfile) {
          const activePositions = response.positionProfile
            .filter((p) => p.status === 'Active')
            .map((position) => ({
              value: `${position.positionNumber}|${position.employeeName}`,
              label: `${position.positionNumber} ${position.employeeName}`,
              key: `sr${position.positionNumber}|${position.employeeName}`,
              // position,
            }));
          setSearchResults(activePositions);
        } else {
          setSearchResults([]); // Ensure empty results are set when no active positions are found
        }
      } catch (error) {
        setSearchResults([]);
        console.error('Error fetching position profile:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [getPositionProfile],
  );

  return (
    <Row justify="start">
      <Col xs={24} sm={24} md={24} lg={18} xl={12}>
        <Form.Item
          style={{ margin: 0 }}
          name="firstLevelExcludedManagerAndName"
          validateStatus={errors.excludedManagerPositionNumberAndName ? 'error' : ''}
          help={errors.excludedManagerPositionNumberAndName?.message}
        >
          <Controller
            name="excludedManagerPositionNumberAndName"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                showSearch
                value={value}
                onBlur={onBlur}
                onChange={(newValue, option) => {
                  // Store the selected option
                  // console.log('on change option: ', option);
                  setSelectedOption(option as unknown as ManagerOption);
                  setSearchResults([]);
                  setSearchText('');
                  onChange(newValue);
                }}
                onSearch={handleSearch}
                loading={isLoading}
                filterOption={false}
                options={options}
                placeholder="Select an excluded manager"
                style={{ width: '100%' }}
                notFoundContent={isLoading ? 'Loading...' : 'No matches found'}
                defaultActiveFirstOption={false}
                optionRender={(option) => (
                  <Space direction="vertical" size={0}>
                    <div>{option.data.label}</div>
                    {option.data.description && (
                      <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                        {option.data.description}
                      </Typography.Text>
                    )}
                  </Space>
                )}
                onDropdownVisibleChange={(open) => {
                  if (!open) {
                    setSearchResults([]);
                    setSearchText('');
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
            )}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
