import { useForm, useFieldArray } from 'react-hook-form';
import type { FormData } from './types';
import './DynamicForm.css';

interface DynamicFormProps {
  onSubmitSuccess: (data: FormData) => void;
}

const DynamicForm = ({ onSubmitSuccess }: DynamicFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      age: undefined,
      items: [{ itemName: '', quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: FormData) => {
    // Combine all form data and pass to parent
    onSubmitSuccess(data);
  };

  const addItem = () => {
    append({ itemName: '', quantity: 1, price: 0 });
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Dynamic Order Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="dynamic-form">
        {/* Personal Information Section */}
        <div className="form-section">
          <h2 className="section-title">Personal Information</h2>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              id="name"
              type="text"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Age *
            </label>
            <input
              id="age"
              type="number"
              className={`form-input ${errors.age ? 'input-error' : ''}`}
              {...register('age', {
                required: 'Age is required',
                min: {
                  value: 1,
                  message: 'Age must be at least 1',
                },
                max: {
                  value: 150,
                  message: 'Age must be less than 150',
                },
                valueAsNumber: true,
              })}
              placeholder="Enter your age"
            />
            {errors.age && (
              <span className="error-message">{errors.age.message}</span>
            )}
          </div>
        </div>

        {/* Items Section */}
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
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
