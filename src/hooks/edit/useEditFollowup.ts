import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Followup, Contact, Product } from '../../types/FollowupTypes';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const useEditFollowup = (followup: Followup | null, onClose: () => void, onUpdate: (followup: Followup) => void) => {
  const [followupEdit, setFollowupEdit] = useState<Followup>({
    id: 0,
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
    lead_status: '',
    remarks: '',
    equipment: '',
    contacts: [],
    products: [],
    created_at: '',
    updated_at: '',
  });

  useEffect(() => {
    if (followup) {
      const parsedContacts = Array.isArray(followup.contacts) ? followup.contacts : JSON.parse(followup.contacts || '[]');
      const parsedProducts = Array.isArray(followup.products) ? followup.products : JSON.parse(followup.products || '[]');

      const updatedFollowup = {
        ...followup,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
        products: parsedProducts.length > 0 ? parsedProducts : [],
      };

      setFollowupEdit(updatedFollowup);
    }
  }, [followup]);

  const validateFollowup = (): boolean => {
    return !!followupEdit.lead_no && !!followupEdit.lead_date && !!followupEdit.lead_type && !!followupEdit.lead_status;
  };

  const updateFollowup = async () => {
    if (!validateFollowup()) {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
      return;
    }

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
        text: 'Failed to update follow-up.',
      });
    }
  };

  //Contacts
  const handleAddContact = () => {
    setFollowupEdit((prevFollowup) =>
      prevFollowup ? { ...prevFollowup, contacts: [...prevFollowup.contacts, { name: '', phone: '', email: '' }] } : prevFollowup
    );
  };

  const handleRemoveContact = (index: number) => {
    setFollowupEdit((prevFollowup) =>
      prevFollowup ? { ...prevFollowup, contacts: prevFollowup.contacts.filter((_, i) => i !== index) } : prevFollowup
    );
  };

  const handleContactChange = (index: number, updatedContact: Contact) => {
    setFollowupEdit((prevFollowup) =>
      prevFollowup ? { ...prevFollowup, contacts: prevFollowup.contacts.map((contact, i) => (i === index ? updatedContact : contact)) } : prevFollowup
    );
  };

  //Products
  const handleAddProduct = () => {
    setFollowupEdit((prevFollowup) =>
      prevFollowup ? { ...prevFollowup, products: [...prevFollowup.products, { name: '', quantity: 0 }] } : prevFollowup
    );
  };

  const handleRemoveProduct = (index: number) => {
    setFollowupEdit((prevFollowup) =>
      prevFollowup ? { ...prevFollowup, products: prevFollowup.products.filter((_, i) => i !== index) } : prevFollowup
    );
  };

  const handleProductChange = (index: number, updatedProduct: Product) => {
    setFollowupEdit((prevFollowup) =>
      prevFollowup ? { ...prevFollowup, products: prevFollowup.products.map((product, i) => (i === index ? updatedProduct : product)) } : prevFollowup
    );
  };

  return {
    followupEdit,
    setFollowupEdit,
    handleAddContact,
    handleAddProduct,
    handleContactChange,
    handleRemoveContact,
    handleProductChange,
    handleRemoveProduct,
    updateFollowup,
  };
};

export default useEditFollowup;
