/* eslint-disable @typescript-eslint/no-explicit-any */
import { TreeSelect } from 'antd';
import React, { CSSProperties, useEffect, useState } from 'react';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import { useGetBehaviouralCompetenciesQuery } from '../../../redux/services/graphql-api/behavioural-comptency.api';
import { BehaviouralCompetency } from '../../../redux/services/graphql-api/job-profile-types';
import './wizard-behavioural-comptency-picker.css';
// Utility function to format enum strings to a more readable form
const formatEnumString = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

export interface BehaviouralCompetencyData {
  behavioural_competency: BehaviouralCompetency;
  // id: string; // or number if you are using numeric IDs
}

interface BehaviouralComptencyPickerProps {
  onAdd: (competencyData: BehaviouralCompetencyData) => void;
  onRemove: (index: number) => void;
  style?: CSSProperties;
  behavioural_competencies_fields: any[];
}

const BehaviouralComptencyPicker: React.FC<BehaviouralComptencyPickerProps> = ({
  onAdd,
  onRemove,
  style,
  behavioural_competencies_fields,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Fetching data from the API
  const { data, error, isLoading } = useGetBehaviouralCompetenciesQuery();

  // Create a mapping of competency ID to the field array index
  const [idToIndexMap, setIdToIndexMap] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const map: { [key: string]: number } = {};
    const initialValues: string[] = [];
    behavioural_competencies_fields.forEach((field, index) => {
      const id = field.behavioural_competency.id;
      map[id] = index;
      initialValues.push(id); // Assuming `id` is the value you need to select in TreeSelect
    });
    setIdToIndexMap(map);
    setSelectedValues(initialValues); // Set the initial selected values
  }, [behavioural_competencies_fields]);

  // console.log('data: ', data);
  // Convert the fetched data into a tree structure for TreeSelect
  const treeData = data?.behaviouralComptencies.reduce((acc: any, competency) => {
    // Find or create the group
    let group: {
      title: string;
      value: string;
      children: any[];
      isGroup: boolean;
      selectable: boolean;
    } = acc.find((g: any) => g.title === formatEnumString(competency.category));
    if (!group) {
      group = {
        title: formatEnumString(competency.category),
        value: competency.category,
        children: [],
        isGroup: true,
        selectable: false,
      };
      acc.push(group);
    }

    // Add the competency to the group if not filtered
    // if (!filterIds.includes(competency.id)) {
    group.children.push({
      title: `${competency.name}${competency.type == 'INDIGENOUS' ? '*' : ''}`,
      titleNoStar: `${competency.name}`,
      value: competency.id,
      description: competency.description,
      key: competency.id,
      id: competency.id,
      isGroup: false,
    });
    // }

    // console.log('treeData: ', acc);
    return acc;
  }, []);

  const handleSelectionChange = (currentSelectedValues: any) => {
    // If currentSelectedValues is empty, it means all items have been cleared
    if (currentSelectedValues.length === 0) {
      selectedValues.forEach((value) => {
        const indexToRemove = idToIndexMap[value];
        if (indexToRemove !== undefined) {
          onRemove(indexToRemove);
        }
      });
      setSelectedValues([]);
      return;
    }

    // Find which items have been added or removed
    const addedValues = currentSelectedValues.filter((value: any) => !selectedValues.includes(value as never));
    const removedValues = selectedValues.filter((value) => !currentSelectedValues.includes(value));

    // Handle added items
    addedValues.forEach((value: any) => {
      const selectedNode = (treeData as any)
        ?.flatMap((group: any) => group.children)
        .find((child: any) => child.value === value);
      if (selectedNode) {
        onAdd({
          behavioural_competency: {
            id: parseInt(selectedNode.value),
            name: selectedNode.titleNoStar,
            description: selectedNode.description,
          },
        });
      }
    });

    // Handle removed items
    removedValues.forEach((value) => {
      const indexToRemove = idToIndexMap[value];
      if (indexToRemove !== undefined) {
        onRemove(indexToRemove);
      }
    });

    // Update the selected values
    setSelectedValues(currentSelectedValues);

    // BELOW code is for treeCheckable mode - there's an issue with selecting/deslecting group nodes

    // const checked = extra.triggerNode ? extra.checked : true;
    // const { triggerValue, triggerNode } = extra;

    // console.log('triggerNode: ', triggerNode);
    // const isGroupNode = triggerNode && triggerNode.props.isGroup;

    // if (currentSelectedValues.length === 0) {
    //   // Clear All button has been used
    //   const indicesToRemove = [...selectedValues]
    //     .map((value) => idToIndexMap[value])
    //     .filter((index) => index !== undefined);
    //   indicesToRemove.sort((a, b) => b - a); // Sort in descending order
    //   indicesToRemove.forEach((indexToRemove) => onRemove(indexToRemove));

    //   setSelectedValues([]);
    //   return;
    // }

    // // If a group node is toggled, we need to handle its children
    // if (isGroupNode) {
    //   console.log('isGroupNode');
    //   const group = treeData.find((group) => group.value === triggerNode.props.value);
    //   const groupChildrenIds = group ? group.children.map((child) => child.id) : [];
    //   const groupChildrenValues = triggerNode.props.children.map((child) => child.props.id);
    //   console.log('triggerNode.props: ', triggerNode.props);
    //   console.log('groupChildrenValues: ', groupChildrenValues);
    //   if (checked) {
    //     console.log('checked');
    //     // Add all child node IDs to selectedValues
    //     const newSelectedValues = [...new Set([...currentSelectedValues, ...groupChildrenValues])];
    //     console.log('newSelectedValues: ', newSelectedValues);

    //     setSelectedValues(newSelectedValues);
    //     groupChildrenValues.forEach((value) => {
    //       const selectedNode = treeData.flatMap((group) => group.children).find((child) => child.value === value);
    //       if (selectedNode && !selectedValues.includes(value)) {
    //         onAdd({
    //           behavioural_competency: {
    //             id: parseInt(selectedNode.value),
    //             name: selectedNode.title,
    //             description: selectedNode.description,
    //           },
    //         });
    //       }
    //     });
    //   } else {
    //     console.log('== group unchecked');
    //     // When a group node is unchecked, remove all its children from the selected values
    //     const indicesToRemove = groupChildrenIds
    //       .filter((id) => selectedValues.includes(id)) // Find which children are currently selected
    //       .map((id) => idToIndexMap[id]) // Convert those IDs to indices
    //       .filter((index) => index !== undefined); // Ensure we have a valid index

    //     // Since we're using `useFieldArray`, we should remove items from last to first to avoid indexing issues
    //     indicesToRemove.sort((a, b) => b - a); // Sort indices in descending order

    //     indicesToRemove.forEach((indexToRemove) => {
    //       onRemove(indexToRemove); // Remove the item at the index
    //     });

    //     // Update the selectedValues state by filtering out the children of the deselected group
    //     const newSelectedValues = currentSelectedValues.filter((value) => !groupChildrenIds.includes(value));
    //     setSelectedValues(newSelectedValues);
    //   }
    // } else {
    //   console.log('triggerValue: ', triggerValue);
    //   const selectedNodeValue = extra.triggerNode ? extra.triggerNode.props.value : null;

    //   // Handle individual node toggle
    //   setSelectedValues(currentSelectedValues);

    //   // Add or remove the competency from the external state based on whether it was checked or unchecked
    //   if (checked && selectedNodeValue) {
    //     const selectedNode = treeData
    //       .flatMap((group) => group.children)
    //       .find((child) => child.value === selectedNodeValue);

    //     if (selectedNode) {
    //       onAdd({
    //         behavioural_competency: {
    //           id: parseInt(selectedNode.value),
    //           name: selectedNode.title,
    //           description: selectedNode.description,
    //         },
    //       });
    //     }
    //   } else if (!checked && selectedNodeValue) {
    //     const indexToRemove = idToIndexMap[triggerValue];
    //     if (indexToRemove !== undefined) {
    //       onRemove(indexToRemove);
    //     }
    //   }
    // }
  };

  if (isLoading) return <LoadingSpinnerWithMessage mode="small" />;
  if (error) return <p>An error occurred</p>;

  return (
    <div style={{ ...style }}>
      <div style={{ ...style }}>
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          value={selectedValues}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          multiple
          // treeCheckable
          onChange={handleSelectionChange}
          treeData={treeData}
        ></TreeSelect>
      </div>
    </div>
  );
};

export default BehaviouralComptencyPicker;
