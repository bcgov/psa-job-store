import { Alert, Avatar, Card, List, Select, Space, Tabs, Tag } from 'antd';
import { useState } from 'react';
import ECLASSGraphic from '../../../assets/e_class.svg';
import OracleServiceCloudGraphic from '../../../assets/oracle_service_cloud.svg';
import PeopleSoftGraphic from '../../../assets/peoplesoft.svg';

export const NextSteps = () => {
  const [nextStepsRole, setNextStepsRole] = useState('CC');
  const [needsAttentionFrom, setNeedsAttentionFrom] = useState('CA');
  const [confirmationRequired, setConfirmationRequired] = useState('confirmationRequired');
  const [reviewRequired, setReviewRequired] = useState('required');
  const [exclusionType, setExclusionType] = useState('Included');

  return (
    <Card
      title={
        <>
          <span>Next steps</span>
          <Select
            bordered={false}
            style={{ float: 'right' }}
            defaultValue={'CC'}
            onChange={(value) => setNextStepsRole(value)}
            value={nextStepsRole}
            options={[
              { value: 'CC', label: 'Classification Co-ordinator' },
              { value: 'CA', label: 'Classification Analyst' },
              { value: 'CS', label: 'Classification Specialist' },
            ]}
          ></Select>
        </>
      }
      style={{ marginBottom: '1rem' }}
    >
      {nextStepsRole == 'CC' && (
        <Tabs
          // activeKey={activeTabKey}
          // onChange={(key) => setActiveTabKey(key)}
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Collect details',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        height: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                        display: 'inline-flex',
                      }}
                    >
                      If you need any additional information from the client:
                    </div>
                    <div></div>
                  </div>
                  <List>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={'CRM: Contact the client via CRM'}
                        description="Add Job Store submission link (from the original service request) for the reference."
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={
                          <>
                            CRM: Update CRM ticket status to <Tag color="gold">Waiting - client</Tag>
                          </>
                        }
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={'CRM: Repeat until you gather all the required information/answers.'}
                      />
                    </List.Item>
                  </List>
                  <Alert
                    style={{ marginBottom: '1rem' }}
                    message={
                      <div className="alert-with-link">
                        If a formal Classification Review is required and a client wishes to proceed with it, proceed to
                        ‘Classification review’.
                      </div>
                    }
                    type="info"
                    showIcon
                  />
                </Space>
              ),
            },
            {
              key: '2',
              label: 'Further verification',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        height: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                        display: 'inline-flex',
                      }}
                    >
                      <span>Needs the attention of an :</span>
                      <Select
                        style={{
                          width: '120px',
                        }}
                        defaultValue={'CA'}
                        value={needsAttentionFrom}
                        onChange={(value) => setNeedsAttentionFrom(value)}
                        options={[
                          { value: 'CA', label: 'Analyst' },
                          { value: 'CS', label: 'Specialist' },
                        ]}
                      ></Select>
                    </div>
                    <div></div>
                  </div>
                  {needsAttentionFrom === 'CA' ? (
                    <>
                      <List>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={'CRM: Send a private note to an Analyst in CRM'}
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              <>
                                CRM: Reassign the CRM ticket to <Tag>Classification Analyst</Tag>
                              </>
                            }
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              <>
                                CRM: Reassign the CRM ticket to <Tag color="purple">Unresolved</Tag>
                              </>
                            }
                          />
                        </List.Item>
                      </List>
                      <Alert
                        style={{ marginBottom: '1rem' }}
                        message={
                          <div className="alert-with-link">
                            If Analyst reassigns the ticket, and requests preparation for a review, proceed to
                            Classification review’.
                            {/* <Link to="#" className="alert-extra-link">
Learn More
</Link> */}
                          </div>
                        }
                        type="info"
                        showIcon
                      />
                    </>
                  ) : (
                    <>
                      <List>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={<>CRM: Send an email to a Specialist attaching the ticket information</>}
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              <>
                                CRM: Update CRM ticket status to <Tag color="purple">Waiting - internal</Tag>
                              </>
                            }
                          />
                        </List.Item>
                      </List>
                      <Alert
                        style={{ marginBottom: '1rem' }}
                        message={
                          <div>
                            <div>
                              <b>If specialist:</b>
                            </div>
                            <ol>
                              <li>Requests additional information from client, proceed to ‘Collect details’.</li>
                              <li>Confirms classification review is required, proceed to ‘Formal review’.</li>
                              <li>Confirms that the new position can be approved, proceed to ‘Approve’.</li>
                            </ol>
                          </div>
                        }
                        type="info"
                        showIcon
                      />
                    </>
                  )}
                </Space>
              ),
            },
            {
              key: '3',
              label: 'Classification review',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: 10,
                        display: 'inline-flex',
                      }}
                    >
                      <div></div>
                      <div
                        style={{
                          alignSelf: 'stretch',
                          height: 32,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: 4,
                          display: 'inline-flex',
                        }}
                      >
                        <span>If a formal Classification Review is required and </span>
                        <Select
                          defaultValue={'confirmationRequired'}
                          value={confirmationRequired}
                          onChange={(value) => setConfirmationRequired(value)}
                          options={[
                            {
                              value: 'confirmationRequired',
                              label: 'Client confirmation is required',
                            },
                            { value: 'proceed', label: 'Client wishes to proceed with it' },
                          ]}
                        ></Select>
                      </div>
                      <div></div>
                    </div>
                  </div>

                  {confirmationRequired === 'confirmationRequired' ? (
                    <>
                      <List>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              'CRM: Contact client to ask if they want to proceed with a formal Classification Review. '
                            }
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              <>
                                CRM: Reassign the CRM ticket to <Tag color={'gold'}>Waiting - client</Tag>
                              </>
                            }
                          />
                        </List.Item>
                      </List>{' '}
                    </>
                  ) : (
                    <>
                      <List>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={ECLASSGraphic} />}
                            title={<>ECLASS: Prepare ECLASS by attaching the modified Job Profile.</>}
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={PeopleSoftGraphic} />}
                            title={
                              <>
                                PeopleSoft: Update History for the proposed position in PeopleSoft, starting with
                                creating a new line
                              </>
                            }
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={PeopleSoftGraphic} />}
                            title={<>PeopleSoft: Add ECLASS # to “Case/Profile”</>}
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={PeopleSoftGraphic} />}
                            title={<>PeopleSoft: Add CRM ticket # to “Detailed Position Description”</>}
                            description={'Proposed position # is in the original service request (in private note)'}
                          />
                        </List.Item>

                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              <>
                                CRM: Change “Category” of the CRM ticket to <Tag>Classification Review</Tag>
                              </>
                            }
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              <>
                                CRM: Change “Case ID” to <Tag>ECLASS</Tag>
                              </>
                            }
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              <>
                                CRM: Reassign the CRM ticket to <Tag>Classification Specialist</Tag>
                              </>
                            }
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              <>
                                CRM: Update CRM ticket status to <Tag color={'purple'}>Unresolved</Tag>
                              </>
                            }
                          />
                        </List.Item>
                      </List>
                      <Alert
                        style={{ marginBottom: '1rem' }}
                        message={
                          <span>
                            For Job Store clients, they <b>do not</b> need to submit another form to request a
                            Classification Review.
                          </span>
                        }
                        type="info"
                        showIcon
                      />
                    </>
                  )}
                </Space>
              ),
            },
            {
              key: '4',
              label: 'Exclusion review',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        height: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                        display: 'inline-flex',
                      }}
                    >
                      <span>If Classification Review is not required and the position is </span>
                      <Select
                        defaultValue={'Included'}
                        value={exclusionType}
                        onChange={(value) => setExclusionType(value)}
                        style={{ width: '120px' }}
                        options={[
                          { value: 'Included', label: 'Included' },
                          { value: 'Excluded', label: 'Excluded' },
                        ]}
                      />
                    </div>
                    <div></div>
                  </div>

                  {exclusionType === 'Excluded' && (
                    <List>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" src={ECLASSGraphic} />}
                          title="ECLASS: If the profile is not significantly modified and the changes are ok'd by the Analyst:"
                          description="Set up a case to document modified profile."
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                          title={
                            <>
                              CRM: Update "Category" of the CRM ticket to <Tag>Exclude a position</Tag>
                            </>
                          }
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                          title={
                            <>
                              CRM: Update "Case ID" to <Tag>ECLASS</Tag>
                            </>
                          }
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                          title={
                            <>
                              CRM: Reassign the CRM ticket to an <Tag>Exclusion Advisor</Tag>
                            </>
                          }
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                          title={
                            <>
                              CRM: Update CRM ticket status to <Tag color="purple">Unresolved</Tag>
                            </>
                          }
                        />
                      </List.Item>
                    </List>
                  )}

                  {exclusionType === 'Included' && (
                    <>
                      <List>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={PeopleSoftGraphic} />}
                            title={
                              <>
                                PeopleSoft: Change the position status to <Tag color={'cyan'}>Approved</Tag>
                              </>
                            }
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={PeopleSoftGraphic} />}
                            title={'PeopleSoft: Add CRM ticket # to "Detailed Position Description"'}
                            description={'Proposed position # is in the original service request (in private note)'}
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              'CRM: Send a notification to the client with the new position number using standard text'
                            }
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={
                              <>
                                CRM: Update CRM ticket status to <Tag color={'cyan'}>Solved</Tag>
                              </>
                            }
                          />
                        </List.Item>
                      </List>
                      <Alert
                        style={{ marginBottom: '1rem' }}
                        message={<span>No actions required in Job Store.</span>}
                        type="info"
                        showIcon
                      />
                    </>
                  )}
                </Space>
              ),
            },
            {
              key: '5',
              label: 'Cancel request',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        height: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                        display: 'inline-flex',
                      }}
                    >
                      If the request was made by mistake or is no longer needed after verification or review:
                    </div>
                    <div></div>
                  </div>

                  <List>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={PeopleSoftGraphic} />}
                        title={
                          <>
                            PeopleSoft: Change the position status to <Tag>Inactive</Tag>
                          </>
                        }
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={
                          <>
                            CRM: Update CRM ticket status to <Tag color="cyan">Solved</Tag>
                          </>
                        }
                      />
                    </List.Item>
                  </List>
                </Space>
              ),
            },
            {
              key: '6',
              label: 'Approve',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        height: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                        display: 'inline-flex',
                      }}
                    >
                      <span>If Classification Review is not required: </span>
                    </div>
                    <div></div>
                  </div>

                  <List>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={PeopleSoftGraphic} />}
                        title={
                          <>
                            PeopleSoft: Change the position status to <Tag>Approved</Tag>
                          </>
                        }
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={PeopleSoftGraphic} />}
                        title={'PeopleSoft: Add CRM ticket # to “Detailed Position Description”'}
                        description={'Proposed position # is in the original service request (in private note)'}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={
                          'CRM: Send a notification to the client with the new position number using standard text.'
                        }
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={
                          <>
                            CRM: Update CRM ticket status to <Tag color={'cyan'}>Solved</Tag>
                          </>
                        }
                      />
                    </List.Item>
                  </List>
                  <Alert
                    style={{ marginBottom: '1rem' }}
                    message={<span>No actions required in Job Store.</span>}
                    type="info"
                    showIcon
                  />
                </Space>
              ),
            },
          ]}
          tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
        />
      )}
      {nextStepsRole == 'CA' && (
        <Tabs
          // activeKey={activeTabKey}
          // onChange={(key) => setActiveTabKey(key)}
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Collect details',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        height: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                        display: 'inline-flex',
                      }}
                    >
                      If you need any additional information from the client:
                    </div>
                    <div></div>
                  </div>
                  <List>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={'CRM: Contact the client via CRM'}
                        description="Add Job Store submission link (from the original service request) for the reference."
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={
                          <>
                            CRM: Update CRM ticket status to <Tag color="gold">Waiting - client</Tag>
                          </>
                        }
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={'CRM: Repeat until you gather all the required information/answers.'}
                      />
                    </List.Item>
                  </List>
                  {/* <Alert
                style={{ marginBottom: '1rem' }}
                message={
                  <div className="alert-with-link">
                    If a formal Classification Review is required and a client wishes to proceed
                    with it, proceed to ‘Classification review’.
                  </div>
                }
                type="info"
                showIcon
              /> */}
                </Space>
              ),
            },
            {
              key: '2',
              label: 'Further verification',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        height: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                        display: 'inline-flex',
                      }}
                    >
                      <span>Needs the attention of a Specialist:</span>
                    </div>
                    <div></div>
                  </div>
                  <>
                    <List>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                          title={<>CRM: Send an email to a Specialist attaching the ticket information</>}
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                          title={
                            <>
                              CRM: Update CRM ticket status to <Tag color="purple">Waiting - internal</Tag>
                            </>
                          }
                        />
                      </List.Item>
                    </List>
                  </>
                </Space>
              ),
            },
            {
              key: '3',
              label: 'Classification review',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: 10,
                        display: 'inline-flex',
                      }}
                    >
                      <div></div>
                      <div
                        style={{
                          alignSelf: 'stretch',
                          height: 32,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: 4,
                          display: 'inline-flex',
                        }}
                      >
                        <span>If a formal Classification Review is required and </span>
                        <Select
                          defaultValue={'confirmationRequired'}
                          value={confirmationRequired}
                          onChange={(value) => setConfirmationRequired(value)}
                          options={[
                            {
                              value: 'confirmationRequired',
                              label: 'Client confirmation is required',
                            },
                            { value: 'proceed', label: 'Client wishes to proceed with it' },
                            { value: 'revert', label: 'Client wishes to revert changes' },
                            { value: 'droppedRequest', label: 'Client drops the request' },
                            { value: 'noResponse', label: 'Client does not respond' },
                          ]}
                        ></Select>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  {(() => {
                    switch (confirmationRequired) {
                      case 'confirmationRequired':
                        return (
                          <>
                            <List>
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                                  title={
                                    'CRM: Contact client to ask if they want to proceed with a formal Classification Review. '
                                  }
                                />
                              </List.Item>
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                                  title={
                                    <>
                                      CRM: Reassign the CRM ticket to <Tag color={'gold'}>Waiting - client</Tag>
                                    </>
                                  }
                                />
                              </List.Item>
                            </List>{' '}
                          </>
                        );
                      case 'proceed':
                        return (
                          <>
                            <List>
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                                  title={<>CRM: Reassign the CRM ticket to the original Co-ordinator</>}
                                  description="Advise them to set up a review (add private note for co-ordinator about the decision)."
                                />
                              </List.Item>
                            </List>
                          </>
                        );
                      case 'revert':
                        return (
                          <>
                            <List>
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                                  title={<>CRM: Reassign the CRM ticket to the original Co-ordinator</>}
                                  description="Advise them to check for reverted changes, approve the position, and close the ticket."
                                />
                              </List.Item>
                            </List>
                          </>
                        );
                      case 'droppedRequest':
                        return (
                          <>
                            <List>
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                                  title={
                                    <>
                                      CRM: Update CRM ticket status to <Tag color={'cyan'}>Solved</Tag>
                                    </>
                                  }
                                />
                              </List.Item>
                            </List>
                          </>
                        );
                      case 'noResponse':
                        return (
                          <>
                            <List>
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                                  title={<>CRM: Follow up every 2 weeks whether they need assistance.</>}
                                />
                              </List.Item>
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                                  title={
                                    <>
                                      CRM: After 2 follow-ups without any response, close the ticket by setting the CRM
                                      ticket status to <Tag color={'cyan'}>Solved</Tag>
                                    </>
                                  }
                                />
                              </List.Item>
                            </List>
                          </>
                        );
                      default:
                        return <></>;
                    }
                  })()}
                </Space>
              ),
            },
          ]}
          tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
        />
      )}
      {nextStepsRole == 'CS' && (
        <Tabs
          // activeKey={activeTabKey}
          // onChange={(key) => setActiveTabKey(key)}
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Collect details',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        height: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                        display: 'inline-flex',
                      }}
                    >
                      If you need any additional information from the client:
                    </div>
                    <div></div>
                  </div>
                  <List>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={'CRM: Request the Co-ordinator/Analyst to contact the client.'}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                        title={<>CRM: Repeat until you gather all the required information/answers.</>}
                      />
                    </List.Item>
                  </List>
                </Space>
              ),
            },
            {
              key: '2',
              label: 'Further verification',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        height: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                        display: 'inline-flex',
                      }}
                    >
                      <span>If a formal Classification Review is </span>
                      <Select
                        style={{ width: '120px' }}
                        defaultValue={'required'}
                        value={reviewRequired}
                        onChange={(value) => setReviewRequired(value)}
                        options={[
                          {
                            value: 'required',
                            label: 'Required',
                          },
                          { value: 'notRequired', label: 'Not required' },
                        ]}
                      ></Select>
                    </div>
                    <div></div>
                  </div>
                  {reviewRequired === 'required' ? (
                    <>
                      <List>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={<>CRM: Ask Co-ordinator to notify client</>}
                            description="Advice them to get confirmation from the client on whether to proceed with the review."
                          />
                        </List.Item>
                      </List>
                    </>
                  ) : (
                    <>
                      <List>
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" src={OracleServiceCloudGraphic} />}
                            title={<>CRM: Ask Co-ordinator to approve position</>}
                          />
                        </List.Item>
                      </List>
                    </>
                  )}
                </Space>
              ),
            },
            {
              key: '3',
              label: 'Classification review',
              children: (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: 10,
                        display: 'inline-flex',
                      }}
                    >
                      <div></div>
                      <div
                        style={{
                          alignSelf: 'stretch',
                          height: 32,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: 4,
                          display: 'inline-flex',
                        }}
                      >
                        <span>
                          If a formal Classification Review is set up by the Co-ordinator,{' '}
                          <b>proceed with the usual Classification Review process.</b>{' '}
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <Alert
                    style={{ marginBottom: '1rem' }}
                    message={
                      <div className="alert-with-link">
                        For Job Store clients, ECLASS will not include a Classification Review request form. Specialists
                        can access the original submission in Job Store but are not required to perform any actions in
                        Job Store.
                      </div>
                    }
                    type="info"
                    showIcon
                  />
                </Space>
              ),
            },
          ]}
          tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
        />
      )}
    </Card>
  );
};
