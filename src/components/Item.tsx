import { useLocation, useParams } from 'react-router-dom';
// import { useSession } from '../hooks/session-context';

export const Item = () => {
  // const {
  //   session: { cart },
  // } = useSession();
  const { id } = useParams();

  const location = useLocation();
  console.log(location);

  const {
    state: { name, price },
  } = location;

  // const item = cart.find((item) => item.id === Number(id));
  return (
    <>
      {id}. {name} (￦{price.toLocaleString()})
    </>
  );
};
