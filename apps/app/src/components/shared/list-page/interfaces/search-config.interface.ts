import { SearchProps } from 'antd/es/input';

export interface SearchConfig {
  enterButton?: SearchProps['enterButton'];
  fields: string[];
  placeholder?: SearchProps['placeholder'];
}
