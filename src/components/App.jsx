import { ContactForm } from './ContactForm';
import { Component } from 'react';
import { Filter } from './Filter';
import { ContactsList } from './ContactsList';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  updateContacts = newContacts => {
    this.setState({ contacts: newContacts });
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  findContact = nameToFind => {
    this.setState({ filter: nameToFind });
  };
  getFilteredContacts = ({ contacts, filter }) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onUpdate={this.updateContacts} />
        <Filter filter={this.state.filter} onSearch={this.findContact} />
        <ContactsList
          filteredContacts={this.getFilteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
