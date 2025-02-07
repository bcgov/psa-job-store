import { Alert, Typography } from 'antd';
import { useTypedSelector } from '../../redux/redux.hooks';

const { Text } = Typography;

export const MissingCRMAccountAlert = () => {
  const auth = useTypedSelector((state) => state.authReducer);

  return (
    (auth.user?.metadata?.crm?.contact_id || null) == null && (
      <Alert
        message={
          <>
            <Text strong>Error:</Text>
            <Text>
              You do not have a valid AskMyHR/CRM account which is required to submit New Position requests. Please
              contact the 7-7000 Service Desk at{' '}
              <a href="tel://+12503877000" target="_blank">
                (250) 387-7700
              </a>{' '}
              or{' '}
              <a href="mailto://77000@gov.bc.ca" target="_blank">
                77000@gov.bc.ca
              </a>
              .
            </Text>
          </>
        }
        showIcon
        type="error"
      />
    )
  );
};
