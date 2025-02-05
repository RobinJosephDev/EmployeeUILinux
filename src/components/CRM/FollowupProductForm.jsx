import { DeleteOutlined } from '@ant-design/icons';
function FollowupProductForm({ product, index, handleProductChange, handleRemoveProduct }) {
  return (
    <div className="contact-form">
      <div className="form-group" style={{ flex: 1 }}>
        <label>Name</label>
        <input type="text" name="name" value={product.name} onChange={(e) => handleProductChange(index, e)} />
      </div>
      <div className="form-group" style={{ flex: 1 }}>
        <label>Quantity</label>
        <input type="number" name="quantity" value={product.quantity} onChange={(e) => handleProductChange(index, e)} />
      </div>
      <button type="button" onClick={() => handleRemoveProduct(index)} className="remove">
        <DeleteOutlined />
      </button>
    </div>
  );
}

export default FollowupProductForm;
