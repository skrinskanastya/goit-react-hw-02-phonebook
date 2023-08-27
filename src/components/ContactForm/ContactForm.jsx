import { Formik, Field } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { StyledForm, StyledBtn, ErrorMsg } from './ContactForm.styled';

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
    if (contacts.some(contact => contact.name === values.name)) {
      alert(`${values.name} is already in contacts.`);
      return;
    }
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
      <StyledForm>
        <label htmlFor="name">Name</label>
        <Field type="text" id="name" name="name" />
        <ErrorMsg name="name" component={'div'} />
        <label htmlFor="phone">Number</label>
        <Field type="tel" id="phone" name="number" />
        <ErrorMsg name="number" component={'div'} />
        <StyledBtn type="submit">Add contact</StyledBtn>
      </StyledForm>
    </Formik>
  );
};
