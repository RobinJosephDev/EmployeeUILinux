function EditLeadInfo({ followupEdit, setfollowupEdit }) {
  return (
    <fieldset className="form-section">
      <legend>Lead Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="leadNo">Lead No*</label>
          <input
            type="text"
            value={followupEdit.lead_no}
            onChange={(e) => setfollowupEdit({ ...followupEdit, lead_no: e.target.value })}
            id="leadNo"
            required
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="leadDate">Lead Date</label>
          <input
            type="date"
            value={followupEdit.lead_date}
            onChange={(e) =>
              setfollowupEdit({
                ...followupEdit,
                lead_date: e.target.value,
              })
            }
            id="leadDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            value={followupEdit.customer_name}
            onChange={(e) =>
              setfollowupEdit({
                ...followupEdit,
                customer_name: e.target.value,
              })
            }
            id="customerName"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="phone">Phone</label>
          <input type="tel" value={followupEdit.phone} onChange={(e) => setfollowupEdit({ ...followupEdit, phone: e.target.value })} id="phone" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="email">Email</label>
          <input type="email" value={followupEdit.email} onChange={(e) => setfollowupEdit({ ...followupEdit, email: e.target.value })} id="email" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditLeadInfo;
