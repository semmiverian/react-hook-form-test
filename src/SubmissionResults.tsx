import type { FormData } from './types';
import './SubmissionResults.css';

interface SubmissionResultsProps {
  data: FormData;
  onReset: () => void;
}

const SubmissionResults = ({ data, onReset }: SubmissionResultsProps) => {
  // Calculate total amount
  const totalAmount = data.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Calculate total items
  const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="results-container">
      <div className="results-header">
        <h1 className="results-title">Order Submission Successful!</h1>
        <p className="results-subtitle">Here's a summary of your order</p>
      </div>

      <div className="results-content">
        {/* Customer Information */}
        <div className="results-section">
          <h2 className="section-heading">Customer Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{data.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age:</span>
              <span className="info-value">{data.age} years</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="results-section">
          <h2 className="section-heading">Order Items</h2>
          <div className="items-table">
            <div className="table-header">
              <div className="table-cell">#</div>
              <div className="table-cell">Item Name</div>
              <div className="table-cell">Quantity</div>
              <div className="table-cell">Price</div>
              <div className="table-cell">Subtotal</div>
            </div>
            {data.items.map((item, index) => (
              <div key={index} className="table-row">
                <div className="table-cell">{index + 1}</div>
                <div className="table-cell item-name">{item.itemName}</div>
                <div className="table-cell">{item.quantity}</div>
                <div className="table-cell">${item.price.toFixed(2)}</div>
                <div className="table-cell font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="results-section">
          <h2 className="section-heading">Order Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Total Items:</span>
              <span className="summary-value">{totalItems}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Number of Products:</span>
              <span className="summary-value">{data.items.length}</span>
            </div>
            <div className="summary-item total-row">
              <span className="summary-label">Total Amount:</span>
              <span className="summary-value total-amount">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Raw JSON Data */}
        <div className="results-section">
          <h2 className="section-heading">Raw JSON Data</h2>
          <div className="json-display">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="results-actions">
        <button onClick={onReset} className="btn btn-primary">
          Create New Order
        </button>
      </div>
    </div>
  );
};

export default SubmissionResults;
