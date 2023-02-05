import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import DisplayContacts from './components/DisplayContacts'
import contactsService from './services/ContactsService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    contactsService.getAll().then(allContacts => {
      setPersons(allContacts)
    })
  }, [])

  const handleNameChange = event => setNewName(event.target.value)

  const createContact = personObject => {
    setNewName('')
    setNewNumber('')
    contactsService
      .create(personObject)
      .then(createdContact => {
        setNotification({
          content: `Contact ${personObject.name} created`,
          error: false
        })
        setTimeout(() => setNotification(null), 3000)
        setPersons(persons.concat(createdContact))
      })
      .catch(error => {
        console.log(error.response.data.error)
        setNotification({
          content: error.response.data.error,
          error: true
        })
        setTimeout(() => setNotification(null), 3000)
      })
  }

  const updateContact = personObject => {
    contactsService
      .update(personObject)
      .then(updatedPerson => {
        setPersons(
          persons.map(person =>
            person.id !== updatedPerson.id ? person : updatedPerson
          )
        )
        setNewName('')
        setNewNumber('')
        setNotification({
          content: `Contact ${newName} updated`,
          error: false
        })
        setTimeout(() => setNotification(null), 3000)
      })
      .catch(error => {
        console.log(error)
        setNotification({
          content: `Error: ${personObject.name} has been deleted from server`,
          error: true
        })
        setTimeout(() => setNotification(null), 3000)
      })
  }

  const handleNewContact = event => {
    event.preventDefault()
    const alreadyAdded = persons.some(person => person.name === newName)
    if (!alreadyAdded) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      createContact(personObject)
      return
    }

    if (
      !window.confirm(
        `${newName} is already added to phonebook. Would you like to update their number?`
      )
    ) {
      setNewName('')
      setNewNumber('')
      return
    }

    const personToChange = persons.find(person => person.name === newName)
    const personObject = {
      ...personToChange,
      number: newNumber
    }
    updateContact(personObject)
    return
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
      <Notification message={notification} />
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
