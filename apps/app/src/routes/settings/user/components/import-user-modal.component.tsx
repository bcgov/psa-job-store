import { ReloadOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Input, List, Modal, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { ImportUserSearchResult } from '../../../../redux/services/graphql-api/settings/dtos/import-user-search-result.dto';
import {
  useImportUserMutation,
  useLazyImportUserSearchQuery,
} from '../../../../redux/services/graphql-api/settings/settings.api';

export const ImportUserModal = () => {
  const [importUserSearchTrigger, { currentData: importUserSearchData, isFetching: importUserSearchDataIsFetching }] =
    useLazyImportUserSearchQuery();
  const [importUserTrigger, { isLoading: importUserIsLoading }] = useImportUserMutation();

  const [visible, setVisible] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<ImportUserSearchResult[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    return () => setSearchValue('');
  }, []);

  useEffect(() => {
    setSearchResults([...(importUserSearchData?.importUserSearch ?? [])]);
  }, [searchValue, importUserSearchData?.importUserSearch]);

  const handleSearch = (value: string) => {
    if (value === '') {
      setSearchResults([]);
    } else {
      importUserSearchTrigger({ email: value }, false);
    }
  };

  return (
    <>
      <Button onClick={() => setVisible(true)} icon={<UserAddOutlined />} type="primary">
        Add
      </Button>
      <Modal
        onCancel={() => {
          setSearchValue('');
          setVisible(false);
        }}
        onOk={() => {
          setSearchValue('');
          setVisible(false);
        }}
        centered
        closeIcon={null}
        destroyOnClose
        footer={null}
        open={visible}
        style={{ margin: '4rem' }}
        styles={{
          content: {
            padding: '0.5rem',
          },
          body: {
            padding: '0.5rem',
          },
        }}
        title={
          <Input.Search
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            allowClear
            placeholder="Search for user by email address"
            prefix={<SearchOutlined />}
            size="large"
            value={searchValue}
          />
        }
        width={720}
      >
        <List
          dataSource={searchResults}
          loading={importUserSearchDataIsFetching || importUserIsLoading}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Tooltip title={item.source.includes('job-store') ? 'Force refresh' : 'Add user'}>
                  <Button onClick={() => importUserTrigger({ id: item.id })} shape="circle" type="primary">
                    {item.source.includes('job-store') ? <ReloadOutlined /> : <UserAddOutlined />}
                  </Button>
                </Tooltip>,
              ]}
              key={item.id}
            >
              <List.Item.Meta title={item.name} description={item.email} />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};
