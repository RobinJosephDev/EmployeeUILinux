import React, { useState, useEffect, useRef } from 'react';
import Script from 'react-load-script';
import PropTypes from 'prop-types';
import './GoogleAutoComplete.css';

const GoogleAutoComplete = ({ apiKey, fields, callbackFunction }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [fieldsForState, setFieldsForState] = useState({
    streetAddress: '',
    streetAddress2: '',
    locality: '',
    cityOrState: '',
    postalcode: '',
    country: '',
    searchField: '',
  });

  const autocompleteRef = useRef(null);
  const autocomplete = useRef(null);

  useEffect(() => {
    if (scriptLoaded && !autocomplete.current) {
      autocomplete.current = new window.google.maps.places.Autocomplete(autocompleteRef.current);
      autocomplete.current.addListener('place_changed', handlePlaceChanged);
    }
  }, [scriptLoaded]);

  const handlePlaceChanged = () => {
    const place = autocomplete.current.getPlace();
    callbackFunction(place);

    if (place.address_components) {
      const updatedFields = { ...fieldsForState };
      const addressComponents = place.address_components;

      addressComponents.forEach((component) => {
        const componentType = component.types[0];
        switch (componentType) {
          case fields.streetAddress:
            updatedFields.streetAddress = component.long_name;
            break;
          case fields.streetAddress2:
            updatedFields.streetAddress2 = component.long_name;
            break;
          case fields.locality:
            updatedFields.locality = component.long_name;
            break;
          case fields.cityOrState:
            updatedFields.cityOrState = component.long_name;
            break;
          case fields.postalcode:
            updatedFields.postalcode = component.long_name;
            break;
          case fields.country:
            updatedFields.country = component.long_name;
            break;
          default:
            break;
        }
      });

      setFieldsForState(updatedFields);
      setShowResult(true);
    } else {
      console.log('Place details are not available.');
    }
  };

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const handleScriptError = () => {
    setScriptError(true);
  };

  const handleScriptCreate = () => {
    setScriptLoaded(false);
  };

  return (
    <div>
      {!scriptLoaded && (
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
          onCreate={handleScriptCreate}
          onError={handleScriptError}
          onLoad={handleScriptLoad}
        />
      )}
      <div className={`address ${showResult ? 'showFields' : ''}`}>
        <div className="addressInput">
          <input
            type="text"
            ref={autocompleteRef}
            placeholder="Enter address"
            className="autocomplete-input"
          />
        </div>
        <div className="addressFields">
          {Object.keys(fieldsForState).map((key) => (
            <div className={`address-field address-${key}`} key={key}>
              <input
                type="text"
                id={key}
                value={fieldsForState[key]}
                readOnly
              />
              <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

GoogleAutoComplete.propTypes = {
  apiKey: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    streetAddress: PropTypes.string.isRequired,
    streetAddress2: PropTypes.string.isRequired,
    locality: PropTypes.string.isRequired,
    cityOrState: PropTypes.string.isRequired,
    postalcode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  callbackFunction: PropTypes.func.isRequired,
};

GoogleAutoComplete.defaultProps = {
  fields: {
    streetAddress: 'route',
    streetAddress2: 'administrative_level_4',
    locality: 'locality',
    cityOrState: 'administrative_area_level_1',
    postalcode: 'postal_code',
    country: 'country',
  },
  callbackFunction: (f) => f,
};

export default GoogleAutoComplete;
