import { useEffect, useRef } from 'react';

function EditAddressDetails({ followupEdit, setfollowupEdit }) {
  const addressRef = useRef(null);
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.maps) {
          initializeAutocomplete();
        }
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place || !place.address_components) {
        console.error('No valid address selected');
        return;
      }
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;

    // Extract the main address (street_number + route)
    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim(); // Combine street number and route

    // Update the form customer state with the relevant values
    setfollowupEdit((prevCustomer) => ({
      ...prevCustomer,
      address: mainAddress, // Only store the main address in the state
      city: getComponent('locality', '', addressComponents),
      state: getComponent('administrative_area_level_1', '', addressComponents),
      country: getComponent('country', '', addressComponents),
      postal_code: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };
  return (
    <fieldset className="form-section">
      <legend>Address Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={followupEdit.address}
            onChange={(e) => setfollowupEdit({ ...followupEdit, address: e.target.value })}
            id="address"
            ref={addressRef}
            placeholder="Enter your address"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="unitNo">Unit No</label>
          <input
            type="text"
            value={followupEdit.unit_no}
            onChange={(e) => setfollowupEdit({ ...followupEdit, unit_no: e.target.value })}
            id="unitNo"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="city">City</label>
          <input type="text" value={followupEdit.city} onChange={(e) => setfollowupEdit({ ...followupEdit, city: e.target.value })} id="city" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="state">State</label>
          <input type="text" value={followupEdit.state} onChange={(e) => setfollowupEdit({ ...followupEdit, state: e.target.value })} id="state" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            value={followupEdit.country}
            onChange={(e) => setfollowupEdit({ ...followupEdit, country: e.target.value })}
            id="country"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            value={followupEdit.postal_code}
            onChange={(e) => setfollowupEdit({ ...followupEdit, postal_code: e.target.value })}
            id="postalCode"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditAddressDetails;
