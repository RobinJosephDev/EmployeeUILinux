import { useState } from 'react';
import { Followup } from '../../../types/FollowupTypes';
import { z } from 'zod';
import DOMPurify from 'dompurify';
import { useGoogleAutocomplete } from '../../../hooks/useGoogleAutocomplete';

declare global {
  interface Window {
    google?: any;
  }
}

interface AddressDetailsProps {
  followup: Followup;
  setFollowup: React.Dispatch<React.SetStateAction<Followup>>;
}

const addressSchema = z.object({
  address: z
    .string()
    .max(255, 'Address is too long')
    .regex(/^[a-zA-Z0-9\s,.'-]*$/, 'Invalid street format')
    .optional(),
  city: z
    .string()
    .max(200, 'City name is too long')
    .regex(/^[a-zA-Z\s.'-]*$/, 'Invalid city format')
    .optional(),
  state: z
    .string()
    .max(200, 'Invalid state')
    .regex(/^[a-zA-Z\s.'-]*$/, 'Invalid state format')
    .optional(),
  country: z
    .string()
    .max(100, 'Invalid country')
    .regex(/^[a-zA-Z\s.'-]*$/, 'Invalid country format')
    .optional(),
  postal_code: z
    .string()
    .max(20, 'Postal code cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9-\s ]*$/, 'Invalid postal code')
    .optional(),
  unit_no: z
    .string()
    .max(20, 'Unit no. cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9\s,.'-]*$/, 'Invalid unit no. format')
    .optional(),
});

const AddressDetails: React.FC<AddressDetailsProps> = ({ followup, setFollowup }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateAddressFields = (place: google.maps.places.PlaceResult) => {
    const getComponent = (type: string) => place.address_components?.find((c) => c.types.includes(type))?.long_name || '';
    setFollowup((prev) => ({
      ...prev,
      address: `${getComponent('street_number')} ${getComponent('route')}`.trim(),
      city: getComponent('locality'),
      state: getComponent('administrative_area_level_1'),
      country: getComponent('country'),
      postal_code: getComponent('postal_code'),
    }));
  };
  const addressRef = useGoogleAutocomplete(updateAddressFields);

  const validateAndSetField = (field: keyof Followup, value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    let error = '';

    const tempLead = { ...followup, [field]: sanitizedValue };
    const result = addressSchema.safeParse(tempLead);

    if (!result.success) {
      const fieldError = result.error.errors.find((err) => err.path[0] === field);
      error = fieldError ? fieldError.message : '';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    setFollowup(tempLead);
  };

  const fields = [
    { label: 'Address', key: 'address', placeholder: 'Enter street address' },
    { label: 'City', key: 'city', placeholder: 'Enter city name' },
    { label: 'State', key: 'state', placeholder: 'Enter state' },
    { label: 'Country', key: 'country', placeholder: 'Enter country' },
    { label: 'Postal Code', key: 'postal_cide', placeholder: 'Enter postal code' },
    { label: 'Unit No.', key: 'unit_no', placeholder: 'Enter unit number' },
  ];

  return (
    <fieldset className="form-section">
      <legend>Address Details</legend>
      <hr />
      <div className="form-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {fields.map(({ label, key, placeholder }) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{label}</label>
            <input
              type="text"
              id={key}
              placeholder={placeholder}
              value={(followup[key as keyof Followup] as string | number) || ''}
              onChange={(e) => validateAndSetField(key as keyof Followup, e.target.value)}
              ref={key === 'address' ? addressRef : undefined}
            />
            {errors[key] && (
              <span className="error" style={{ color: 'red' }}>
                {errors[key]}
              </span>
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default AddressDetails;
