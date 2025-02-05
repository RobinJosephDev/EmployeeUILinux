import { useState, useEffect } from 'react';
import ViewLeadType from './ViewLeadType';
import ViewFollowupContactForm from './ViewFollowupContactForm';
import ViewAdditionalInfo from './ViewAdditionalInfo';
import ViewFollowupProductForm from './ViewFollowupProductForm';
import ViewFollowupDetails from './ViewFollowupDetails';
import ViewLeadInfo from './ViewLeadInfo';
import ViewAddressDetails from './ViewAddressDetails';

const ViewLeadFollowupForm = ({ followUp, onClose }) => {
  const [followupEdit, setfollowupEdit] = useState({
    id: '',
    lead_no: '',
    lead_date: '',
    customer_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    unit_no: '',
    lead_type: '',
    contact_person: '',
    notes: '',
    next_follow_up_date: '',
    followup_type: '',
    products: [],
    lead_status: '',
    remarks: '',
    equipment: '',
    contacts: [],
  });

  useEffect(() => {
    if (followUp) {
      const parsedContacts = Array.isArray(followUp.contacts) ? followUp.contacts : JSON.parse(followUp.contacts || '[]');
      const parsedProducts = Array.isArray(followUp.products) ? followUp.products : JSON.parse(followUp.products || '[]');

      setfollowupEdit({
        ...followUp,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
        products: parsedProducts.length > 0 ? parsedProducts : [],
      });
    }
  }, [followUp]);

  if (!followUp) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <form className="form-main">
        <ViewLeadInfo followupEdit={followupEdit}  />
        <ViewAddressDetails followupEdit={followupEdit}  />
        <ViewLeadType followupEdit={followupEdit}  />
        <ViewFollowupDetails followupEdit={followupEdit}  />
        <fieldset className="form-section">
          <legend>Products</legend>
          <div className="form-row">
            {followupEdit.products.map((product, index) => (
              <ViewFollowupProductForm key={index} product={product} index={index} />
            ))}
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {followupEdit.contacts.map((contact, index) => (
              <ViewFollowupContactForm key={index} contact={contact} index={index} />
            ))}
          </div>
        </fieldset>

        {/* Additional Info */}
        <ViewAdditionalInfo followupEdit={followupEdit} setfollowupEdit={setfollowupEdit} />
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewLeadFollowupForm;
