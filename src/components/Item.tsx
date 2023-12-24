import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
// import { useSession } from '../hooks/session-context';

export const Item = () => {
  const {
    session: { cart },
  } = useSession();
  const { id } = useParams();

  const location = useLocation();
  console.log(location);

  const { name, price } =
    location.state || cart.find((item) => item.id === Number(id));

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('aaa'));

  // const item = cart.find((item) => item.id === Number(id));
  return (
    <>
      {id}. {name} (￦{price.toLocaleString()})
      <button onClick={() => setSearchParams({ aaa: 'X' })}>SSS</button>
    </>
  );
};
