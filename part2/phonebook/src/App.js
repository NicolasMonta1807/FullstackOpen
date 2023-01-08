import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import DisplayContacts from './components/DisplayContacts';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
