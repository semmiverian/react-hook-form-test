import { useFormContext, useFieldArray } from 'react-hook-form';
import type { FormData } from '../types';
import ItemsList from './ItemsList';

/**
 * Component A - Initializes useFieldArray
 * This is where we first call useFieldArray
 */
function ItemsSection() {
  const { control } = useFormContext<FormData>();

  // Initialize useFieldArray here (Component A)
  const { append } = useFieldArray({
    control,
    name: 'items',
  });

  const addItem = () => {
    append({ itemName: '', quantity: 1, price: 0 });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="section-title">Order Items</h2>
        <button
          type="button"
          onClick={addItem}
          className="btn btn-secondary"
        >
          + Add Item
        </button>
      </div>

      {/*
        ItemsList (Component B) will call useFieldArray AGAIN
        with the same control and name - React Hook Form handles this!
      */}
      <ItemsList />
    </div>
  );
}

export default ItemsSection;
