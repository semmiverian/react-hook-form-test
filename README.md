# React Hook Form - Dynamic Items Form

A modern, professional React application built with TypeScript and React Hook Form, featuring dynamic form management with real-time validation.

## Features

- **Dynamic Form Management**: Add or remove items dynamically using React Hook Form's `useFieldArray`
- **Context-Based Architecture**: Demonstrates FormProvider and custom context for sharing form state across nested components
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

This application demonstrates **how to initialize `useFieldArray` in one component (Component A) and access it from nested child/grandchild components (Component B)** using React Context.

### Component Hierarchy

```
DynamicForm (uses FormProvider)
├── PersonalInfoSection (uses useFormContext)
└── ItemsSection (Component A - provides ItemsContext)
    ├── AddItemButton (uses useItemsArray for append)
    └── ItemsList (Component B - uses useItemsArray for fields & remove)
```

### Key Architectural Patterns

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

#### 2. Custom Context for useFieldArray

**Component A (ItemsProvider)** initializes `useFieldArray` and provides it via context:

```typescript
// contexts/ItemsContext.tsx
export function ItemsProvider({ children }: { children: ReactNode }) {
  const { control } = useFormContext<FormData>();

  // Initialize useFieldArray here
  const fieldArrayMethods = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <ItemsContext.Provider value={fieldArrayMethods}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItemsArray() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItemsArray must be used within ItemsProvider');
  }
  return context;
}
```

#### 3. Nested Components Access Field Array

**Component B (ItemsList)** and any other nested components can access the field array:

```typescript
// components/ItemsList.tsx
function ItemsList() {
  const { register, formState: { errors } } = useFormContext<FormData>();

  // Access fields and remove from Component A's context
  const { fields, remove } = useItemsArray();

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

**AddItemButton** component demonstrates accessing `append`:

```typescript
function AddItemButton() {
  const { append } = useItemsArray();

  return (
    <button onClick={() => append({ itemName: '', quantity: 1, price: 0 })}>
      + Add Item
    </button>
  );
}
```

### Benefits of This Pattern

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components can be easily reused in different forms
- **Type Safety**: Full TypeScript support throughout the component tree
- **Flexibility**: Child components at any nesting level can access field array methods
- **Clean Code**: No prop drilling through multiple component levels

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
│   ├── PersonalInfoSection.tsx     # Personal info fields
│   ├── ItemsSection.tsx            # Component A - ItemsProvider wrapper
│   └── ItemsList.tsx               # Component B - Nested child component
├── contexts/
│   └── ItemsContext.tsx            # Custom context for useFieldArray
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

Besides the custom context approach shown here, there are other ways to share field array state:

1. **Props Drilling**: Pass `fields`, `append`, `remove` as props (good for 1-2 levels)
2. **Re-calling useFieldArray**: Call `useFieldArray` again in child components with same control and name (works!)
3. **Custom Context**: Current approach (best for deep nesting)

## License

MIT
