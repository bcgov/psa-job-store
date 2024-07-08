import { Card, Col, Row, Table, Typography } from 'antd';
import Fuse from 'fuse.js';
import { useCallback, useMemo } from 'react';
import { PicklistOption } from '../../../../components/shared/picklist/components/picklist-options';
import { PicklistGroupProps } from '../../../../components/shared/picklist/components/picklist-options/picklist-group.component';
import { PicklistItemProps } from '../../../../components/shared/picklist/components/picklist-options/picklist-item.component';
import { Picklist } from '../../../../components/shared/picklist/picklist.component';
import { User } from '../../../../redux/services/graphql-api/settings/dtos/user.dto';
import { useSetUserOrgChartAccessMutation } from '../../../../redux/services/graphql-api/settings/settings.api';
import { useSettingsContext } from '../../hooks/use-settings-context.hook';

const { Paragraph, Text } = Typography;

interface OrgChartAccessCardProps {
  user?: User;
}

export const OrgChartAccessCard = ({ user }: OrgChartAccessCardProps) => {
  const {
    organizations: { data: organizations, departments, isLoading: organizationsIsLoading },
  } = useSettingsContext();

  const [trigger] = useSetUserOrgChartAccessMutation();

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
    ];
  }, [organizations]);

  const picklistOnSearch = useCallback(
    (value: string | undefined): PicklistOption[] => {
      if (value == null) return [];

      const groupSearch = searchGroups(
        value,
        options.filter((option) => option.type === 'group') as PicklistGroupProps[],
      );

      const departmentSearch = searchItems(
        value,
        options.filter((option) => option.type === 'item') as PicklistItemProps[],
      );

      return [...groupSearch, ...departmentSearch];
    },
    [options],
  );

  const searchGroups = (searchTerm: string, groups: PicklistGroupProps[]) => {
    const fuseGroups = new Fuse(groups, {
      keys: ['items.value'],
      includeMatches: true,
      includeScore: true,
      threshold: 0,
    });

    const results = fuseGroups.search(searchTerm);

    // Return only explicit department matches
    return results.map((result) => {
      const group = result.item;
      const matchIndexes = (result.matches ?? []).flatMap((match) => match.refIndex as number);

      return {
        type: group.type,
        text: group.text,
        items: matchIndexes.map((index) => group.items[index]),
      };
    });
  };

  const searchItems = (searchTerm: string, items: PicklistItemProps[]) => {
    const fuse = new Fuse(items, {
      keys: ['value'],
      includeScore: true,
      threshold: 0,
    });

    const results = fuse.search(searchTerm);

    return results.map((result) => result.item);
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={16} md={16} lg={16} xl={16}>
        <Card>
          <Text strong>Org Chart</Text>
          <Paragraph type="secondary">
            By default, users have access to their base department as defined in PeopleSoft. You can provide access to
            additional departments below.
          </Paragraph>
          <Table
            bordered
            columns={[
              {
                key: 'name',
                title: 'Name',
                dataIndex: 'name',
                render: (text) => text,
                width: '50%',
              },
              {
                key: 'id',
                title: 'Department ID',
                dataIndex: 'id',
                render: (text) => text,
                width: '25%',
              },
              {
                key: 'type',
                title: 'Type',
                render: (_, record) => {
                  return record.id === user?.metadata.peoplesoft.department_id ? 'Home' : 'Additional';
                },
                width: '25%',
              },
            ]}
            dataSource={
              user && departments
                ? departments
                    .filter((department) => user.metadata.org_chart.department_ids.includes(department.id))
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                : []
            }
            loading={organizationsIsLoading}
            size="small"
          />
          <Picklist
            onSubmit={async (values) => {
              if (user != null) {
                await trigger({ id: user.id, department_ids: values });
              }
            }}
            renderItem={(item: Omit<PicklistItemProps, 'type'>) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                  <span style={{ color: '#999' }}>{item.value}</span>
                  <span>{item.text}</span>
                </div>
              );
            }}
            options={options}
            searchProps={{
              onSearch: picklistOnSearch,
              placeholder: 'Search by Department ID',
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
