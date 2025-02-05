function ViewAdditionalInfo({ followupEdit }) {
  return (
    <fieldset className="form-section">
      <legend>Additional Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Equipment</label>
          <div>{followupEdit.equipment || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Remarks</label>
          <div>{followupEdit.remarks || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Notes</label>
          <div>{followupEdit.notes || 'N/A'}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewAdditionalInfo;
