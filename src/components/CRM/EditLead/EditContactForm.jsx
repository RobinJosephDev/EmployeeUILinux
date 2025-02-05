function EditContactForm({ formLead, setFormLead }) {
  const handleAddContact = () => {
    setFormLead((prev) => ({
      ...prev,
      contacts: [
        ...prev.contacts,
        {
          name: "",
          contact_no: "",
          email: "",
        },
      ],
    }));
  };

  const handleRemoveContact = (index) => {
    setFormLead((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = formLead.contacts.map((contact, i) =>
      i === index ? { ...contact, [name]: value } : contact
    );
    setFormLead((prev) => ({ ...prev, contacts: updatedContacts }));
  };

  return (
    <fieldset>
      {formLead.contacts.map((contact, index) => (
        <div key={index} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="contact_no"
              value={contact.contact_no}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>

          <button
            type="button"
            onClick={() => handleRemoveContact(index)}
            className="remove"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddContact} className="add">
        Add Contact
      </button>
    </fieldset>
  );
}

export default EditContactForm;
