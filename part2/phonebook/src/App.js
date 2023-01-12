import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import DisplayContacts from './components/DisplayContacts'
import contactsService from './services/ContactsService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactsService.getAll().then(allContacts => {
      setPersons(allContacts)
    })
  }, [])

  const handleNameChange = event => setNewName(event.target.value)

  const handleNewContact = event => {
    event.preventDefault()
    const alreadyAdded = persons.some(person => person.name === newName)
    if (alreadyAdded) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Would you like to update their number?`
        )
      ) {
        const personToChange = persons.find(person => person.name === newName)
        console.log(personToChange)
        const personObject = {
          ...personToChange,
          number: newNumber
        }
        contactsService.update(personObject).then(updatedPerson => {
          setPersons(
            persons.map(person =>
              person.id !== updatedPerson.id ? person : updatedPerson
            )
          )
          setNewName('')
          setNewNumber('')
        })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setNewName('')
      setNewNumber('')
      contactsService
        .create(personObject)
        .then(createdContact => setPersons(persons.concat(createdContact)))
    }
  }

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilter = event => setFilter(event.target.value)

  const contactsToShow = () =>
    persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  const handleDeleting = id => {
    contactsService.remove(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
    })
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
      <DisplayContacts
        contactsToShow={contactsToShow}
        handleDeleting={handleDeleting}
      />
    </>
  )
}

export default App
