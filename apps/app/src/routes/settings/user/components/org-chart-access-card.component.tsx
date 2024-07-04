import { Card, Col, Row, Typography } from 'antd';
import { useMemo } from 'react';
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

  const picklistOptions: PicklistOption[] = useMemo(() => {
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
        value: 'item-value-2',
      },
      {
        type: 'item',
        text: 'Item',
        value: 'item-value-1',
      },
      {
        type: 'item',
        text: 'Item',
        value: 'item-value-0',
      },
      {
        type: 'item',
        text: 'Item',
        value: 'item-value-3',
      },
      {
        type: 'item',
        text: 'Item',
        value: 'item-value-4',
      },
      {
        type: 'item',
        text: 'Item',
        value: 'item-value-5',
      },
      {
        type: 'item',
        text: 'Item',
        value: 'item-value-6',
      },
      {
        type: 'item',
        text: 'Item',
        value: 'item-value-7',
      },
      {
        type: 'item',
        text: 'Item',
        value: 'item-value-8',
      },
      {
        type: 'item',
        text: 'Item',
        value: 'item-value-9',
      },
    ];
  }, [organizations]);

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
            options={picklistOptions}
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
