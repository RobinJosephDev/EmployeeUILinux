function EditFollowupDetails({ followupEdit, setfollowupEdit }) {
  const leadStatusOptions = [
    "Select Status",
    "New",
    "In Progress",
    "Completed",
    "On Hold",
    "Lost",
  ];
  return (
    <fieldset className="form-section">
      <legend>Follow Up Details</legend>
      <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="nextFollowUpDate">Next Follow-Up Date</label>
          <input
            type="date"
            value={followupEdit.next_follow_up_date}
            onChange={(e) =>
              setfollowupEdit({
                ...followupEdit,
                next_follow_up_date: e.target.value,
              })
            }
            id="nextFollowUpDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="leadStatus">Lead Status*</label>
          <select
            value={followupEdit.lead_status}
            onChange={(e) =>
              setfollowupEdit({
                ...followupEdit,
                lead_status: e.target.value,
              })
            }
            id="leadStatus"
            required
          >
            <option value="">Select Lead Status</option>
            {leadStatusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </fieldset>
  );
}

export default EditFollowupDetails;
