import { Button, List, Modal, Typography } from 'antd';
const { Text } = Typography;

const shortcuts = [
  { key: 'Arrow Up', description: 'Move to parent node' },
  { key: 'Arrow Down', description: 'Move to first child node' },
  { key: 'Arrow Left', description: 'Move to previous sibling node' },
  { key: 'Arrow Right', description: 'Move to next sibling node' },
  { key: 'Tab', description: 'Navigate forward through nodes and buttons' },
  { key: 'Shift + Tab', description: 'Navigate backward through nodes and buttons' },
  { key: 'Escape', description: 'Focus on search input' },
  { key: '?', description: 'Show keyboard shortcuts' },
];

export const OrgChartKeyboardShortcutsModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => (
  <Modal
    title="Keyboard Shortcuts"
    open={isVisible}
    onCancel={onClose}
    footer={[
      <Button key="close" onClick={onClose}>
        Close
      </Button>,
    ]}
  >
    <List
      dataSource={shortcuts}
      renderItem={(item) => (
        <List.Item>
          <Text strong>{item.key}:</Text> {item.description}
        </List.Item>
      )}
    />
  </Modal>
);
