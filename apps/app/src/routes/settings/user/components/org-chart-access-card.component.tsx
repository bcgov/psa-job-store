import { Card, Col, Row, Typography } from 'antd';
import Fuse from 'fuse.js';
import { useCallback, useMemo } from 'react';
import { PicklistOption } from '../../../../components/shared/picklist/components/picklist-options';
import { Picklist } from '../../../../components/shared/picklist/picklist.component';
import { User } from '../../../../redux/services/graphql-api/settings/dtos/user.dto';
import { useSettingsContext } from '../../hooks/use-settings-context.hook';

const { Paragraph, Text } = Typography;

interface OrgChartAccessCardProps {
  user?: User;
}

export const OrgChartAccessCard = ({ user }: OrgChartAccessCardProps) => {
  const {
    organizations: {
      data: organizations,
      //  departments,
      //  isLoading
    },
  } = useSettingsContext();

  const options: PicklistOption[] = useMemo(() => {
    return [
      ...((organizations ? [...organizations] : [])
        .filter((o) => o.departments.filter((d) => d.effective_status === 'Active').length > 0)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((organization) => ({
          type: 'group',
          text: organization.name,
          items: [...organization.departments]
            .filter((d) => d.effective_status === 'Active')
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((d) => {
              return {
                type: 'item',
                text: d.name,
                value: d.id,
              };
            }),
        })) as PicklistOption[]),

      {
        type: 'item',
        text: 'Item',
        value: '112-0074',
      },
    ];
  }, [organizations]);

  const picklistOnSearch = useCallback(
    (value: string | undefined): PicklistOption[] => {
      if (value == null) return [];

      const groupedDepartmentIdSearch = new Fuse(
        options.filter((option) => option.type === 'group'),
        {
          keys: ['items.value'],
          includeMatches: true,
          includeScore: true,
          threshold: 0,
        },
      );

      const rootDepartmentIdSearch = new Fuse(
        options.filter((option) => option.type === 'item'),
        {
          keys: ['value'],
          includeMatches: true,
          includeScore: true,
          threshold: 0,
        },
      );

      return [
        ...groupedDepartmentIdSearch.search(value).map((r) => r.item),
        ...rootDepartmentIdSearch.search(value).map((r) => r.item),
      ];
    },
    [options],
  );

  return (
    <Row justify="center">
      <Col xs={24} sm={16} md={16} lg={16} xl={16}>
        <Card>
          <Text strong>Org Chart</Text>
          <Paragraph type="secondary">
            By default, users have access to their base department as defined in PeopleSoft. You can provide access to
            additional departments below.
          </Paragraph>
          <Picklist
            options={options}
            searchProps={{
              onSearch: picklistOnSearch,
              placeholder: 'Search by Department ID or Name',
            }}
            selectedOptions={user?.metadata.org_chart.department_ids ?? []}
            title="Update Org Chart Access"
            trigger={{
              text: 'Update Org Chart Access',
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};
