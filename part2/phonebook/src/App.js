import { useState } from 'react';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import DisplayContacts from './components/DisplayContacts';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNewContact = (event) => {
    event.preventDefault()
    const alreadyAdded = persons.some(person => person.name === newName)
    if (alreadyAdded) {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
    }
    else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => setFilter(event.target.value)

  const contactsToShow = () => {
    const showingContacts = persons.filter((person) => (
      person.name.toLowerCase().includes(filter.toLowerCase())
    ))
    return showingContacts
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add new contact</h2>
      <ContactForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNewContact={handleNewContact}
      />
      <h2>Numbers</h2>
      <DisplayContacts contactsToShow={contactsToShow} />
    </>
  );
}

export default App;
