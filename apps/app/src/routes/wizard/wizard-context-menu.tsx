import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Modal, Typography, message } from 'antd';
import { useState } from 'react';
import AccessiblePopoverMenu from '../../components/app/common/components/accessible-popover-menu';
import LoadingComponent from '../../components/app/common/components/loading.component';
import { useDeletePositionRequestMutation } from '../../redux/services/graphql-api/position-request.api';

interface WizardMenuProps {
  positionRequestId?: number | null;
  onSaveAndQuit: () => void;
  onNavigateHome: () => void;
  shareableLink?: string;
  positionRequestStatus?: string;
}

export const WizardContextMenu: React.FC<WizardMenuProps> = ({
  positionRequestId,
  onSaveAndQuit,
  onNavigateHome,
  shareableLink,
  positionRequestStatus,
}) => {
  const [deletePositionRequest] = useDeletePositionRequestMutation();
  const [saveAndQuitLoading, setSaveAndQuitLoading] = useState(false);

  const handleDelete = async () => {
    if (!positionRequestId) return;

    Modal.confirm({
      title: 'Delete Position Request',
      content: 'Do you want to delete the position request?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        await deletePositionRequest({ id: positionRequestId });
        onNavigateHome();
      },
    });
  };

  const handleCopyLink = async () => {
    if (shareableLink) {
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/requests/positions/share/${shareableLink}`);
        message.success('Link copied to clipboard');
      } catch (err) {
        message.error('Failed to copy link');
      }
    }
  };

  const saveAndQuit = async () => {
    setSaveAndQuitLoading(true);
    try {
      await onSaveAndQuit();
    } finally {
      setSaveAndQuitLoading(false);
    }
  };

  const MenuContent = () => (
    <Menu className="wizard-menu">
      <Menu.Item key="save" onClick={saveAndQuit} disabled={saveAndQuitLoading} data-testid="save-and-quit">
        <div style={{ position: 'relative' }}>
          {saveAndQuitLoading && (
            <div
              style={{
                position: 'absolute',
                top: '0',
                height: '100%',
                width: '100%',
                background: '#ffffffa8',
              }}
            >
              <div
                style={{
                  margin: 'auto',
                  display: 'block',
                  marginTop: '13px',
                  textAlign: 'center',
                }}
              >
                <LoadingComponent mode="small" />
              </div>
            </div>
          )}

          <div style={{ padding: '5px 0' }}>
            Save and quit
            <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
              Saves your progress. You can access this position request from the 'My Position Requests' page.
            </Typography.Text>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="copy" onClick={handleCopyLink}>
        <div style={{ padding: '5px 0' }}>
          Copy link
          <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
            Users can access a read-only version of the request through this link.
          </Typography.Text>
        </div>
      </Menu.Item>
      {positionRequestStatus === 'DRAFT' && (
        <>
          <Menu.Divider />
          <Menu.ItemGroup key="others" title={<b>Others</b>}>
            <Menu.Item key="delete" onClick={handleDelete}>
              <div style={{ padding: '5px 0' }}>
                Delete
                <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                  Removes this position request from 'My Position Requests'. This action is irreversible.
                </Typography.Text>
              </div>
            </Menu.Item>
          </Menu.ItemGroup>
        </>
      )}
    </Menu>
  );

  return (
    <AccessiblePopoverMenu
      key="menu"
      triggerButton={<Button data-testid="ellipsis-menu" tabIndex={-1} icon={<EllipsisOutlined />} />}
      content={<MenuContent />}
      ariaLabel="Open position request menu"
    />
  );
};
