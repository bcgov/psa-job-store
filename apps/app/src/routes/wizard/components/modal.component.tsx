import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export const WizardModal = (
  title: string,
  alertShown: boolean,
  setShown: (shown: boolean) => void,
  action: () => void,
  showCancel: boolean,
  isSignificant?: boolean,
) => {
  if (!alertShown && (isSignificant || isSignificant === undefined)) {
    setShown(true);
    Modal.confirm({
      title: title,
      content: (
        <div role="alert">
          Amendments to the generic profile will require verification. If you would like to continue to make changes,
          please click proceed.
        </div>
      ),
      okText: 'Proceed',
      cancelText: 'Cancel',
      onOk: action,
      onCancel: () => Modal.destroyAll(),
      // The following props are set to style the modal like a warning
      icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
      okButtonProps: { style: {} },
      cancelButtonProps: { style: showCancel ? {} : { display: 'none' } },
      autoFocusButton: null,
    });
  } else {
    action();
  }
};
