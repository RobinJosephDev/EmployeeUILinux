import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../../styles/Form.css';
import ViewLeadDetails from './ViewLeadDetails';
import ViewAddressDetails from './ViewAddressDetails';
import ViewAdditionalInfo from './ViewAdditionalInfo';
import ViewLeadContactForm from './ViewLeadContactForm';

const ViewLeadForm = ({ lead, onClose }) => {
  const [formLead, setFormLead] = useState({
    id: '',
    lead_no: '',
    lead_date: '',
    customer_name: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    unit_no: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    equipment_type: '',
    lead_type: '',
    lead_status: '',
    follow_up_date: '',
    assigned_to: '',
    contacts: [{ name: '', phone: '', email: '' }],
  });

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    if (lead) {
      const parsedContacts = Array.isArray(lead.contacts) ? lead.contacts : JSON.parse(lead.contacts || '[]');
      setFormLead({
        ...lead,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
      });
    }
  }, [lead]);

  const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessage = error.response.data.errors.website
        ? error.response.data.errors.website[0]
        : 'An error occurred while saving/updating the lead.';
      Swal.fire('Error', errorMessage, 'error');
    } else {
      console.error('Error saving/updating lead:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'An error occurred while saving/updating the lead.', 'error');
    }
  };

  return (
    <div className="form-container">
      <form className="form-main">
        <ViewLeadDetails formLead={formLead} />
        <ViewAddressDetails formLead={formLead} />
        <ViewAdditionalInfo formLead={formLead} />
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {formLead.contacts.map((contact, index) => (
              <ViewLeadContactForm key={index} contact={contact} index={index} />
            ))}
          </div>
        </fieldset>
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewLeadForm;
