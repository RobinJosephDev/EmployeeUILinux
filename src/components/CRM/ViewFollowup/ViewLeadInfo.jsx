function ViewLeadInfo({ followupEdit }) {
  return (
    <fieldset className="form-section">
      <legend>Lead Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead No</label>
          <div>{followupEdit.lead_no}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead Date</label>
          <div>{followupEdit.lead_date}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Customer Name</label>
          <div>{followupEdit.customer_name}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Phone</label>
          <div>{followupEdit.phone}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Email</label>
          <div>{followupEdit.email}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
      </div>
    </fieldset>
  );
}

export default ViewLeadInfo;
