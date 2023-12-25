import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { useEffect, useState } from 'react';
// import { useSession } from '../hooks/session-context';

export const Item = () => {
  const {
    session: { cart },
  } = useSession();
  const { id } = useParams();

  const location = useLocation();
  const { state: itemState } = location;
  const [item] = useState<Cart>(
    () => itemState || cart.find((item) => item.id === Number(id))
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!item) navigate('/items');
  }, [item, navigate]);

  return (
    <>
      {item?.id}. {item?.name} (￦{item?.price.toLocaleString()})
      <button>SSS</button>
    </>
  );
};
