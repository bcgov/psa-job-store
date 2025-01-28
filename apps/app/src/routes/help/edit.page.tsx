import { Form, Menu, message, Modal } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { VITE_BACKEND_URL } from '../../../envConfig';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import { useGetDocumentByIdQuery } from '../../redux/services/graphql-api/document.api';
import DocumentForm from './documentForm.component';

export const EditDocumentPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: documentData, isLoading } = useGetDocumentByIdQuery(id ?? '-1');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleUpdate = async (values: any, fileList: any[]) => {
    try {
      const formData = new FormData();

      if (fileList && fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('file', fileList[0].originFileObj);
      }

      formData.append('title', values.title);
      formData.append('description', values.description || '');
      formData.append('category', values.category);
      formData.append('url', values.permalink || '');
      formData.append('job_family_ids', JSON.stringify(values.job_family_ids));
      formData.append('job_stream_ids', JSON.stringify(values.job_stream_ids));

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      await axios.put(`${VITE_BACKEND_URL}/document/update/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      message.success('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
      message.error('Error updating document.');
    }
  };
  const deleteDocument = async () => {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/document/delete/${documentData?.document?.id}`);
      message.success('Document deleted successfully');
      navigate('/help');
    } catch (error) {
      console.error('Error deleting document:', error);
      message.error('Error deleting the document');
    }
  };

  const handleButtonClick = () => {
    form.submit();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const baseUrl = `${VITE_BACKEND_URL}/document`;
  const documentId = documentData?.document?.id;
  const isPdf = documentData?.document?.file_extension === '.pdf';
  const inlineUrl = `${baseUrl}/${documentId}/file?mode=inline`;
  const downloadUrl = `${baseUrl}/${documentId}/file?mode=download`;

  // Handle menu item clicks
  const handleMenuClick = (e: { key: string }) => {
    if (e.key === 'delete') {
      Modal.confirm({
        title: 'Are you sure you want to delete this document?',
        onOk: () => deleteDocument(),
      });
    }
  };

  // Create the menu
  const getMenuContent = () => {
    return (
      <Menu onClick={handleMenuClick}>
        {isPdf && (
          <Menu.Item key="open">
            <a href={inlineUrl} target="_blank" rel="noopener noreferrer">
              Open
            </a>
          </Menu.Item>
        )}
        <Menu.Item key="download">
          <a href={downloadUrl} rel="noopener noreferrer">
            Download
          </a>
        </Menu.Item>
        <Menu.Item key="delete">Delete</Menu.Item>
      </Menu>
    );
  };
  return (
    <>
      <PageHeader
        title="Edit Document"
        button1Content={getMenuContent} // Changed from "Delete" to "Update" to match the form submission
        showButton1
        showButton2
        button2Text="Update"
        button2Callback={handleButtonClick} // Existing delete function
      />
      <ContentWrapper>
        <DocumentForm
          mode="edit"
          initialData={documentData?.document}
          onSubmit={handleUpdate}
          form={form} // Pass the form instance
        />
      </ContentWrapper>
    </>
  );
};
