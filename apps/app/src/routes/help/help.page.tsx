import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, MenuProps, message, Modal, Tag, Tooltip, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { VITE_BACKEND_URL } from '../../../envConfig';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import { DataList } from '../../components/shared/data-list/data-list.component';
import { FilterOperator } from '../../components/shared/data-list/lib/prisma-filter/common/filter-operator.enum';
import { useTypedSelector } from '../../redux/redux.hooks';
import { useLazyGetDocumentsQuery } from '../../redux/services/graphql-api/document.api';
import { useGetJobProfileStreamsQuery } from '../../redux/services/graphql-api/job-profile-stream';

const { Text } = Typography;

export const HelpPage = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  const roles = auth.user?.roles ?? [];
  const [trigger, { data: documents, isFetching: documentsIsLoading }] = useLazyGetDocumentsQuery();
  const { data: jobStreamData, isFetching: jobStreamIsLoading } = useGetJobProfileStreamsQuery();
  const navigate = useNavigate();

  const deleteDocument = async (documentId: string) => {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/document/delete/${documentId}`, {
        withCredentials: true,
      });
      message.success('Document deleted successfully');
      // Update your state or refetch the documents list
    } catch (error) {
      console.error('Error deleting document:', error);
      message.error('Error deleting the document');
    }
  };

  return (
    <>
      <PageHeader
        title="Help and Docs"
        showButton2={roles.includes('super-admin')}
        button2Text="Upload"
        button2Callback={async () => {
          navigate('/help/create');
        }}
      />
      <ContentWrapper>
        <DataList
          trigger={trigger}
          // ---------- FILTER PROPS ----------
          filterProps={{
            filterProps: [
              {
                type: 'select',
                mode: 'multi-value',
                // Instead of "job_stream_id", reference your new many-to-many field path
                // Typically for a DataList filter, you'd do something like: "streams.some.jobStreamId"
                // so the backend can filter documents whose 'streams' has a 'jobStreamId' in the provided values.
                field: 'streams.some.jobStreamId', // adjust to how your FilterOperator expects paths
                operator: FilterOperator.IntIn,
                loading: jobStreamIsLoading,
                options: (jobStreamData?.jobProfileStreams ?? []).map((stream) => ({
                  label: stream.name,
                  value: stream.id,
                })),
                placeholder: 'Disciplines',
              },
              {
                type: 'select',
                mode: 'multi-value',
                field: 'category',
                operator: FilterOperator.EnumIn,
                options: [
                  { label: 'Career Map', value: 'CAREER_MAP' },
                  { label: 'Reference Guide', value: 'REFERENCE_GUIDE' },
                  { label: 'Resources', value: 'RESOURCES' },
                ],
                placeholder: 'Categories',
              },
            ],
            searchProps: {
              fields: [
                {
                  field: 'title',
                  operator: FilterOperator.StringIContains,
                },
                {
                  field: 'description',
                  operator: FilterOperator.StringIContains,
                },
              ],
            },
          }}
          // ---------- TABLE PROPS ----------
          tableProps={{
            columns: [
              {
                key: 'file_extension',
                dataIndex: 'file_extension',
                render: (value: string) => {
                  switch (value) {
                    case '.pdf':
                      return <FilePdfOutlined style={{ color: 'red' }} />;
                    case '.doc':
                    case '.docx':
                      return <FileWordOutlined style={{ color: '#00A3EE' }} />;
                    default:
                      return <Tag>{value}</Tag>;
                  }
                },
              },
              {
                key: 'title',
                dataIndex: 'title',
                render: (value: string) => <Text strong>{value}</Text>,
                sorter: true,
                title: 'Title',
              },
              {
                key: 'description',
                dataIndex: 'description',
                render: (value: string) => <Text>{value}</Text>,
                sorter: false,
                title: 'Description',
              },
              {
                key: 'category',
                dataIndex: 'category',
                render: (value: string) => {
                  switch (value) {
                    case 'CAREER_MAP':
                      return <Tag color="blue">Career Map</Tag>;
                    case 'REFERENCE_GUIDE':
                      return <Tag color="green">Reference Guide</Tag>;
                    case 'RESOURCES':
                      return <Tag color="orange">Resources</Tag>;
                    default:
                      return <Tag>{value}</Tag>;
                  }
                },
                sorter: true,
                title: 'Category',
              },
              {
                key: 'jobFamilies',
                dataIndex: 'jobFamilies',
                render: (jobFamilies: any[] = []) => {
                  if (jobFamilies.length === 0) {
                    return <Typography.Text type="secondary">-</Typography.Text>;
                  } else if (jobFamilies.length < 3) {
                    return jobFamilies.map((link) => <Tag key={link.jobFamily.id}>{link.jobFamily.name}</Tag>);
                  } else {
                    const sortedStreams = [...jobFamilies].sort((a, b) =>
                      a.jobFamily.name.localeCompare(b.jobFamily.name),
                    );
                    const jobStreamNames = sortedStreams.map((stream) => stream.jobFamily.name).join(', ');

                    return (
                      <span>
                        {jobFamilies.length}{' '}
                        <Tooltip title={jobStreamNames}>
                          <InfoCircleOutlined />
                        </Tooltip>
                      </span>
                    );
                  }
                },
                sorter: false,
                title: 'Professions',
                width: 200,
              },
              {
                key: 'streams',
                dataIndex: 'streams',
                render: (streams: any[] = []) => {
                  if (streams.length === 0) {
                    return <Typography.Text type="secondary">-</Typography.Text>;
                  } else if (streams.length < 3) {
                    return streams.map((link) => <Tag key={link.jobStream.id}>{link.jobStream.name}</Tag>);
                  } else {
                    const sortedStreams = [...streams].sort((a, b) => a.jobStream.name.localeCompare(b.jobStream.name));
                    const jobStreamNames = sortedStreams.map((stream) => stream.jobStream.name).join(', ');

                    return (
                      <span>
                        {streams.length}{' '}
                        <Tooltip title={jobStreamNames}>
                          <InfoCircleOutlined />
                        </Tooltip>
                      </span>
                    );
                  }
                },
                sorter: false,
                title: 'Disciplines',
                width: 200,
              },
              {
                key: 'modified',
                dataIndex: 'updated_at',
                render: (value: string) => (
                  <Typography.Text type="secondary">{new Date(value).toLocaleDateString('en-ca')}</Typography.Text>
                ),
                sorter: true,
                title: 'Last Modified',
              },
              {
                key: 'actions',
                align: 'center',
                title: 'Actions',
                render: (_: any, record: any) => {
                  const baseUrl = `${VITE_BACKEND_URL}/document`;
                  const isPdf = record.file_extension === '.pdf';
                  const inlineUrl = `${baseUrl}/file/${record.id}?mode=inline`;
                  const downloadUrl = `${baseUrl}/file/${record.id}?mode=download`;
                  const copyUrl = record.url ? `${baseUrl}/${record.url}` : '';

                  const downloadItems: MenuProps['items'] = isPdf
                    ? [
                        {
                          key: 'open',
                          icon: <EyeOutlined />,
                          label: (
                            <a href={inlineUrl} target="_blank" rel="noopener noreferrer">
                              Open
                            </a>
                          ),
                        },
                        {
                          key: 'download',
                          icon: <DownloadOutlined />,
                          label: (
                            <a href={downloadUrl} rel="noopener noreferrer">
                              Download
                            </a>
                          ),
                        },
                      ]
                    : [
                        {
                          key: 'download',
                          icon: <DownloadOutlined />,
                          label: (
                            <a href={downloadUrl} rel="noopener noreferrer">
                              Download
                            </a>
                          ),
                        },
                      ];

                  const copyItem = {
                    key: 'copy',
                    icon: <LinkOutlined />,
                    label: (
                      <a
                        onClick={() => {
                          navigator.clipboard.writeText(copyUrl);
                          message.success('Link copied to clipboard');
                        }}
                      >
                        Copy Link
                      </a>
                    ),
                  };

                  const editItem = {
                    key: 'edit',
                    icon: <EditOutlined />,
                    label: 'Edit',
                    onClick: () => {
                      navigate(`/help/edit/${record.id}`);
                    },
                  };

                  const deleteItem = {
                    key: 'delete',
                    icon: <DeleteOutlined />,
                    label: 'Delete',
                    onClick: () => {
                      Modal.confirm({
                        title: 'Are you sure you want to delete this document?',
                        onOk: () => deleteDocument(record.id),
                      });
                    },
                  };

                  // Build the menu items conditionally based on the user's roles
                  let menuItems: MenuProps['items'] = copyUrl ? [copyItem] : [];
                  menuItems = roles.includes('super-admin')
                    ? [
                        ...downloadItems,
                        ...menuItems,
                        {
                          type: 'divider',
                        },
                        editItem,
                        deleteItem,
                      ]
                    : [...downloadItems, ...menuItems];

                  return (
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                        <Tooltip title="Actions">
                          <Button icon={<SettingOutlined />} />
                        </Tooltip>
                      </Dropdown>
                    </div>
                  );
                },
              },
            ],
            data: documents?.documentsWithCount,
            loading: documentsIsLoading,
            orderByTransformers: {
              title: 'SortOrderInput',
              description: 'SortOrderInput',
              updated_at: 'SortOrderInput',
            },
          }}
        />
      </ContentWrapper>
    </>
  );
};
