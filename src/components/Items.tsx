import { useRef, useState, FormEvent } from 'react';
import { useSession } from '../hooks/session-context';

export const Items = () => {
  const {
    session: { cart },
    saveCartItem,
    removeCartItem,
  } = useSession();

  const itemIdRef = useRef<number>(0);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const [hasDirty, setDirty] = useState(false);
  const checkDirty = () => {
    const id = itemIdRef.current;
    const name = itemNameRef.current?.value;
    const price = itemPriceRef.current?.value;

    const selectedItem = cart.find((item) => item.id === id) || {
      name: '',
      price: '',
    };

    setDirty(name !== selectedItem.name || price != selectedItem.price);
  };

  const setCartItem = (id: number) => {
    itemIdRef.current = id;
    const selectedItem = cart.find((item) => item.id === id) || {
      name: '',
      price: 0,
    };
    if (itemNameRef.current && itemPriceRef.current) {
      itemNameRef.current.value = selectedItem?.name;
      itemPriceRef.current.value = selectedItem?.price.toString();
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = itemNameRef.current?.value;
    const price = itemPriceRef.current?.value;

    if (!name) {
      alert('상품명을 정확히 입력해 주세요');
      return itemNameRef.current?.focus();
    }

    if (!price) {
      alert('금액을 정확히 입력해 주세요');
      return itemPriceRef.current?.focus();
    }

    saveCartItem(itemIdRef.current, name, Number(price));
    itemNameRef.current.value = '';
    itemPriceRef.current.value = '';
    setDirty(false);
  };

  return (
    <ul>
      {cart.map(({ id, name, price }) => (
        <li key={id}>
          <small>{id}</small>{' '}
          <button
            onClick={() => setCartItem(id)}
            style={{
              paddingTop: 0,
              paddingBottom: '0.2rem',
              backgroundColor: 'inherit',
            }}
            title='수정하기'
          >
            <strong>{name}</strong>
          </button>
          <small>({price.toLocaleString()}원)</small>
          <button onClick={() => removeCartItem(id)}>DEL</button>
        </li>
      ))}
      <form onSubmit={submit}>
        <input type='text' ref={itemNameRef} onChange={() => checkDirty()} />
        <input type='number' ref={itemPriceRef} onChange={() => checkDirty()} />
        {hasDirty && <button>Save</button>}
      </form>
    </ul>
  );
};