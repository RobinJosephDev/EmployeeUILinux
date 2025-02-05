import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../styles/Form.css';
import FollowupProductForm from '../FollowupProductForm';
import FollowupContactForm from '../FollowupContactForm';
import LeadInfo from './LeadInfo';
import LeadType from './LeadType';
import FollowupDetails from './FollowupDetails';
import AddressDetails from './AddressDetails';
import AdditionalInfo from './AdditionalInfo';
import { PlusOutlined } from '@ant-design/icons';

const AddLeadFollowupForm = ({ onClose, onAddFollowup }) => {
  const [followupData, setFollowupData] = useState({
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
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    setFollowupData((prev) => {
      const updatedProducts = [...prev.contacts];
      updatedProducts[index] = { ...updatedProducts[index], [name]: value };
      return { ...prev, products: updatedProducts };
    });
  };

  const handleRemoveProduct = (index) => {
    setFollowupData((prev) => {
      const updatedProducts = prev.products.filter((_, i) => i !== index);
      return { ...prev, products: updatedProducts };
    });
  };

  const handleAddProduct = () => {
    setFollowupData((prev) => ({
      ...prev,
      products: [...prev.products, { name: '', quantity: '' }],
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    setFollowupData((prev) => {
      const updatedContacts = [...prev.contacts];
      updatedContacts[index] = { ...updatedContacts[index], [name]: value };
      return { ...prev, contacts: updatedContacts };
    });
  };

  const handleRemoveContact = (index) => {
    setFollowupData((prev) => {
      const updatedContacts = prev.contacts.filter((_, i) => i !== index);
      return { ...prev, contacts: updatedContacts };
    });
  };

  const handleAddContact = () => {
    setFollowupData((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', phone: '', email: '' }],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedFollowupData = {
      ...followupData,
      products: JSON.stringify(followupData.products), // Convert to string
      contacts: followupData.contacts,  // Keep as array
    };
    
    

    console.log('Lead data before submission:', formattedFollowupData);

    const validateLead = () => {
      return followupData.lead_no && followupData.lead_date && followupData.lead_type && followupData.lead_status;
    };

    if (validateLead()) {
      try {
        let response;
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire('Error', 'No token found', 'error');
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (followupData.id) {
          response = await axios.put(`${API_URL}/lead-followup/${followupData.id}`, formattedFollowupData, { headers });
          Swal.fire('Updated!', 'Follow-up data has been updated successfully.', 'success');
        } else {
          response = await axios.post(`${API_URL}/lead-followup`, formattedFollowupData, { headers });
          Swal.fire('Saved!', 'Follow-up data has been saved successfully.', 'success');
        }

        onAddFollowup(response.data);
        clearFollowupForm();
        onClose();
      } catch (error) {
        console.error('Error saving/updating follow-up:', error.response ? error.response.data : error.message);
        Swal.fire('Error', 'An error occurred while saving/updating the follow-up.', 'error');
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const clearFollowupForm = () => {
    setFollowupData({
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
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main"> 
        <LeadInfo followupData={followupData} setFollowupData={setFollowupData} />
        <AddressDetails followupData={followupData} setFollowupData={setFollowupData} />
        <LeadType followupData={followupData} setFollowupData={setFollowupData} />
        <FollowupDetails followupData={followupData} setFollowupData={setFollowupData} />
        <fieldset className="form-section">
          <legend>Products</legend>
          <div className="form-row">
            {followupData.products.map((product, index) => (
              <FollowupProductForm
                key={index}
                product={product}
                index={index}
                handleProductChange={handleProductChange}
                handleRemoveProduct={handleRemoveProduct}
              />
            ))}
            <button type="button" onClick={handleAddProduct} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {followupData.contacts.map((contact, index) => (
              <FollowupContactForm
                key={index}
                contact={contact}
                index={index}
                handleContactChange={handleContactChange}
                handleRemoveContact={handleRemoveContact}
              />
            ))}
            <button type="button" onClick={handleAddContact} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <AdditionalInfo followupData={followupData} setFollowupData={setFollowupData} />

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Create Follow-up
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeadFollowupForm;
