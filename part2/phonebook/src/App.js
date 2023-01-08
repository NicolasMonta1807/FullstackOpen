import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { useState } from 'react';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNewContact = (event) => {

    event.preventDefault()
    if (persons.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
    }
    else {
      setPersons(persons.concat(newName))
      setNewName("")
    }

  }

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input id='name' type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={handleNewContact}>Save contact</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => <p key={person} >{person}</p>)}
      </div>
    </>
  );
}

export default App;
