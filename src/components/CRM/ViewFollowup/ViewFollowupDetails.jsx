function ViewFollowupDetails({ followupEdit }) {
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
          <label>Next Follow-Up Date</label>
          <div>{followupEdit.next_follow_up_date || 'N/A'}</div>
        </div>
        <div className="form-group">
          <label>Lead Status</label>
          <div>{followupEdit.lead_status || 'N/A'}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewFollowupDetails;
