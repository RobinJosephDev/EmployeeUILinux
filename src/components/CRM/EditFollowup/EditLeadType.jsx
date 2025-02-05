function EditLeadType({ followupEdit, setfollowupEdit }) {
  const leadTypeOptions = ['AB', 'BC', 'BDS', 'CA', 'DPD MAGMA', 'MB', 'ON', 'Super Leads', 'TBAB', 'USA'];
  return (
    <fieldset className="form-section">
      <legend>Lead Type and Contact</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="equipmentType">Lead Type</label>
          <select id="equipmentType" value={followupEdit.lead_type} onChange={(e) => setfollowupEdit({ ...followupEdit, lead_type: e.target.value })}>
            <option value="">Select Lead Type</option>
            {leadTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="contactPerson">Contact Person</label>
          <input
            type="text"
            value={followupEdit.contact_person}
            onChange={(e) =>
              setfollowupEdit({
                ...followupEdit,
                contact_person: e.target.value,
              })
            }
            id="contactPerson"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditLeadType;
