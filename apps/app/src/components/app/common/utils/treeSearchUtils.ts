// treeSearchUtils.ts

import { INode, NodeId } from 'react-accessible-treeview';
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';

// export interface TreeNode {
//   id: string;
//   name: string;
//   children: string[];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [key: string]: any;
// }

export function filterTree(
  flattenedData: INode<IFlatMetadata>[],
  searchText: string,
  treeNodeFilterProp?: string,
): INode<IFlatMetadata>[] {
  // console.log('=== filtering for value: ', searchText, flattenedData);

  const filtered = [] as INode<IFlatMetadata>[];
  const matchedIds = new Set<NodeId>();

  const includeChildren = (id: NodeId) => {
    // console.log('= includeChildren: ', id);
    flattenedData.forEach((item) => {
      if (item.parent === id) {
        let searchProp = item.name;
        if (treeNodeFilterProp) {
          if (item.metadata) searchProp = item.metadata[treeNodeFilterProp]?.toString() ?? '';
        }
        const itemMatches = searchProp.toUpperCase().includes(searchText.toUpperCase());
        if (itemMatches) {
          const newItem = {
            ...item,
            metadata: {
              ...item.metadata,
              isPartOfSearch: itemMatches,
            },
          };
          if (!filtered.find((x) => x.id === item.id)) {
            // console.log('pushing child item: ', newItem);
            filtered.push(newItem);
            if (itemMatches) {
              matchedIds.add(item.id);
            }
          }
          if (item.children.length) {
            includeChildren(item.id);
          }
        }
      }
    });
  };

  flattenedData.forEach((item) => {
    if (item.id === 0 || item.id == 'root') {
      return;
    }
    let searchProp = item.name;
    if (treeNodeFilterProp) {
      if (item.metadata) searchProp = item.metadata[treeNodeFilterProp]?.toString() ?? '';
    }

    // console.log('searchProp:', searchProp, item.id);
    const itemMatches = searchProp.toUpperCase().includes(searchText.toUpperCase());
    if (itemMatches) {
      // console.log('itemMatches: ', item);
      matchedIds.add(item.id);
      const newItem = {
        ...item,
        metadata: {
          ...item.metadata,
          isPartOfSearch: true,
        },
      };
      if (!filtered.find((x) => x.id === item.id)) {
        // console.log('pushing item: ', newItem);
        filtered.push(newItem);
      }

      if (item.children.length) {
        // console.log('item has children');
        includeChildren(item.id);
      }
    }
  });

  // Include parents of matched items
  // console.log('including parents of matched items: ', matchedIds, JSON.parse(JSON.stringify(filtered)));

  const includeParents = (item: INode<IFlatMetadata>) => {
    if (item.parent !== null && item.parent !== 0 && item.parent !== 'root') {
      const parentItem = flattenedData.find((node) => node.id === item.parent);
      if (parentItem && !filtered.find((x) => x.id === parentItem.id)) {
        filtered.push({
          ...parentItem,
          // children: [item.id],
          metadata: {
            ...parentItem.metadata,
            isPartOfSearch: false,
          },
        });
        includeParents(parentItem);
      }
    }
  };

  filtered.forEach((item) => {
    if (matchedIds.has(item.id)) {
      includeParents(item);
    }
  });

  // remove root node that may have been added
  const rootIndex = filtered.findIndex((item) => item.id === 0);
  if (rootIndex > -1) {
    filtered.splice(rootIndex, 1);
  }

  // add root node
  // console.log('before add root node: ', JSON.parse(JSON.stringify(filtered)));
  const rootNode = flattenedData.find((item) => item.parent === null);

  if (!rootNode) throw new Error('Root node not found');

  // console.log('rootNode: ', rootNode);
  const rootChildren = rootNode.children.filter((id) => filtered.find((fitem) => fitem.id === id));
  // console.log('rootChildren: ', rootChildren);

  filtered.unshift(
    Object.assign({
      ...rootNode,
      children: rootChildren,
      metadata: {
        ...rootNode.metadata,
        isPartOfSearch: false, // Root is never part of the search
      },
    }),
  );

  // console.log('after add root node: ', JSON.stringify(filtered, null, 2));

  // Remove duplicates
  const uniqueFiltered = Array.from(new Map(filtered.map((item) => [item.id, item])).values());

  // console.log('before remove children: ', JSON.parse(JSON.stringify(uniqueFiltered)));

  // remove any items in children that are not in the filtered list
  uniqueFiltered.forEach((item) => {
    item.children = item.children.filter((childId) => uniqueFiltered.find((fitem) => fitem.id === childId));
  });

  // Sort the filtered items to ensure correct hierarchy
  uniqueFiltered.sort((a, b) => {
    if (a.parent === null) return -1;
    if (b.parent === null) return 1;
    return (a.parent as number) - (b.parent as number);
  });

  // console.log('search result: ', uniqueFiltered);
  return uniqueFiltered;
}
