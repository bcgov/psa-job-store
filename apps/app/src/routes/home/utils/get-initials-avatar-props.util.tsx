import { AvatarProps, Typography } from 'antd';
import uniqolor from 'uniqolor';

const { Text } = Typography;

export type InitialsAvatarProps = Pick<AvatarProps, 'children' | 'style' | 'gap'>;

export const getInitialsAvatarProps = (firstName?: string, lastName?: string): InitialsAvatarProps => {
  return {
    children: (
      <Text strong style={{ color: '#FFF' }}>
        {firstName?.[0]}
        {lastName?.[0]}
      </Text>
    ),
    gap: 16,
    style: {
      backgroundColor: uniqolor(`${firstName?.[0]}${lastName?.[0]}`, { format: 'hsl', saturation: 70, lightness: 30 })
        .color,
      flexShrink: 0,
    },
  };
};
