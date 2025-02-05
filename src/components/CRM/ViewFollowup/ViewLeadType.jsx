function ViewLeadType({ followupEdit }) {
  const leadTypeOptions = ['AB', 'BC', 'BDS', 'CA', 'DPD MAGMA', 'MB', 'ON', 'Super Leads', 'TBAB', 'USA'];

  return (
    <fieldset className="form-section">
      <legend>Lead Type and Contact</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead Type</label>
          <div>{followupEdit.lead_type}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Contact Person</label>
          <div>{followupEdit.contact_person}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewLeadType;
