import { DeleteOutlined } from '@ant-design/icons';

const ViewFollowupContactForm = ({ contact, index, handleRemoveContact }) => {
  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Name</label>
        <div>{contact.name || 'N/A'}</div>  {/* Display contact name */}
      </div>
      <div className="form-group">
        <label>Phone</label>
        <div>{contact.phone || 'N/A'}</div>  {/* Display contact phone */}
      </div>
      <div className="form-group">
        <label>Email</label>
        <div>{contact.email || 'N/A'}</div>  {/* Display contact email */}
      </div>

    </div>
  );
};

export default ViewFollowupContactForm;
