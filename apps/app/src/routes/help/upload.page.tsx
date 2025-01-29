import { Form, message } from 'antd';
import axios from 'axios';
import { VITE_BACKEND_URL } from '../../../envConfig';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import DocumentForm from './documentForm.component';

export const UploadHelpDocPage = () => {
  const [form] = Form.useForm();

  const handleUpload = async (values: any, fileList: any[]) => {
    const formData = new FormData();
    if (fileList[0]) {
      formData.append('file', fileList[0].originFileObj);
    }
    formData.append('title', values.title);
    formData.append('description', values.description || '');
    formData.append('category', values.category);
    formData.append('url', values.permalink || '');
    formData.append('job_family_ids', JSON.stringify(values.job_family_ids));
    formData.append('job_stream_ids', JSON.stringify(values.job_stream_ids));
    // Add additional form data as needed
    const response = await axios.post(`${VITE_BACKEND_URL}/document/create`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    message.success('Form submitted successfully!');
    console.log(response.data);
  };

  const handleButtonClick = () => {
    form.submit(); // Submit the form programmatically
  };

  return (
    <>
      <PageHeader
        title="Upload a new document"
        showButton1
        button1Text="Upload"
        button1Callback={handleButtonClick} // Use the callback that submits the form
      />
      <ContentWrapper>
        <DocumentForm mode="upload" onSubmit={handleUpload} form={form} />
      </ContentWrapper>
    </>
  );
};
