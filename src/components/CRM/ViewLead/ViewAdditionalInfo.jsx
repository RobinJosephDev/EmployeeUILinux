function ViewAdditionalInfo({ formLead }) {
  return (
    <fieldset className="form-section">
      <legend>Additional Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="follow_up_date">Next Follow-Up Date</label>
          <div>{formLead.follow_up_date}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="equipmentType">Equipment Type</label>
          <div>{formLead.equipment_type || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="assignedTo">Assigned To</label>
          <div>{formLead.assigned_to || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="contactPerson">Contact Person</label>
          <div>{formLead.contact_person || 'N/A'}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="notes">Notes</label>
          <div>{formLead.notes || 'N/A'}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewAdditionalInfo;
