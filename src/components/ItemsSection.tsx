import { ItemsProvider, useItemsArray } from '../contexts/ItemsContext';
import ItemsList from './ItemsList';

/**
 * Component that uses the append function from the field array
 * This could be Component B or any other nested component
 */
function AddItemButton() {
  const { append } = useItemsArray();

  const addItem = () => {
    append({ itemName: '', quantity: 1, price: 0 });
  };

  return (
    <button
      type="button"
      onClick={addItem}
      className="btn btn-secondary"
    >
      + Add Item
    </button>
  );
}

/**
 * Component A - Main items section
 * This wraps children with ItemsProvider (where useFieldArray is initialized)
 * Child components can then access field array methods via useItemsArray hook
 */
function ItemsSection() {
  return (
    <div className="form-section">
      {/*
        ItemsProvider initializes useFieldArray
        All nested children can access fields, append, remove via useItemsArray hook
      */}
      <ItemsProvider>
        <div className="section-header">
          <h2 className="section-title">Order Items</h2>
          {/* AddItemButton is a child that uses append from context */}
          <AddItemButton />
        </div>

        {/* ItemsList is a child/grandchild that uses fields and remove from context */}
        <ItemsList />
      </ItemsProvider>
    </div>
  );
}

export default ItemsSection;
