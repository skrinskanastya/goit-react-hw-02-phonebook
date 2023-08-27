import { StyledBtn } from './ContactsList.styled';
export const ContactsList = ({ filteredContacts, onDelete }) => {
  return (
    <div>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name} : {contact.number}
            <StyledBtn type="button" onClick={() => onDelete(contact.id)}>
              Delete
            </StyledBtn>
          </li>
        ))}
      </ul>
    </div>
  );
};
