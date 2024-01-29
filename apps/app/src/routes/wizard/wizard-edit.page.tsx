export interface InputData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface WizardEditPageProps {
  onBack?: () => void;
  onNext?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WizardEditPage: React.FC<WizardEditPageProps> = () => {
  return <div></div>;
  // // "wizardData" may be the data that was already saved in context. This is used to support "back" button
  // // functionality from the review screen (so that form contains data the user has previously entered)
  // const {
  //   wizardData,
  //   setWizardData,
  //   classificationsData,
  //   setClassificationsData,
  //   errors,
  //   setErrors,
  //   positionRequestProfileId,
  //   positionRequestId,
  // } = useWizardContext();
  // const [updatePositionRequest] = useUpdatePositionRequestMutation();
  // const profileId = positionRequestProfileId;
  // function receivedClassificationsDataCallback(data: GetClassificationsResponse) {
  //   setClassificationsData(data);
  // }
  // function getClassificationById(id: string): ClassificationModel | undefined {
  //   // If data is loaded, find the classification by ID
  //   if (classificationsData) {
  //     return classificationsData.classifications.find(
  //       (classification: ClassificationModel) => classification.id === id,
  //     );
  //   }
  //   return;
  // }
  // function transformFormData(input: InputData): JobProfileModel {
  //   // console.log('transformFormData input: ', input);
  //   // Transforms data generated by the form, which is in a format like this:
  //   // {"title":"lorem ipsum","classification":"Clerk 9","context":"lorem ipsum","overview":"lorem ipsum",
  //   //  "required_accountabilities.0":"req acc 1","optional_accountabilities.0":"opt acc 1",
  //   //  "requirements.0":"req 1","requirements.1":"req 2","requirements.2":"req 3",
  //   //  "behavioural_competencies.0.behavioural_competency.name":"beh 1",
  //   //  "behavioural_competencies.0.behavioural_competency.description":"beh des 1"}
  //   //
  //   // To a format that's consistent with data returned from the api, which is in a format like this:
  //   // {"id":1,"stream":"CORPORATE","title":"lorem ipsum","number":0,"context":"lorem ipsum","overview":"lorem ipsum",
  //   //  "accountabilities":{"optional":["opt acc 1"],"required":["req acc 1"]},"requirements":["req 1","req 2","req 3"],
  //   //  "behavioural_competencies":[{"behavioural_competency":{"id":1,"name":"beh 1","description":"beh des 1"}}],
  //   //   "classification":{"id":1,"occupation_group":{"id":1,"code":"CLK","name":"Clerk"},"grid":{"id":1,"name":"9"}},
  //   //   "family":null,"role":null,"category":null,"ministry":null,"reports_to":null}
  //   // this is so that the edited data can be displayed for review (since this component uses API format data)
  //   const output: JobProfileModel = {
  //     id: parseInt(input.id),
  //     type: 'USER',
  //     title: { value: input['title.value'], isCustom: input['title.isCustom'], disabled: input['title.disabled'] },
  //     number: parseInt(input.number),
  //     organization_id: '-1',
  //     jobFamilies: [] as JobFamily[],
  //     streams: [] as Stream[],
  //     context: input.context,
  //     overview: {
  //       value: input['overview.value'],
  //       isCustom: input['overview.isCustom'],
  //       disabled: input['overview.disabled'],
  //     },
  //     accountabilities: [] as AccountabilitiesModel[],
  //     requirements: [] as string[],
  //     behavioural_competencies: [] as BehaviouralCompetencies[],
  //     classifications: [] as ClassificationModelWrapped[],
  //   };
  //   Object.keys(input).forEach((key) => {
  //     const keys = key.split('.');
  //     const value = input[key];
  //     if (keys.length !== 1) {
  //       if (key.startsWith('classification')) {
  //         // console.log('starts with classification');
  //         const parts = key.split('.');
  //         const index = parseInt(parts[1]);
  //         // console.log('index: ', index, ' value: ', value);
  //         const classificationData = getClassificationById(value);
  //         // console.log('classificationData: ', classificationData);
  //         if (classificationData) {
  //           if (output.classifications) output.classifications[index] = { classification: classificationData };
  //         }
  //       }
  //       if (key.startsWith('required_accountabilities')) {
  //         const parts = key.split('.');
  //         const index = parseInt(parts[1]);
  //         if (!output.accountabilities.required[index]) {
  //           if (input[`required_accountabilities.${index}.value`] != '') {
  //             output.accountabilities.required[index] = {
  //               value: input[`required_accountabilities.${index}.value`],
  //               isCustom: input[`required_accountabilities.${index}.isCustom`],
  //               disabled: input[`required_accountabilities.${index}.disabled`],
  //             };
  //           }
  //         }
  //       } else if (key.startsWith('optional_accountabilities')) {
  //         const parts = key.split('.');
  //         const index = parseInt(parts[1]);
  //         if (!output.accountabilities.optional[index]) {
  //           if (input[`optional_accountabilities.${index}.value`] != '') {
  //             output.accountabilities.optional[index] = {
  //               value: input[`optional_accountabilities.${index}.value`],
  //               isCustom: input[`optional_accountabilities.${index}.isCustom`],
  //               disabled: input[`optional_accountabilities.${index}.disabled`],
  //             };
  //           }
  //         }
  //       } else if (key.startsWith('requirements')) {
  //         const parts = key.split('.');
  //         const index = parseInt(parts[1]);
  //         if (!output.requirements[index]) {
  //           if (input[`requirements.${index}.value`] != '') {
  //             output.requirements[index] = {
  //               value: input[`requirements.${index}.value`],
  //               isCustom: input[`requirements.${index}.isCustom`],
  //               disabled: input[`requirements.${index}.disabled`],
  //             };
  //           }
  //         }
  //       } else if (key.startsWith('behavioural_competencies')) {
  //         const parts = key.split('.');
  //         const index = parseInt(parts[1]);
  //         if (!output.behavioural_competencies[index]) {
  //           output.behavioural_competencies[index] = { behavioural_competency: { id: -1, name: '', description: '' } };
  //         }
  //         if (parts[3] === 'name') {
  //           output.behavioural_competencies[index].behavioural_competency.name = value;
  //         } else if (parts[3] === 'description') {
  //           output.behavioural_competencies[index].behavioural_competency.description = value;
  //         } else if (parts[3] === 'id') {
  //           output.behavioural_competencies[index].behavioural_competency.id = parseInt(value);
  //         }
  //       }
  //     }
  //   });
  //   // console.log('transformFormData output: ', output);
  //   return output as unknown as JobProfileModel;
  // }
  // const wizardEditProfileRef = useRef<{
  //   submit: () => void;
  //   getFormData: () => ReturnType<FormInstance['getFieldsValue']>;
  // }>(null);
  // // const navigate = useNavigate();
  // const onNextCallback = async () => {
  //   if (errors.length) {
  //     Modal.error({
  //       title: 'Errors',
  //       content: (
  //         <List>
  //           {errors.map((message, index) => (
  //             <List.Item>
  //               <p key={index}>{message}</p>
  //             </List.Item>
  //           ))}
  //         </List>
  //       ),
  //     });
  //     return;
  //   }
  //   // Create an entry in My Positions
  //   const formData = wizardEditProfileRef.current?.getFormData();
  //   const transformedData = transformFormData(formData);
  //   setWizardData(transformedData);
  //   try {
  //     if (positionRequestId)
  //       await updatePositionRequest({
  //         id: positionRequestId,
  //         step: 3,
  //         profile_json: transformedData,
  //         title: formData['title.value'],
  //         // classification_code: classification ? classification.code : '',
  //       }).unwrap();
  //   } catch (error) {
  //     // Handle the error, possibly showing another modal
  //     Modal.error({
  //       title: 'Error updating position',
  //       content: 'An unknown error occurred', //error.data?.message ||
  //     });
  //   }
  //   if (onNext) onNext();
  // };
  // return (
  //   <WizardPageWrapper
  //     title="Edit profile"
  //     subTitle="Make changes to an approved job profile (optional)"
  //     xxl={14}
  //     xl={18}
  //     lg={18}
  //   >
  //     <WizardSteps current={2} xl={24}></WizardSteps>
  //     <WizardEditControlBar
  //       style={{ marginBottom: '1rem' }}
  //       onNext={onNextCallback}
  //       onChooseDifferentProfile={onBack}
  //       showChooseDifferentProfile={true}
  //       nextText="Save and Next"
  //     />
  //     <WizardEditProfile
  //       ref={wizardEditProfileRef}
  //       profileData={wizardData}
  //       id={profileId?.toString()}
  //       submitText="Review Profile"
  //       // submitHandler={onSubmit}
  //       showBackButton={true}
  //       receivedClassificationsDataCallback={receivedClassificationsDataCallback}
  //       setErrors={setErrors}
  //     ></WizardEditProfile>
  //   </WizardPageWrapper>
  // );
};
