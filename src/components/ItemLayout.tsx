import { Outlet, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export const ItemLayout = () => {
  const {
    session: { cart },
    saveCartItem,
    removeCartItem,
  } = useSession();

  // const [searchStr, setSearchStr] = useState('');
  const [searchParams, setsearchParams] = useSearchParams({
    searchStr: '',
    itemId: '',
  });

  const [items, setItems] = useState<Cart[]>([]);
  const [currItem, setCurrItem] = useState<Cart | null>(null);

  const searchStr = searchParams.get('searchStr') || '';
  const itemId = searchParams.get('itemId') || '';

  useEffect(() => {
    if (searchStr)
      setItems(
        cart
          .filter((item) => item.name.includes(searchStr))
          .sort((a, b) => b.id - a.id)
      );
    else setItems(cart.sort((a, b) => b.id - a.id));
  }, [cart, searchStr]);

  useEffect(() => {
    if (itemId)
      setCurrItem(cart.find((item) => item.id === Number(itemId)) || null);
    else setCurrItem(items[0]);
  }, [items, itemId, cart]);

  return (
    <>
      Search:
      <input
        type='text'
        value={searchParams.get('searchStr') || ''}
        onChange={(e) =>
          setsearchParams({
            searchStr: e.currentTarget.value,
            itemId,
          })
        }
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          padding: '3rem',
        }}
      >
        <div>
          <ul className='no-list'>
            {cart
              .filter((item) =>
                item.name.includes(searchParams.get('searchStr') || '')
              )
              .map((item) => (
                <li
                  key={item.id}
                  className={clsx({ active: currItem?.id === item.id })}
                >
                  <small>{item.id}</small>
                  <button
                    onClick={() => {
                      setCurrItem(item);
                      setsearchParams({ searchStr, itemId: String(item.id) });
                    }}
                  >
                    <strong>{item.name}</strong>
                  </button>
                  <small>({item.price.toLocaleString()}원)</small>
                  <button onClick={() => removeCartItem(item.id)}>DEL</button>
                </li>
              ))}
          </ul>
          <button
            onClick={() => {
              setCurrItem({ id: 0, name: '', price: 0 }),
                setsearchParams({ searchStr });
            }}
          >
            + Add Item
          </button>
        </div>
        <div style={{ border: '2px solid green', padding: '2rem' }}>
          <Outlet context={{ currItem, saveCartItem }} />
        </div>
      </div>
    </>
  );
};
