import { useFormContext } from 'react-hook-form';
import type { FormData } from '../types';

/**
 * Personal information section component
 * Uses useFormContext to access register and form errors
 */
function PersonalInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
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
  );
}

export default PersonalInfoSection;
