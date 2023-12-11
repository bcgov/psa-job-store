// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { ReloadOutlined } from '@ant-design/icons';
// import { Button, Card, Checkbox, Col, Row, Select, Space, Table, Tag } from 'antd';
// import Search from 'antd/es/input/Search';
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import { PageHeader } from '../../components/app/page-header.component';
// import { useLazyGetPositionRequestsQuery } from '../../redux/services/graphql-api/position-request.api';
// import './my-positions.page.css';

export const MyPositionsPage = () => {
  return <div></div>;
};
// export const MyPositionsPage = () => {
//   // const { data, error, isLoading, refetch } = useGetPositionRequestsQuery();

//   const [trigger, { data, isLoading }] = useLazyGetPositionRequestsQuery();

//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(2); // Default page size, adjust as needed
//   const [totalResults, setTotalResults] = useState(0); // Total results count from API

//   // HANDLE SEARCH QUERY

//   useEffect(() => {
//     const search = searchParams.get('search');
//     const statusFilter = searchParams.get('status');
//     const classificationFilter = searchParams.get('classification');
//     trigger({
//       ...(search != null && { search }),
//       where: {
//         AND: [
//           ...(statusFilter != null
//             ? [
//                 {
//                   status: {
//                     in: JSON.parse(`[${statusFilter.split(',').map((v) => `"${v}"`)}]`),
//                   },
//                 },
//               ]
//             : []),
//           ...(classificationFilter != null
//             ? [
//                 {
//                   classification: {
//                     in: JSON.parse(`[${classificationFilter.split(',').map((v) => `"${v}"`)}]`),
//                   },
//                 },
//               ]
//             : []),
//         ],
//       },
//       skip: (currentPage - 1) * pageSize,
//       take: pageSize,
//     });
//   }, [searchParams, trigger, currentPage, pageSize]);

//   useEffect(() => {
//     if (data && data.jobProfilesCount !== undefined) {
//       setTotalResults(data.jobProfilesCount);
//     }
//   }, [data]);

//   // END HANDLE SEARCH QUERY

//   const handleSearch = (_selectedKeys: any, _confirm: any) => {
//     // Implement the search logic
//   };

//   const columns = [
//     {
//       title: 'Job Title',
//       dataIndex: 'title',
//       key: 'title',
//       sorter: true,
//       render: (text: any) => <a href="#!">{text}</a>,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       sorter: true,
//       render: (status: any) => {
//         const color = status === 'DRAFT' ? 'gray' : status === 'IN_REVIEW' ? 'blue' : 'green';
//         return (
//           <Space>
//             <span className={`status-dot status-dot-${color}`} />
//             {status === 'DRAFT'
//               ? 'Draft'
//               : status === 'IN_REVIEW'
//                 ? 'In review'
//                 : status === 'COMPLETED'
//                   ? 'Completed'
//                   : ''}
//           </Space>
//         );
//       },
//     },
//     {
//       title: 'Position #',
//       dataIndex: 'position_number',
//       key: 'position_number',
//     },
//     {
//       title: 'Class',
//       dataIndex: 'classification',
//       key: 'classification',
//     },
//     {
//       title: 'Submission ID',
//       dataIndex: 'submission_id',
//       key: 'submission_id',
//     },
//     // Add more columns as needed
//   ];

//   const statusFilterData = [
//     { label: 'Draft', value: 'DRAFT' },
//     { label: 'In Review', value: 'IN_REVIEW' },
//     { label: 'Completed', value: 'COMPLETED' },
//   ];

//   const classificationFilterData = [
//     { label: 'Class A', value: 'CLASS_A' },
//     { label: 'Class B', value: 'CLASS_B' },
//     // Add other classification options...
//   ];

//   // tag handling

//   // Unified state for all selections
//   const [allSelections, setAllSelections] = useState([]);

//   // Add a new selection
//   const addSelection = (value, type) => {
//     const newSelection = { value, type };
//     setAllSelections([...allSelections, newSelection]);
//   };

//   // Remove a selection
//   const removeSelection = (removedValue, type) => {
//     setAllSelections(
//       allSelections.filter((selection) => !(selection.value === removedValue && selection.type === type)),
//     );
//   };

//   // Update the Select components when selections change
//   const selectedStatus = allSelections.filter((s) => s.type === 'status').map((s) => s.value);
//   const selectedClassification = allSelections.filter((s) => s.type === 'classification').map((s) => s.value);

//   // const [selectedStatus, setSelectedStatus] = useState([]);
//   // const [selectedClassification, setSelectedClassification] = useState([]);

//   // const handleStatusChange = (values: any) => {
//   //   setSelectedStatus(values);
//   // };

//   // const handleClassificationChange = (values: any) => {
//   //   setSelectedClassification(values);
//   // };

//   // const handleCloseTag = (removedTag, type) => {
//   //   const newTags =
//   //     type === 'status'
//   //       ? selectedStatus.filter((tag) => tag !== removedTag)
//   //       : selectedClassification.filter((tag) => tag !== removedTag);

//   //   type === 'status' ? setSelectedStatus(newTags) : setSelectedClassification(newTags);
//   // };

//   const tagRender = (props) => {
//     return null;
//   };

//   const dropdownRender = (menu, type) => {
//     const options = type === 'status' ? statusFilterData : classificationFilterData;
//     const selectedValues = type === 'status' ? selectedStatus : selectedClassification;
//     return (
//       <div>
//         <div style={{ padding: '8px' }}>
//           {options.map((option) => (
//             <div key={option.value} style={{ margin: '5px 0' }}>
//               <Checkbox
//                 checked={selectedValues.includes(option.value)}
//                 onChange={(e) => {
//                   if (e.target.checked) {
//                     addSelection(option.value, type);
//                   } else {
//                     removeSelection(option.value, type);
//                   }
//                 }}
//               >
//                 {option.label}
//               </Checkbox>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   useEffect(() => {
//     const statusParams = decodeURIComponent(searchParams.get('status') || '')
//       .split(',')
//       .filter(Boolean);
//     const classificationParams = decodeURIComponent(searchParams.get('classification') || '')
//       .split(',')
//       .filter(Boolean);
//     const initialSelections = [
//       ...statusParams.map((value) => ({ value, type: 'status' })),
//       ...classificationParams.map((value) => ({ value, type: 'classification' })),
//     ];
//     setAllSelections(initialSelections);
//   }, []); // Removed searchParams from dependencies

//   useEffect(() => {
//     const statusValues = allSelections
//       .filter((s) => s.type === 'status')
//       .map((s) => s.value)
//       .join(',');
//     const classificationValues = allSelections
//       .filter((s) => s.type === 'classification')
//       .map((s) => s.value)
//       .join(',');

//     if (statusValues !== searchParams.get('status') || classificationValues !== searchParams.get('classification')) {
//       const newSearchParams = new URLSearchParams();
//       if (statusValues) {
//         newSearchParams.set('status', statusValues);
//       }
//       if (classificationValues) {
//         newSearchParams.set('classification', classificationValues);
//       }
//       setSearchParams(newSearchParams);
//     }
//   }, [allSelections, searchParams, setSearchParams]);

//   const handleFilters = () => {
//     const basePath = getBasePath(location.pathname);
//     navigate({
//       pathname: basePath,
//       search: searchParams.toString(),
//     });
//   };

//   const getBasePath = (path) => {
//     const pathParts = path.split('/');
//     if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
//       pathParts.pop();
//     }
//     return pathParts.join('/');
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <>
//       <PageHeader title="My Positions" subTitle="Review the profile before creating a new position" />

//       <div style={{ padding: '0 1rem', backgroundColor: '#F0F2F5' }}>
//         <Card style={{ marginTop: '1rem' }}>
//           <Row gutter={24} wrap>
//             <Col span={12}>
//               <Search
//                 enterButton="Find positions"
//                 aria-label="Search by job title or keyword"
//                 onPressEnter={(e) => handleSearch(e.currentTarget.value, null)}
//                 allowClear
//                 placeholder="Search by job title or submission ID"
//                 onSearch={handleSearch}
//                 style={{ width: 400 }}
//               />
//             </Col>
//             <Col span={12}>
//               <Row gutter={8} justify="end">
//                 <Col>
//                   <Select
//                     tagRender={tagRender}
//                     dropdownRender={(menu) => dropdownRender(menu, 'status')}
//                     className="customTagControlled"
//                     placeholder="Status"
//                     options={statusFilterData}
//                     style={{ width: 120 }}
//                     // onChange={setSelectedStatus}
//                     onChange={(newValues) => {
//                       // Add new selections and remove deselected ones
//                       newValues.forEach((val) => {
//                         if (!selectedStatus.includes(val)) addSelection(val, 'status');
//                       });
//                       selectedStatus.forEach((val) => {
//                         if (!newValues.includes(val)) removeSelection(val, 'status');
//                       });
//                     }}
//                   />
//                 </Col>
//                 <Col>
//                   <Select
//                     tagRender={tagRender}
//                     dropdownRender={(menu) => dropdownRender(menu, 'classification')}
//                     className="customTagControlled"
//                     placeholder="Classification"
//                     options={classificationFilterData}
//                     style={{ width: 150 }}
//                     // onChange={setSelectedClassification}
//                     onChange={(newValues) => {
//                       // Similar logic as for status
//                       newValues.forEach((val) => {
//                         if (!selectedClassification.includes(val)) addSelection(val, 'classification');
//                       });
//                       selectedClassification.forEach((val) => {
//                         if (!newValues.includes(val)) removeSelection(val, 'classification');
//                       });
//                     }}
//                   />
//                 </Col>
//                 <Col>
//                   <Button type="primary">Find positions</Button>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               {/* {selectedStatus.map((status) => (
//                 <Tag closable onClose={() => handleCloseTag(status, 'status')} key={status}>
//                   {status}
//                 </Tag>
//               ))}
//               {selectedClassification.map((classification) => (
//                 <Tag closable onClose={() => handleCloseTag(classification, 'classification')} key={classification}>
//                   {classification}
//                 </Tag>
//               ))} */}
//               {allSelections.map((selection) => (
//                 <Tag
//                   key={`${selection.type}-${selection.value}`}
//                   closable
//                   onClose={() => removeSelection(selection.value, selection.type)}
//                 >
//                   {selection.value}
//                 </Tag>
//               ))}
//             </Col>
//           </Row>
//         </Card>

//         <Card style={{ marginTop: '1rem' }} className="tableHeader">
//           <Row gutter={24} wrap>
//             <Col span={12}>
//               <h2 style={{ marginBottom: 0 }}>My Positions</h2>
//             </Col>
//             <Col span={12}>
//               <Row justify="end">
//                 <Col>
//                   <Button icon={<ReloadOutlined />} onClick={() => refetch()} />
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Card>

//         <Table
//           className="tableWithHeader"
//           columns={columns}
//           dataSource={data?.positionRequests}
//           rowKey="id"
//           pagination={{
//             pageSizeOptions: ['10', '20', '50'],
//             showSizeChanger: true,
//           }}
//         />
//       </div>
//     </>
//   );
// };
