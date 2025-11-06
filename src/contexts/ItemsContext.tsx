import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { UseFieldArrayReturn } from 'react-hook-form';
import type { FormData } from '../types';

type ItemsContextType = UseFieldArrayReturn<FormData, 'items', 'id'>;

const ItemsContext = createContext<ItemsContextType | null>(null);

/**
 * Custom hook to access the items field array
 * Can be used in any component nested within ItemsProvider
 */
export function useItemsArray() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItemsArray must be used within ItemsProvider');
  }
  return context;
}

/**
 * Provider component that initializes useFieldArray
 * This is "Component A" - where the field array is initialized
 */
export function ItemsProvider({ children }: { children: ReactNode }) {
  const { control } = useFormContext<FormData>();

  // Initialize useFieldArray here - this state is shared via context
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
