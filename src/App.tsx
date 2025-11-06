import { useState } from 'react';
import DynamicForm from './DynamicForm';
import SubmissionResults from './SubmissionResults';
import type { FormData } from './types';
import './App.css';

function App() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleSubmit = (data: FormData) => {
    setSubmittedData(data);
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  return (
    <div className="app">
      {!submittedData ? (
        <DynamicForm onSubmitSuccess={handleSubmit} />
      ) : (
        <SubmissionResults data={submittedData} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
