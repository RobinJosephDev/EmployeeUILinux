import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import FollowupProductForm from '../FollowupProductForm';
import FollowupContactForm from '../FollowupContactForm';
import EditLeadInfo from './EditLeadInfo';
import EditLeadType from './EditLeadType';
import EditFollowupDetails from './EditFollowupDetails';
import EditAddressDetails from './EditAddressDetails';
import EditAdditionalInfo from './EditAdditionalInfo';
import { PlusOutlined } from '@ant-design/icons';

const EditLeadFollowupForm = ({ followUp, onClose, onUpdate }) => {
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
  const API_URL = import.meta.env.VITE_API_BASE_URL;

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

  const validateFollowup = () => {
    return followupEdit.lead_no;
  };

  const updateFollowup = async () => {
    if (validateFollowup()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are not logged in. Please log in again.',
          });
          return;
        }

        // Log the followupEdit payload to check if it's in the correct format
        console.log('Payload to be sent:', followupEdit);

        const response = await axios.put(`${API_URL}/lead-followup/${followupEdit.id}`, followupEdit, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Follow-up data has been updated successfully.',
        });

        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error updating follow-up:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update follow-up.',
        });
      }
    }
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    setfollowupEdit((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts[index] = { ...updatedProducts[index], [name]: value };
      return { ...prev, products: updatedProducts };
    });
  };

  const handleRemoveProduct = (index) => {
    setfollowupEdit((prev) => {
      const updatedProducts = prev.products.filter((_, i) => i !== index);
      return { ...prev, products: updatedProducts };
    });
  };

  const handleAddProduct = () => {
    setfollowupEdit((prev) => ({
      ...prev,
      products: [...prev.products, { name: '', quantity: '' }],
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    setfollowupEdit((prev) => {
      const updatedContacts = [...prev.contacts];
      updatedContacts[index] = { ...updatedContacts[index], [name]: value };
      return { ...prev, contacts: updatedContacts };
    });
  };

  const handleRemoveContact = (index) => {
    setfollowupEdit((prev) => {
      const updatedContacts = prev.contacts.filter((_, i) => i !== index);
      return { ...prev, contacts: updatedContacts };
    });
  };

  const handleAddContact = () => {
    setfollowupEdit((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', phone: '', email: '' }],
    }));
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateFollowup();
        }}
        className="form-main"
      >
        <EditLeadInfo followupEdit={followupEdit} setfollowupEdit={setfollowupEdit} />
        <EditAddressDetails followupEdit={followupEdit} setfollowupEdit={setfollowupEdit} />
        <EditLeadType followupEdit={followupEdit} setfollowupEdit={setfollowupEdit} />
        <EditFollowupDetails followupEdit={followupEdit} setfollowupEdit={setfollowupEdit} />
        <fieldset className="form-section">
          <legend>Products</legend>
          <div className="form-row">
            {followupEdit.products.map((product, index) => (
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
            {followupEdit.contacts.map((contact, index) => (
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

        {/* Additional Info */}
        <EditAdditionalInfo followupEdit={followupEdit} setfollowupEdit={setfollowupEdit} />

        <button type="submit" className="btn-submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditLeadFollowupForm;
