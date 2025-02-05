import { DeleteOutlined } from '@ant-design/icons';
const FollowupContactForm = ({ contact, index, handleContactChange, handleRemoveContact }) => {
  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={contact.name} onChange={(e) => handleContactChange(index, e)} />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="tel" name="phone" value={contact.phone} onChange={(e) => handleContactChange(index, e)} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={contact.email} onChange={(e) => handleContactChange(index, e)} />
      </div>
      <button type="button" className="remove" onClick={() => handleRemoveContact(index)}>
        <DeleteOutlined />
      </button>
    </div>
  );
};

export default FollowupContactForm;
