const Contact = ({ id, name, number }) => (
  <p>{name} - {number}</p>
)

const DisplayContacts = ({ contactsToShow }) => {
  return (
    <div>
      {contactsToShow().map((person) => (
        <Contact key={person.id} id={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  )
}

export default DisplayContacts