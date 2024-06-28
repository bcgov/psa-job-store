import { Collapse, List, Typography } from 'antd';
import React from 'react';
import { useGetCommentsQuery } from '../../../redux/services/graphql-api/comment.api';

const { Paragraph } = Typography;

interface CommentsCollapseProps {
  comments: {
    id: string;
    text: string;
    updated_at?: string;
  }[];
  showCollapse?: boolean;
}

const CommentsCollapse: React.FC<CommentsCollapseProps> = ({ comments, showCollapse = true }) => {
  const commentitems = comments.map((comment) => (
    <div key={comment.id} style={{ marginBottom: 16, width: '100%' }}>
      <Paragraph
        style={{
          width: '100%',
          color: 'rgba(0, 0, 0, 0.88)',
          fontSize: 14,
          fontWeight: '400',
          wordWrap: 'break-word',
          marginBottom: '2px',
        }}
      >
        {comment.text}
      </Paragraph>
      <Paragraph
        type="secondary"
        style={{
          color: '#6E6E6E',
          fontSize: 12,
          fontWeight: '400',
          wordWrap: 'break-word',
        }}
      >
        {new Date(comment.updated_at ?? '-1').toLocaleString('en-CA')}
      </Paragraph>
    </div>
  ));
  return showCollapse ? (
    <div
      style={{
        width: '100%',
        justifyContent: 'center',
        marginTop: '10px',
      }}
    >
      <Collapse
        style={{
          width: '100%',
          justifyContent: 'center',
        }}
        items={
          comments.length > 0
            ? [
                {
                  key: '1',
                  label: (
                    <div
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Paragraph
                        style={{
                          margin: 0,
                          fontSize: 14,
                        }}
                      >
                        Previous Comments
                      </Paragraph>
                    </div>
                  ),
                  children: (
                    <div style={{ maxHeight: 300, overflowY: 'auto', padding: '12px 16px' }}>{commentitems}</div>
                  ),
                },
              ]
            : []
        }
        defaultActiveKey={['1']}
      />
    </div>
  ) : (
    <div style={{ maxHeight: 300, overflowY: 'auto', padding: '12px 16px' }}>
      <List
        size="large"
        bordered={false}
        dataSource={commentitems}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

const CommentsList: React.FC<{ positionRequestId: number; showCollapse?: boolean }> = ({
  positionRequestId,
  showCollapse,
}) => {
  const { data, error, isLoading } = useGetCommentsQuery(positionRequestId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading comments</div>;

  const comments = data?.comments || [];

  return <CommentsCollapse comments={comments} showCollapse={showCollapse} />;
};

export default CommentsList;
