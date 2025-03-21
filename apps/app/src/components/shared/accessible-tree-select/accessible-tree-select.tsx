import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';
import { Select, Tooltip } from 'antd';
import { BaseSelectRef } from 'rc-select';
import { useEffect, useRef, useState } from 'react';
import TreeView, { INode, NodeId, flattenTree } from 'react-accessible-treeview';
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';
import { filterTree } from '../../app/common/utils/treeSearchUtils';
import './accessible-tree-select.css';

const ArrowIcon = ({ isOpen, className }: { isOpen: boolean; className?: string }) => {
  if (isOpen) return <CaretDownFilled style={{ fontSize: '0.6rem' }} aria-hidden className={className} />;
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
  isSearching,
}: {
  value: string[] | string;
  onChange?: (inp: string[]) => void;
  onSelect?: (inp: INode<IFlatMetadata>) => void;
  onClose: () => void;
  data: INode<IFlatMetadata>[];
  renderNode?: (node: INode<IFlatMetadata>) => JSX.Element;
  isSearching: boolean;
}) => {
  const multiSelectMode = onSelect == undefined;

  // console.log('TreeViewDropdown data: ', data);
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

  // if isSearching, expand all nodes by generating a list of ids to expand
  const expandedIds = isSearching ? data.filter((d) => d.children.length > 0).map((d) => d.id) : undefined;
  // console.log('expandedIds: ', expandedIds);

  return (
    <div onKeyDown={handleKeyDown} style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
      <div className="checkbox" ref={treeViewRef}>
        <TreeView
          data={data}
          aria-label="Checkbox tree"
          multiSelect={multiSelectMode}
          propagateSelect
          propagateSelectUpwards
          togglableSelect={multiSelectMode}
          defaultSelectedIds={selectedIds}
          expandedIds={expandedIds}
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const handleClick = (e: any) => {
              if (!isBranch) {
                onSelect?.(element);
                handleSelect(e);
              }

              handleExpand(e);
            };

            // console.log('rendering element: ', element);

            if (renderNode) {
              // if (element.id == 149) {
              //   console.log('element: ', element, isHalfSelected, isBranch, isExpanded, isSelected);
              // }

              return (
                <div style={{ padding: '0 0 4px 0' }}>
                  <div
                    {...getNodeProps({ onClick: handleClick })}
                    style={{ marginLeft: 40 * (level - 1) }}
                    className={`antd-container-copy ${isSelected && !isBranch ? 'antd-copy-selected-item' : ''}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (!isBranch) {
                          onSelect?.(element);
                        }
                      }
                      // e.stopPropagation();
                    }}
                  >
                    {isBranch && (
                      <div className="antd-icon-container-copy">
                        <ArrowIcon isOpen={isExpanded} />
                      </div>
                    )}
                    {!element.metadata?.isPartOfSearch ? (
                      <span className="antd-text-copy">{renderNode(element)}</span>
                    ) : (
                      <b className="antd-text-copy">{renderNode(element)}</b>
                    )}
                    {/* {isSelected ? 'selected' : 'N'} */}
                  </div>
                </div>
              );
            } else {
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
                  <label
                    // if it's branch, clicking on label expands/collapses the branch
                    // if it's not, then clicking the label selects it

                    onClick={(e: any) => {
                      if (!isBranch) {
                        handleSelect(e);
                        e.stopPropagation();
                      }
                    }}
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    <CheckBoxIcon
                      onClick={(e: any) => {
                        handleSelect(e);
                        e.stopPropagation();
                      }}
                      tabIndex={0}
                      className="checkbox-icon"
                      variant={isHalfSelected ? 'some' : isSelected ? 'all' : 'none'}
                    />
                    {!element.metadata?.isPartOfSearch ? (
                      <span className="antd-text-copy">{element.name}</span>
                    ) : (
                      <b className="antd-text-copy">{element.name}</b>
                    )}
                  </label>
                </div>
              );
            }
          }}
          onSelect={(selected) => {
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
  treeValue,
  onChange,
  placeholderText,
  onClear,
  allowClear,
  onSelect,
  renderNode,
  width,
  disabled,
  tabIndex,
  treeNodeFilterProp,
  disabledText,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  treeData: any;
  treeValue: string[] | string;
  onChange?: (inp: string[]) => void;
  placeholderText?: string;
  onClear?: () => void;
  allowClear?: boolean;
  onSelect?: (inp: INode<IFlatMetadata>) => void;
  renderNode?: (node: INode<IFlatMetadata>) => JSX.Element;
  width?: string;
  disabled?: boolean;
  tabIndex?: number;
  treeNodeFilterProp?: string;
  disabledText?: string;
}) => {
  // console.log('treeData: ', treeData);
  // console.log('value: ', value);
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [finalTreeData, setFinalTreeData] = useState([] as INode<IFlatMetadata>[]);
  const [initialSet, setInitialSet] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(0);
  const [selectedNode, setSelectedNode] = useState<INode<IFlatMetadata> | null>(null);
  const [hasNoResults, setHasNoResults] = useState(false);

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

  const filter = (searchText: string) => {
    const uniqueFiltered = filterTree(flattenedData, searchText, treeNodeFilterProp);
    // console.log('uniqueFiltered:', filtered);
    setDropdownKey((prevKey) => prevKey + 1);
    setFinalTreeData(uniqueFiltered);
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
    // console.log('onSelectInternal: ', selected);
    setSelectedNode(selected);
    onSelect?.(selected);
    handleClose();
  };

  useEffect(() => {
    // in mode where we select a single item at a time, initialize selectedNode to the "value"
    if (onSelect && treeData.length !== 0) {
      // if value is a string
      if (typeof treeValue === 'string') {
        const node = finalTreeData.find((node) => node.metadata?.value === treeValue);
        if (node) setSelectedNode(node);
      }
    }
  }, [treeValue, onSelect, finalTreeData, treeData]);

  // console.log('finalTreeData: ', finalTreeData);
  if (treeData.length === 0) return <></>;

  return (
    <>
      <div aria-live="polite" className="sr-only" role="status">
        {hasNoResults ? 'No results found' : ''}
      </div>

      <Tooltip title={disabled && disabledText ? disabledText : null}>
        <Select
          className="accessible-tree-select"
          onKeyDown={handleKeyDown}
          style={{ width: width ?? 250, height: '38px' }}
          placeholder={placeholderText}
          open={open}
          popupMatchSelectWidth={false}
          onDropdownVisibleChange={handleDropdownVisibleChange}
          showSearch
          onSearch={handleSearch}
          aria-label={placeholderText}
          allowClear={allowClear}
          onClear={onClear}
          disabled={disabled}
          tabIndex={tabIndex}
          value={(() => {
            // console.log('rendering value node: ', selectedNode);
            if (!selectedNode) return;

            return { value: '', label: renderNode?.(selectedNode) };
          })()}
          dropdownRender={() => {
            // console.log('finalTreeData: ', finalTreeData);

            const noResults = finalTreeData.length === 1 && finalTreeData[0].id === 0 && finalTreeData[0].name === '';

            // Update the state to trigger announcement
            useEffect(() => {
              setHasNoResults(noResults);
            }, [finalTreeData]);

            if (noResults) {
              return <div style={{ padding: '8px 12px', textAlign: 'center' }}>No results found</div>;
            }

            return (
              <div ref={selectContentsRef} key={dropdownKey}>
                <TreeViewDropdown
                  value={treeValue}
                  onChange={onChange}
                  onClose={handleClose}
                  data={finalTreeData}
                  onSelect={onSelect ? onSelectInternal : undefined}
                  renderNode={renderNode}
                  isSearching={filterText.length > 0}
                />
              </div>
            );
          }}
          ref={selectRef}
        ></Select>
      </Tooltip>
    </>
  );
};

export default AccessibleTreeSelect;
