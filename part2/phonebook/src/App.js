import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { useState } from 'react';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

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

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input id='name' type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="phonenumber">Number:</label>
          <input id='phonenumber' type="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleNewContact}>Save contact</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <div key={person}>
            <p>{person.name} - {person.number}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
