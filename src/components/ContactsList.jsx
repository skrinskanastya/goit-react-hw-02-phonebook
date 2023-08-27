export const ContactsList = ({ filteredContacts, onDelete }) => {
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name} : {contact.number}
            <button type="button" onClick={() => onDelete(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
