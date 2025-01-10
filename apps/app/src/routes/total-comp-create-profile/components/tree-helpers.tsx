import { useCallback } from 'react';

export const useGetAllTreeValues = () => {
  return useCallback((tree: any) => {
    const values: any = [];
    const getValues = (nodes: any) => {
      nodes.forEach((node: any) => {
        if (node.key !== node.title) {
          values.push(node.value);
        }
        if (node.children) {
          getValues(node.children);
        }
      });
    };
    getValues(tree);
    return values;
  }, []);
};
