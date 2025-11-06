import { useFormContext, useFieldArray } from 'react-hook-form';
import type { FormData } from '../types';

/**
 * Component B - Nested child component
 * This calls useFieldArray AGAIN with the same control and name as Component A
 * React Hook Form intelligently shares the same state - no context needed!
 */
function ItemsList() {
  // Access form context for register
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  // Call useFieldArray AGAIN - same control, same name as Component A
  // This works! React Hook Form shares the same state automatically
  const { fields, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="items-list">
      {fields.map((field, index) => (
        <div key={field.id} className="item-card">
          <div className="item-header">
            <h3 className="item-title">Item {index + 1}</h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="btn-remove"
                aria-label="Remove item"
              >
                ✕
              </button>
            )}
          </div>

          <div className="item-fields">
            <div className="form-group">
              <label
                htmlFor={`items.${index}.itemName`}
                className="form-label"
              >
                Item Name *
              </label>
              <input
                id={`items.${index}.itemName`}
                type="text"
                className={`form-input ${
                  errors.items?.[index]?.itemName ? 'input-error' : ''
                }`}
                {...register(`items.${index}.itemName`, {
                  required: 'Item name is required',
                  minLength: {
                    value: 2,
                    message: 'Item name must be at least 2 characters',
                  },
                })}
                placeholder="e.g., Laptop"
              />
              {errors.items?.[index]?.itemName && (
                <span className="error-message">
                  {errors.items[index]?.itemName?.message}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label
                  htmlFor={`items.${index}.quantity`}
                  className="form-label"
                >
                  Quantity *
                </label>
                <input
                  id={`items.${index}.quantity`}
                  type="number"
                  className={`form-input ${
                    errors.items?.[index]?.quantity ? 'input-error' : ''
                  }`}
                  {...register(`items.${index}.quantity`, {
                    required: 'Quantity is required',
                    min: {
                      value: 1,
                      message: 'Quantity must be at least 1',
                    },
                    valueAsNumber: true,
                  })}
                  placeholder="1"
                />
                {errors.items?.[index]?.quantity && (
                  <span className="error-message">
                    {errors.items[index]?.quantity?.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label
                  htmlFor={`items.${index}.price`}
                  className="form-label"
                >
                  Price ($) *
                </label>
                <input
                  id={`items.${index}.price`}
                  type="number"
                  step="0.01"
                  className={`form-input ${
                    errors.items?.[index]?.price ? 'input-error' : ''
                  }`}
                  {...register(`items.${index}.price`, {
                    required: 'Price is required',
                    min: {
                      value: 0.01,
                      message: 'Price must be greater than 0',
                    },
                    valueAsNumber: true,
                  })}
                  placeholder="0.00"
                />
                {errors.items?.[index]?.price && (
                  <span className="error-message">
                    {errors.items[index]?.price?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsList;
