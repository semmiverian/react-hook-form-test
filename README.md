# React Hook Form - Dynamic Items Form

A modern, professional React application built with TypeScript and React Hook Form, featuring dynamic form management with real-time validation.

## Features

- **Dynamic Form Management**: Add or remove items dynamically using React Hook Form's `useFieldArray`
- **Shared State Pattern**: Demonstrates calling `useFieldArray` multiple times in different components - they automatically share the same state!
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

## Architecture

This application demonstrates **the simple way to share `useFieldArray` between components**: just call it twice (or more) with the same `control` and `name`! React Hook Form automatically shares the state.

### Component Hierarchy

```
DynamicForm (uses FormProvider)
├── PersonalInfoSection (uses useFormContext)
└── ItemsSection (Component A - calls useFieldArray)
    └── ItemsList (Component B - calls useFieldArray AGAIN!)
```

### The Key Pattern: Call useFieldArray Multiple Times

#### 1. FormProvider for Form Context

The main form uses `FormProvider` to share form methods with all nested components:

```typescript
// DynamicForm.tsx
const methods = useForm<FormData>({ /* ... */ });

return (
  <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <PersonalInfoSection />
      <ItemsSection />
    </form>
  </FormProvider>
);
```

#### 2. Component A - First useFieldArray Call

**ItemsSection** calls `useFieldArray` for the first time:

```typescript
// components/ItemsSection.tsx
function ItemsSection() {
  const { control } = useFormContext<FormData>();

  // First call to useFieldArray
  const { append } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <div>
      <button onClick={() => append({ itemName: '', quantity: 1, price: 0 })}>
        + Add Item
      </button>
      <ItemsList />
    </div>
  );
}
```

#### 3. Component B - Call useFieldArray AGAIN

**ItemsList** (nested child) calls `useFieldArray` with the **same control and name**:

```typescript
// components/ItemsList.tsx
function ItemsList() {
  const { register, control, formState: { errors } } = useFormContext<FormData>();

  // Call useFieldArray AGAIN - same control, same name
  // React Hook Form shares the state automatically!
  const { fields, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.itemName`)} />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

### Why This Works

React Hook Form is smart enough to detect when you call `useFieldArray` with the same `control` and `name`. It returns references to the **same internal state**, so:

- ✅ Component A's `append` adds items to the array
- ✅ Component B's `fields` reflects those changes
- ✅ Component B's `remove` removes items from the array
- ✅ Component A can also access `fields` if needed
- ✅ No context or props drilling required!

### Benefits of This Pattern

- **Simple**: No need for custom contexts
- **Clean**: Just call the hook where you need it
- **Type Safe**: Full TypeScript support
- **Flexible**: Works at any nesting level
- **Official**: This is a supported React Hook Form pattern

## Key Features

### useFieldArray Integration

The application uses React Hook Form's `useFieldArray` hook for managing dynamic item arrays, initialized in a parent component (ItemsProvider) and accessible to all nested children via context.

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
├── App.tsx                         # Main app component with state management
├── DynamicForm.tsx                 # Form component with FormProvider
├── SubmissionResults.tsx           # Results display component
├── types.ts                        # TypeScript type definitions
├── components/
│   ├── PersonalInfoSection.tsx     # Personal info fields (uses useFormContext)
│   ├── ItemsSection.tsx            # Component A - calls useFieldArray
│   └── ItemsList.tsx               # Component B - calls useFieldArray again
├── App.css                         # App-level styles
├── DynamicForm.css                 # Form component styles
├── SubmissionResults.css           # Results component styles
└── index.css                       # Global styles
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

All components are fully typed with TypeScript:

```typescript
// types.ts
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

// ItemsContext.tsx
type ItemsContextType = UseFieldArrayReturn<FormData, 'items', 'id'>;
```

### Form Submission

All form data (personal info + items array) is automatically combined by React Hook Form:

```typescript
const onSubmit = (data: FormData) => {
  // data contains: { name, age, items: [...] }
  onSubmitSuccess(data);
};
```

### Alternative Approaches

This application uses the **re-calling useFieldArray** approach (simplest!). Other options include:

1. **Re-calling useFieldArray** (current approach): Call `useFieldArray` in multiple components with same control and name - React Hook Form shares state automatically
2. **Props Drilling**: Pass `fields`, `append`, `remove` as props to child components (good for 1-2 levels)
3. **Custom Context**: Create a custom context provider (more complex, only needed for very deep nesting or when you want to prevent re-renders)

**Recommendation**: Start with option #1 (re-calling useFieldArray) - it's the simplest and works great for most use cases!

## License

MIT
