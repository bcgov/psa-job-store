import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Modal,
  Row,
  Select,
  Tag,
  Tooltip,
  Typography,
  Upload,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessibleTreeSelect from '../../components/app/common/components/accessible-tree-select';
import { useLazyCheckDocumentURLQuery } from '../../redux/services/graphql-api/document.api';
import { useGetJobFamiliesQuery } from '../../redux/services/graphql-api/job-family.api';
import { useGetJobProfileStreamsQuery } from '../../redux/services/graphql-api/job-profile-stream';

interface Selection {
  value: string;
  type: 'jobFamily' | 'jobStream';
}

interface DocumentFormProps {
  mode: 'upload' | 'edit';
  initialData?: any; // Data to prefill the form in edit mode
  onSubmit: (values: any, fileList: any[]) => Promise<void>;
  form: FormInstance; // Accept form instance via props
}

const DocumentForm: React.FC<DocumentFormProps> = ({ mode, initialData, onSubmit, form }) => {
  const navigate = useNavigate();

  const { data: jobFamiliesData, isLoading: familiesIsLoading } = useGetJobFamiliesQuery();
  const { data: jobStreamsData, isFetching: streamsIsLoading } = useGetJobProfileStreamsQuery();

  const [trigger, { data: urlDoc }] = useLazyCheckDocumentURLQuery();

  const [treeData, setTreeData] = useState<any[]>([]);
  const [allSelections, setAllSelections] = useState<Selection[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  // const [initialFileList, setInitialFileList] = useState<any[]>([]); // Store initial file list
  const [showPermalink, setShowPermalink] = useState(false);

  const selectedJobFamilyIds = allSelections.filter((sel) => sel.type === 'jobFamily').map((sel) => Number(sel.value));

  const selectedJobStreamIds = allSelections.filter((sel) => sel.type === 'jobStream').map((sel) => Number(sel.value));

  const selectedJobFamilyValues = selectedJobFamilyIds.map((id) => `job_family-${id}`);
  const selectedJobStreamValues = selectedJobStreamIds.map((id) => `stream-${id}`);
  const treeSelectValues = [...selectedJobFamilyValues, ...selectedJobStreamValues];

  useEffect(() => {
    if (jobFamiliesData?.jobFamilies && jobStreamsData?.jobProfileStreams) {
      const formatted = jobFamiliesData.jobFamilies.map((family) => {
        const children = jobStreamsData.jobProfileStreams
          .filter((stream) => stream.job_family_id === family.id)
          .map((stream) => ({
            value: `stream-${stream.id}`,
            title: stream.name,
            key: `stream-${stream.id}`,
          }));

        return {
          value: `job_family-${family.id}`,
          title: family.name,
          key: `job_family-${family.id}`,
          children,
        };
      });
      setTreeData(formatted);
    }
  }, [jobFamiliesData, jobStreamsData]);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      form.setFieldsValue({
        title: initialData?.title,
        description: initialData?.description,
        category: initialData?.category,
        permalink: initialData?.url,
        job_family_ids: initialData?.jobFamilies?.map((link: any) => link.jobFamily.id) || [],
        job_stream_ids: initialData?.streams?.map((link: any) => link.jobStream.id) || [],
      });

      const families =
        initialData?.jobFamilies?.map((link: any) => ({
          value: String(link.jobFamily.id),
          type: 'jobFamily',
        })) || [];
      const streams =
        initialData?.streams?.map((link: any) => ({
          value: String(link.jobStream.id),
          type: 'jobStream',
        })) || [];
      setAllSelections([...families, ...streams]);
      setShowPermalink(!!initialData?.url);
      if (initialData?.file) {
        const initialFile = {
          uid: '-1',
          name: initialData.file.name,
          status: 'done',
          url: initialData.file.url,
        };
        setFileList([initialFile]);
        // setInitialFileList([initialFile]); // Set the initialFileList
      } else {
        setFileList([]);
        // setInitialFileList([]);
      }
    }
  }, [mode, initialData, form]);

  const handleFileChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const proceedSubmission = async (submissionData: any) => {
    try {
      await onSubmit(submissionData, fileList);
      message.success(`${mode === 'upload' ? 'Document uploaded' : 'Document updated'} successfully!`);
      navigate('/help');
    } catch (error) {
      console.error(error);
      message.error('Error submitting the form.');
    }
  };

  const handleSubmit = async (values: any) => {
    const submissionData = {
      ...values,
      job_family_ids: selectedJobFamilyIds,
      job_stream_ids: selectedJobStreamIds,
    };

    // Check if the file has changed in edit mode
    if (mode === 'edit' && fileList[0]?.originFileObj) {
      Modal.confirm({
        title: 'Are you sure you want to replace this document?',
        onOk: () => proceedSubmission(submissionData),
        onCancel: () => {
          // Do nothing on cancel
        },
      });
    } else {
      await proceedSubmission(submissionData);
    }
  };

  const generatePermalink = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[\s\-\_]+/g, '-') // Replace spaces, hyphens, underscores with a single hyphen
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars except hyphens
      .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, '') // Trim hyphens from the start
      .replace(/-+$/, ''); // Trim hyphens from the end
  };

  if (familiesIsLoading || streamsIsLoading) {
    return <div>Loading...</div>;
  }

  const generateSlug = () => {
    let permalink = form.getFieldValue('permalink') || '';
    permalink = generatePermalink(permalink);
    form.setFieldsValue({ permalink });
    console.log(form.getFieldValue('permalink'));
  };

  const validateURL = () => {
    generateSlug();
    const slug: string = form.getFieldValue('permalink') || '';
    trigger(slug);
  };

  const showPermalinkInput = () => {
    setShowPermalink(true);
    const title = form.getFieldValue('title') || '';
    const permalink = generatePermalink(title);
    form.setFieldsValue({ permalink });
    console.log(form.getFieldValue('permalink'));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ minWidth: 600, maxWidth: 800, margin: '0 auto' }}
    >
      <Card style={{ marginTop: 16, marginBottom: 16 }} bordered={false}>
        <Form.Item
          label="Upload File"
          name="file"
          rules={[{ required: mode === 'upload', message: 'Please add a file' }]}
        >
          <Upload.Dragger
            name="file"
            multiple={false}
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              {mode === 'edit'
                ? 'Click or drag file to this area to replace the existing file'
                : 'Click or drag file to this area to upload'}
            </p>
            <p className="ant-upload-hint">Supports .doc, .docx, .pdf up to 10MB.</p>
          </Upload.Dragger>
        </Form.Item>
      </Card>
      <Card style={{ marginTop: 16, marginBottom: 16 }} bordered={false}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title' }]}>
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Card>
      <Card style={{ marginTop: 16, marginBottom: 16 }} bordered={false}>
        <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
          <Select>
            <Select.Option value="CAREER_MAP">Career Map</Select.Option>
            <Select.Option value="REFERENCE_GUIDE">Reference Guide</Select.Option>
            <Select.Option value="RESOURCES">Resources</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item dependencies={['category']} noStyle>
          {({ getFieldValue }) => {
            const categoryValue = getFieldValue('category');
            const showProfessions = ['CAREER_MAP', 'REFERENCE_GUIDE'].includes(categoryValue);
            return showProfessions ? (
              <>
                <Divider />
                <Form.Item label="Professions & Disciplines" name="treeSelect">
                  <AccessibleTreeSelect
                    width="550px"
                    placeholderText="Select professions and disciplines"
                    treeData={treeData}
                    treeValue={treeSelectValues}
                    onChange={(selectedItems: string[]) => {
                      const newSelections: Selection[] = [];
                      selectedItems.forEach((item) => {
                        if (item.startsWith('job_family-')) {
                          newSelections.push({
                            value: item.replace('job_family-', ''),
                            type: 'jobFamily',
                          });
                        } else if (item.startsWith('stream-')) {
                          newSelections.push({
                            value: item.replace('stream-', ''),
                            type: 'jobStream',
                          });
                        }
                      });
                      setAllSelections(newSelections);
                    }}
                  />

                  {(allSelections ?? []).length > 0 && (
                    <Row>
                      <Col span={24}>
                        <span
                          style={{
                            fontWeight: 500,
                            margin: '8px',
                            marginLeft: 0,
                            paddingRight: '8px',
                            borderRight: '2px solid rgba(0, 0, 0, 0.06)',
                            marginRight: '10px',
                          }}
                        >
                          Selected Professions and Disciplines
                        </span>
                        <Button
                          onClick={() => {
                            setAllSelections([]);
                          }}
                          type="link"
                          style={{ padding: '0', fontWeight: 400 }}
                          data-cy="clear-filters-button"
                        >
                          Clear all
                        </Button>
                      </Col>
                      <Col span={24}>
                        {/* Tags */}
                        {(allSelections ?? []).map((selection) => {
                          return (
                            <Tag
                              key={`${selection.type}-${selection.value}`}
                              onClose={() => {
                                setAllSelections([...allSelections.filter((sel) => sel.value !== selection.value)]);
                              }}
                              closable
                            >
                              {selection.type === 'jobStream'
                                ? jobStreamsData?.jobProfileStreams.find((s) => s.id === Number(selection.value))?.name
                                : jobFamiliesData?.jobFamilies.find((f) => f.id === Number(selection.value))?.name}
                            </Tag>
                          );
                        })}
                      </Col>
                    </Row>
                  )}
                </Form.Item>
              </>
            ) : null;
          }}
        </Form.Item>
      </Card>
      <Card style={{ marginTop: 16, marginBottom: 16 }} bordered={false}>
        <Form.Item label="Permanent link">
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              gap: 8,
            }}
          >
            <Typography.Text type="secondary">Creates a fixed URL for accessing the document.</Typography.Text>
            {!showPermalink ? (
              <Button
                icon={<PlusOutlined />}
                type="link"
                style={{ justifyContent: 'left' }}
                onClick={() => showPermalinkInput()}
              >
                Add Permalink
              </Button>
            ) : (
              <>
                <Form.Item name="permalink" noStyle>
                  <Input
                    addonBefore="https://jobstore.gov.bc.ca/document/"
                    onBlur={validateURL}
                    addonAfter={
                      <>
                        {!urlDoc?.checkURL ? (
                          <Tooltip title="URL is Valid">
                            <CheckCircleOutlined style={{ color: 'green' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title="URL is in use">
                            <CloseCircleOutlined style={{ color: 'red' }} />
                          </Tooltip>
                        )}
                      </>
                    }
                  />
                </Form.Item>
                {urlDoc?.checkURL && (
                  <Typography.Text type="danger">
                    URL is already in use. Please change to a different URL.
                  </Typography.Text>
                )}
              </>
            )}
          </div>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default DocumentForm;
