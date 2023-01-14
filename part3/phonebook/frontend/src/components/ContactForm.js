const ContactForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleNewContact
}) => {
  return (
    <>
      <form>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor='phonenumber'>Number:</label>
          <input
            id='phonenumber'
            type='text'
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type='submit' onClick={handleNewContact}>
            Save contact
          </button>
        </div>
      </form>
    </>
  )
}

export default ContactForm
