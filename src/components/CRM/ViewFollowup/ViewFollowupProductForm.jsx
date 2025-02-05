import { DeleteOutlined } from '@ant-design/icons';

function ViewFollowupProductForm({ product, index, handleRemoveProduct }) {
  return (
    <div className="contact-form">
      <div className="form-group" style={{ flex: 1 }}>
        <label>Name</label>
        <div>{product.name || 'N/A'}</div>  {/* Display product name */}
      </div>
      <div className="form-group" style={{ flex: 1 }}>
        <label>Quantity</label>
        <div>{product.quantity || 'N/A'}</div>  {/* Display product quantity */}
      </div>

    </div>
  );
}

export default ViewFollowupProductForm;
