import { useEffect, useReducer, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

export const Item = () => {
  const { currItem: item, saveCartItem } = useOutletContext<{
    currItem: Cart;
    saveCartItem: saveCartItem;
  }>();

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const [isEditing, toggleEditing] = useReducer((prev) => !prev, false);

  const editingOrSave = () => {
    if (isEditing)
      if (nameRef.current && priceRef.current) {
        saveCartItem(
          item.id || 0,
          nameRef.current.value,
          +priceRef.current.value
        );
      }

    toggleEditing();
  };

  useEffect(() => {
    if (nameRef.current && priceRef.current) {
      nameRef.current.value = item.name;
      priceRef.current.value = String(item.price);
      nameRef.current.select();
    }
  }, [item, isEditing]);

  useEffect(() => {
    if (item?.id === 0) toggleEditing();
  }, [item?.id]);

  return (
    <>
      {isEditing ? (
        <form style={{ margin: '1rem' }}>
          <input type='text' ref={nameRef} placeholder='Input Item Name' />
          <input type='number' ref={priceRef} placeholder='Input Item Price' />
        </form>
      ) : (
        <div>
          {item?.id}. {item?.name} (￦{item?.price.toLocaleString()})
        </div>
      )}

      {isEditing && <button onClick={toggleEditing}>Cancel</button>}
      <button onClick={editingOrSave}>{isEditing ? 'Save' : 'Edit'}</button>
    </>
  );
};
