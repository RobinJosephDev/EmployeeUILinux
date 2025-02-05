function EditLeadDetails({ formLead, setFormLead }) {
  return (
    <fieldset className="form-section">
      <legend>Lead Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="leadNo">Lead No*</label>
          <input type="text" value={formLead.lead_no} onChange={(e) => setFormLead({ ...formLead, lead_no: e.target.value })} id="leadNo" required />
        </div>
        <div className="form-group">
          <label htmlFor="leadDate">Lead Date</label>
          <input type="date" value={formLead.lead_date} onChange={(e) => setFormLead({ ...formLead, lead_date: e.target.value })} id="leadDate" />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            value={formLead.customer_name}
            onChange={(e) => setFormLead({ ...formLead, customer_name: e.target.value })}
            id="customerName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" value={formLead.phone} onChange={(e) => setFormLead({ ...formLead, phone: e.target.value })} id="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={formLead.email} onChange={(e) => setFormLead({ ...formLead, email: e.target.value })} id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input type="text" value={formLead.website} onChange={(e) => setFormLead({ ...formLead, website: e.target.value })} id="website" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditLeadDetails;
