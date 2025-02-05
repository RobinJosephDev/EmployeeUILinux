function LeadInfo({ followupData, setFollowupData }) {
  return (
    <fieldset className="form-section">
      <legend>Lead Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="leadNo">Lead No*</label>
          <input
            type="text"
            value={followupData.lead_no}
            onChange={(e) => setFollowupData({ ...followupData, lead_no: e.target.value })}
            id="leadNo"
            required
            style={{ width: '100%' }}
            placeholder="Lead No"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="leadDate">Lead Date*</label>
          <input
            type="date"
            value={followupData.lead_date}
            onChange={(e) =>
              setFollowupData({
                ...followupData,
                lead_date: e.target.value,
              })
            }
            id="leadDate"
            required
            style={{ width: '100%' }}
            placeholder="Lead Date"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            value={followupData.customer_name}
            onChange={(e) =>
              setFollowupData({
                ...followupData,
                customer_name: e.target.value,
              })
            }
            id="customerName"
            style={{ width: '100%' }}
            placeholder="Customer Name"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            value={followupData.phone}
            onChange={(e) => setFollowupData({ ...followupData, phone: e.target.value })}
            id="phone"
            style={{ width: '100%' }}
            placeholder="Phone"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={followupData.email}
            onChange={(e) => setFollowupData({ ...followupData, email: e.target.value })}
            id="email"
            style={{ width: '100%' }}
            placeholder="Email"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <input
            type="hidden"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default LeadInfo;
