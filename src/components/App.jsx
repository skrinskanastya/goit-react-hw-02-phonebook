import { ContactForm } from './ContactForm/ContactForm';
import { Component } from 'react';
import { Filter } from './Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Layout } from './Layout';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  updateContacts = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  findContact = nameToFind => {
    this.setState({ filter: nameToFind });
  };
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onUpdate={this.updateContacts} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onSearch={this.findContact} />
        <ContactsList
          filteredContacts={this.getFilteredContacts()}
          onDelete={this.deleteContact}
        />
      </Layout>
    );
  }
}
