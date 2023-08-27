import { Formik, Field, Form, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

const ContactsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(9, 'Too Short!')
    .max(13, 'Too Long!')
    .matches(/^[0-9+-]+$/, 'Phone number must contain only digits and +')
    .required('Required'),
});

export const ContactForm = ({ contacts, onUpdate }) => {
  const handleAddContact = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    const newContacts = [...contacts, newContact];
    onUpdate(newContacts);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactsSchema}
      onSubmit={handleAddContact}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field type="text" id="name" name="name" />
        <ErrorMessage name="name" />
        <label htmlFor="phone">Phone</label>
        <Field type="tel" id="phone" name="number" />
        <ErrorMessage name="number" />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
