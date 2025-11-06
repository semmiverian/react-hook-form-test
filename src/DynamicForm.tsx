import { useForm, FormProvider } from 'react-hook-form';
import type { FormData } from './types';
import PersonalInfoSection from './components/PersonalInfoSection';
import ItemsSection from './components/ItemsSection';
import './DynamicForm.css';

interface DynamicFormProps {
  onSubmitSuccess: (data: FormData) => void;
}

/**
 * Main form component
 * - Initializes the form with useForm
 * - Wraps children with FormProvider to share form context
 * - Child components access context via useFormContext
 * - ItemsSection (Component A) calls useFieldArray
 * - ItemsList (Component B) calls useFieldArray AGAIN - React Hook Form shares state!
 */
const DynamicForm = ({ onSubmitSuccess }: DynamicFormProps) => {
  // Initialize form methods here
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      age: undefined,
      items: [{ itemName: '', quantity: 1, price: 0 }],
    },
  });

  const onSubmit = (data: FormData) => {
    // Combine all form data and pass to parent
    onSubmitSuccess(data);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Dynamic Order Form</h1>
      <p className="form-subtitle">
        Calling useFieldArray twice in different components - they share the same state!
      </p>

      {/*
        FormProvider shares form context with all child components
        Children can use useFormContext to access register, errors, etc.
      */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="dynamic-form">
          {/* Personal Information - uses useFormContext */}
          <PersonalInfoSection />

          {/*
            Items Section - Component A (calls useFieldArray)
            ItemsList - Component B (calls useFieldArray AGAIN)
            They share the same state automatically!
          */}
          <ItemsSection />

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit Order
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default DynamicForm;
