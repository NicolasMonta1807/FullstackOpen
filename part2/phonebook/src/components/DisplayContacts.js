const Contact = ({ name, number, handleDeleting }) => (
  <p>
    {name} - {number}
    <button onClick={handleDeleting}>Delete</button>
  </p>
)

const DisplayContacts = ({ contactsToShow, handleDeleting }) => {
  return (
    <div>
      {contactsToShow().map(person => (
        <Contact
          handleDeleting={() => handleDeleting(person.id)}
          key={person.id}
          name={person.name}
          number={person.number}
        />
      ))}
    </div>
  )
}

export default DisplayContacts
