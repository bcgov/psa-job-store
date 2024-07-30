import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';
import { Select } from 'antd';
import { BaseSelectRef } from 'rc-select';
import { useEffect, useRef, useState } from 'react';
import TreeView, { INode, NodeId, flattenTree } from 'react-accessible-treeview';
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';
import './accessible-tree-select.css';

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => {
  if (isOpen) return <CaretDownFilled style={{ fontSize: '0.6rem' }} aria-hidden />;
  else return <CaretRightFilled style={{ fontSize: '0.6rem' }} aria-hidden />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckBoxIcon = ({ variant, ...rest }: { variant: string; [key: string]: any }) => {
  switch (variant) {
    case 'all':
      return (
        <span {...rest} className="ant-select-tree-checkbox ant-select-tree-checkbox-checked">
          <span className="ant-select-tree-checkbox-inner"></span>
        </span>
      );
    case 'none':
      return (
        <span {...rest} className="ant-select-tree-checkbox">
          <span className="ant-select-tree-checkbox-inner"></span>
        </span>
      );
    case 'some':
      return (
        <span {...rest} className="ant-select-tree-checkbox ant-select-tree-checkbox-indeterminate">
          <span className="ant-select-tree-checkbox-inner"></span>
        </span>
      );
    default:
      return null;
  }
};

const TreeViewDropdown = ({
  value,
  onChange,
  onClose,
  data,
  onSelect,
  renderNode,
}: {
  value: string[] | string;
  onChange?: (inp: string[]) => void;
  onSelect?: (inp: INode<IFlatMetadata>) => void;
  onClose: () => void;
  data: INode<IFlatMetadata>[];
  renderNode?: (node: INode<IFlatMetadata>) => JSX.Element;
}) => {
  const multiSelectMode = onSelect == undefined;

  // console.log('data: ', data);
  const treeViewRef = useRef(null);

  // console.log('TreeViewDropdown render');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // console.log('handleKeyDown: ', e.key, e.target, treeViewRef.current);
    if (e.key === 'Escape') {
      onClose();
    }
    e.stopPropagation();
  };

  // turn values, which is a list of metadata->value values into a list of ids

  const selectedIds: NodeId[] = data
    .filter(
      (d): d is typeof d & { metadata: { value: string } } =>
        typeof d.metadata?.value === 'string' && value.includes(d.metadata.value),
    )
    .map((d) => d.id);
  // console.log('selectedIds: ', selectedIds);

  return (
    <div
      onKeyDown={handleKeyDown}
      style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden', wordBreak: 'break-word' }}
    >
      <div className="checkbox" ref={treeViewRef}>
        <TreeView
          data={data}
          aria-label="Checkbox tree"
          multiSelect={multiSelectMode}
          propagateSelect
          propagateSelectUpwards
          togglableSelect={multiSelectMode}
          defaultSelectedIds={selectedIds}
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            isSelected,
            isHalfSelected,
            getNodeProps,
            level,
            handleSelect,
            handleExpand,
          }) => {
            if (renderNode)
              return (
                <div
                  // {...getNodeProps({ onClick: handleExpand })}
                  style={{ marginLeft: 40 * (level - 1) }}
                  className="antd-container-copy"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={(e: any) => {
                    if (!isBranch) onSelect?.(element);

                    handleSelect(e);
                    handleExpand(e);
                    // e.stopPropagation();
                  }}
                >
                  {isBranch && (
                    <div className="antd-icon-container-copy">
                      <ArrowIcon isOpen={isExpanded} />
                    </div>
                  )}
                  {renderNode(element)}
                </div>
              );

            return (
              <div
                {...getNodeProps({ onClick: handleExpand })}
                style={{ marginLeft: 40 * (level - 1) }}
                className="antd-container-copy"
              >
                {isBranch && (
                  <div className="antd-icon-container-copy">
                    <ArrowIcon isOpen={isExpanded} />
                  </div>
                )}
                <CheckBoxIcon
                  tabIndex={0}
                  className="checkbox-icon"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={(e: any) => {
                    handleSelect(e);
                    e.stopPropagation();
                  }}
                  variant={isHalfSelected ? 'some' : isSelected ? 'all' : 'none'}
                />
                {!element.metadata?.isPartOfSearch ? (
                  <span className="antd-text-copy">{element.name}</span>
                ) : (
                  <b className="antd-text-copy">{element.name}</b>
                )}
              </div>
            );
          }}
          onSelect={(selected) => {
            // console.log('selected: ', selected);
            const selectedIds = selected.treeState.selectedIds;
            const selectedValues: string[] = data
              .filter((d) => selectedIds.has(d.id))
              .map((d) => d.metadata?.value)
              .filter((value): value is string => typeof value === 'string');
            // console.log('selectedValues: ', selectedValues);
            onChange?.(selectedValues);
          }}
        />
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renameTitleToName(node: any) {
  // Rename 'title' to 'name' for the current node
  if (Object.prototype.hasOwnProperty.call(node, 'title')) {
    node.name = node.title;
    delete node.title;
  }

  // If the node has children, recursively process each child
  if (node.children && Array.isArray(node.children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node.children.forEach((child: any) => renameTitleToName(child));
  }

  // Move 'value' into 'metadata' object
  if (Object.prototype.hasOwnProperty.call(node, 'value')) {
    node.metadata = { value: node.value, ...node.metadata };
    delete node.value;
  }

  return node;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortStructure(node: any) {
  if (node.children && Array.isArray(node.children)) {
    // Sort children recursively
    node.children.forEach(sortStructure);

    // Split children into those with and without children
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const withChildren = node.children.filter((child: any) => child.children && child.children.length > 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const withoutChildren = node.children.filter((child: any) => !child.children || child.children.length === 0);

    // Sort each group alphabetically by name (or title if name doesn't exist)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    withChildren.sort((a: any, b: any) => (a.name || a.title)?.localeCompare(b.name || b.title));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    withoutChildren.sort((a: any, b: any) => (a.name || a.title)?.localeCompare(b.name || b.title));

    // Combine the sorted groups
    node.children = [...withChildren, ...withoutChildren];
  }

  return node;
}

const AccessibleTreeSelect = ({
  treeData,
  value,
  onChange,
  placeholderText,
  onClear,
  allowClear,
  onSelect,
  renderNode,
  width,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  treeData: any;
  value: string[] | string;
  onChange: (inp: string[]) => void;
  placeholderText?: string;
  onClear?: () => void;
  allowClear?: boolean;
  onSelect?: (inp: INode<IFlatMetadata>) => void;
  renderNode?: (node: INode<IFlatMetadata>) => JSX.Element;
  width?: string;
}) => {
  // console.log('treeData: ', treeData);
  // console.log('value: ', value);

  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [finalTreeData, setFinalTreeData] = useState([] as INode<IFlatMetadata>[]);
  const [initialSet, setInitialSet] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(0);
  const [selectedNode, setSelectedNode] = useState<INode<IFlatMetadata> | null>(null);
  const selectRef = useRef<BaseSelectRef>(null);
  const selectContentsRef = useRef<HTMLDivElement>(null);

  const handleDropdownVisibleChange = (visible: boolean) => {
    setOpen(visible);
    setDropdownKey((prevKey) => prevKey + 1);
  };

  const handleClose = () => {
    // console.log('handleClose', selectRef.current);
    setOpen(false);
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // console.log('handleKeyDown outer: ', e.key, e.target);
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'ArrowDown') {
      const firstCheckbox = selectContentsRef.current?.querySelector('li');
      // console.log('firstCheckbox: ', firstCheckbox, selectContentsRef.current);
      if (firstCheckbox) {
        setTimeout(() => {
          // console.log('focus!');
          firstCheckbox.focus();
        }, 0);
      }
    }
  };

  const handleSearch = (text: string) => {
    setFilterText(text);
  };

  const renamed = sortStructure(renameTitleToName({ name: '', children: treeData }));
  // console.log('renamed: ', renamed);
  const flattenedData = flattenTree(renamed);
  // console.log('flattenedData: ', flattenedData);

  useEffect(() => {
    if (!initialSet && flattenedData.length > 1) {
      setFinalTreeData(flattenedData);
      setInitialSet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flattenedData]);

  const filter = (value: string) => {
    // console.log('filtering for value: ', value, flattenedData);

    const filtered = [] as INode<IFlatMetadata>[];
    const includeChildren = (id: NodeId) => {
      flattenedData.forEach((item) => {
        if (item.parent === id) {
          const itemMatches = item.name.toUpperCase().includes(value.toUpperCase());
          const newItem = {
            ...item,
            metadata: {
              ...item.metadata,
              isPartOfSearch: itemMatches,
            },
          };
          if (!filtered.find((x) => x.id === item.id)) {
            filtered.push(newItem);
          }
          if (item.children.length) {
            includeChildren(item.id);
          }
        }
      });
    };

    flattenedData.forEach((item) => {
      if (item.id === 'ROOT') {
        return;
      }
      const itemMatches = item.name.toUpperCase().includes(value.toUpperCase());
      if (itemMatches) {
        const newItem = {
          ...item,
          metadata: {
            ...item.metadata,
            isPartOfSearch: true,
          },
        };
        if (!filtered.find((x) => x.id === item.id)) {
          filtered.push(newItem);
        }

        if (item.children.length) {
          includeChildren(item.id);
        }
      }
    });

    const rootChildren = flattenedData[0].children.filter((id) => filtered.find((fitem) => fitem.id === id));
    filtered.unshift(
      Object.assign({
        ...flattenedData[0],
        children: rootChildren,
        metadata: {
          ...flattenedData[0].metadata,
          isPartOfSearch: false, // Root is never part of the search
        },
      }),
    );

    setFinalTreeData(filtered);
  };

  useEffect(() => {
    const valueToFilter = filterText.trim();
    if (valueToFilter) {
      filter(valueToFilter);
    } else {
      // console.log('no filter, setting to flattenedData: ', flattenedData);
      setFinalTreeData(flattenedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText]);

  const onSelectInternal = (selected: INode<IFlatMetadata>) => {
    console.log('onSelectInternal: ', selected);
    setSelectedNode(selected);
    onSelect?.(selected);
    handleClose();
  };

  // console.log('finalTreeData: ', finalTreeData);
  if (treeData.length === 0) return <></>;

  return (
    <Select
      className="accessible-tree-select"
      onKeyDown={handleKeyDown}
      style={{ width: width ?? 250, height: '38px' }}
      placeholder={placeholderText}
      open={open}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      showSearch
      onSearch={handleSearch}
      aria-label={placeholderText}
      allowClear={allowClear}
      onClear={onClear}
      value={(() => {
        // return 'hello';
        // console.log('rendering value node: ', selectedNode);
        if (!selectedNode) return;

        return { value: '', label: renderNode?.(selectedNode) };
      })()}
      dropdownRender={() => {
        // console.log('value: ', value);
        return (
          <div ref={selectContentsRef} key={dropdownKey}>
            <TreeViewDropdown
              value={value}
              onChange={onChange}
              onClose={handleClose}
              data={finalTreeData}
              onSelect={onSelect ? onSelectInternal : undefined}
              renderNode={renderNode}
            />
          </div>
        );
      }}
      ref={selectRef}
    ></Select>
  );
};

export default AccessibleTreeSelect;
