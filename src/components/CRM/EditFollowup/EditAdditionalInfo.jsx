function EditAdditionalInfo({ followupEdit, setfollowupEdit }) {
  const equipmentTypeOptions = ['Van', 'Reefer', 'Flatbed', 'Triaxle', 'Maxi', 'Btrain', 'Roll tite'];

  return (
    <fieldset className="form-section">
      <legend>Additional Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="equipment">Equipment</label>
          <select
            id="equipment"
            value={followupEdit.equipment}
            onChange={(e) =>
              setfollowupEdit({
                ...followupEdit,
                equipment: e.target.value,
              })
            }
          >
            <option value="">Select Equipment Type</option>
            {equipmentTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remarks">Remarks</label>
          <textarea value={followupEdit.remarks} onChange={(e) => setfollowupEdit({ ...followupEdit, remarks: e.target.value })} id="remarks" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="notes">Notes</label>
          <textarea value={followupEdit.notes} onChange={(e) => setfollowupEdit({ ...followupEdit, notes: e.target.value })} id="notes" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditAdditionalInfo;
