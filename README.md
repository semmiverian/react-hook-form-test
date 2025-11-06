# React Hook Form - Dynamic Items Form

A modern, professional React application built with TypeScript and React Hook Form, featuring dynamic form management with real-time validation.

## Features

- **Dynamic Form Management**: Add or remove items dynamically using React Hook Form's `useFieldArray`
- **Type-Safe**: Built with TypeScript for robust type checking
- **Form Validation**: Real-time field validation with user-friendly error messages
- **Beautiful UI**: Modern gradient design with smooth animations
- **Responsive**: Mobile-friendly layout that adapts to different screen sizes
- **Professional Results Display**: Formatted summary with order totals, calculations, and raw JSON data

## Technologies

- **React 18** - Latest React with TypeScript
- **React Hook Form** - Performant form library with easy validation
- **Vite** - Fast build tool and development server
- **TypeScript** - Type safety and better developer experience

## Form Fields

### Personal Information
- **Name** (string) - Required, minimum 2 characters
- **Age** (number) - Required, must be between 1-150

### Order Items (Dynamic Array)
Each item contains:
- **Item Name** (string) - Required, minimum 2 characters
- **Quantity** (number) - Required, minimum 1
- **Price** (number) - Required, must be greater than 0

## Key Features

### useFieldArray Integration

The application uses React Hook Form's `useFieldArray` hook for managing dynamic item arrays:

```typescript
const { fields, append, remove } = useFieldArray({
  control,
  name: 'items',
});
```

### Form Validation

Comprehensive validation rules:
- Required field validation
- Min/max value constraints
- Type coercion for numbers
- Custom error messages

### Results Display

When submitted, the form displays:
- Customer information summary
- Detailed items table with calculated subtotals
- Order summary with total items and amount
- Raw JSON data for debugging

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── App.tsx                    # Main app component with state management
├── DynamicForm.tsx           # Form component with useFieldArray
├── SubmissionResults.tsx     # Results display component
├── types.ts                  # TypeScript type definitions
├── App.css                   # App-level styles
├── DynamicForm.css          # Form component styles
├── SubmissionResults.css    # Results component styles
└── index.css                # Global styles
```

## How It Works

1. **Form Initialization**: The form starts with one empty item by default
2. **Add Items**: Click "+ Add Item" to dynamically add more items to the order
3. **Remove Items**: Click the "×" button on any item card to remove it (at least one item is required)
4. **Validation**: All fields are validated in real-time with helpful error messages
5. **Submit**: Click "Submit Order" to see a beautifully formatted summary
6. **Reset**: Click "Create New Order" to start over with a fresh form

## Code Highlights

### Type Safety

```typescript
interface ItemType {
  itemName: string;
  quantity: number;
  price: number;
}

interface FormData {
  name: string;
  age: number;
  items: ItemType[];
}
```

### Dynamic Item Management

```typescript
// Add a new item
const addItem = () => {
  append({ itemName: '', quantity: 1, price: 0 });
};

// Remove an item
const removeItem = (index: number) => {
  if (fields.length > 1) {
    remove(index);
  }
};
```

### Form Submission

All form data (personal info + items array) is combined and passed to the parent component:

```typescript
const onSubmit = (data: FormData) => {
  onSubmitSuccess(data);
};
```

## License

MIT
