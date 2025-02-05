function ViewAddressDetails({ followupEdit }) {

  return (
    <fieldset className="form-section">
      <legend>Address Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Address</label>
          <div>{followupEdit.address || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Unit No</label>
          <div>{followupEdit.unit_no || 'N/A'}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>City</label>
          <div>{followupEdit.city || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>State</label>
          <div>{followupEdit.state || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Country</label>
          <div>{followupEdit.country || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Postal Code</label>
          <div>{followupEdit.postal_code || 'N/A'}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewAddressDetails;
