// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // This is a minimal example of the edit form. Used for debugging and troubleshooting
// import { Form } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
// import { useEffect, useState } from 'react';
// import { useFieldArray, useForm } from 'react-hook-form';
// import { FormItem } from '../../../utils/FormItem';

// export const Testt = () => {
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       test: [
//         { firstName: 'Bill', lastName: 'Luo' },
//         { firstName: 'Bill2', lastName: 'Luo' },
//       ],
//     },
//   });
//   const { fields, remove } = useFieldArray({
//     control,
//     name: 'test',
//   });

//   const onSubmit = (data: any) => {
//     // submitHandler?.(data);
//   };

//   const [renderKey, setRenderKey] = useState(0);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     form.resetFields();
//   }, [renderKey, form]);

//   return (
//     <Form onFinish={handleSubmit(onSubmit)} key={renderKey} form={form}>
//       <h1>Field Array </h1>
//       <p>The following demo allows you to delete, append, prepend items</p>
//       <ul>
//         {fields.map((item, index) => {
//           return (
//             <li key={item.id}>
//               {item.id}
//               <FormItem
//                 key={item.id}
//                 name={`test.${index}.firstName`}
//                 control={control}
//                 style={{ flex: 1, marginRight: '10px', marginBottom: '0px' }}
//               >
//                 <TextArea autoSize />
//               </FormItem>

//               <button
//                 type="button"
//                 onClick={() => {
//                   remove(index);
//                   setRenderKey((prevKey) => prevKey + 1);
//                 }}
//               >
//                 Delete
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//       <input type="submit" />
//     </Form>
//   );
// };
