import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';

export const ItemLayout = () => {
  const {
    session: { cart },
    removeCartItem,
  } = useSession();

  // const [searchStr, setSearchStr] = useState('');
  const [searchParams, setsearchParams] = useSearchParams({ searchStr: '' });

  return (
    <>
      Search:
      <input
        type='text'
        value={searchParams.get('searchStr') || ''}
        onChange={(e) => setsearchParams({ searchStr: e.currentTarget.value })}
      />
      <ul>
        {cart
          .filter((item) =>
            item.name.includes(searchParams.get('searchStr') || '')
          )
          .map((item) => (
            <li key={item.id}>
              <small>{item.id}</small>
              <Link to={`/items/${item.id}`} state={item}>
                <strong>{item.name}</strong>
              </Link>
              <small>({item.price.toLocaleString()}원)</small>
              <button onClick={() => removeCartItem(item.id)}>DEL</button>
            </li>
          ))}
      </ul>
      <div style={{ border: '2px solid green', padding: '2rem' }}>
        <Outlet />
      </div>
    </>
  );
};
