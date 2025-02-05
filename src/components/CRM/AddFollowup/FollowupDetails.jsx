function FollowupDetails({ followupData, setFollowupData }) {
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
            value={followupData.next_follow_up_date}
            onChange={(e) =>
              setFollowupData({
                ...followupData,
                next_follow_up_date: e.target.value,
              })
            }
            id="nextFollowUpDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}> 
          <label htmlFor="leadStatus">Lead Status*</label>
          <select
            value={followupData.lead_status}
            onChange={(e) =>
              setFollowupData({
                ...followupData,
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

export default FollowupDetails;
