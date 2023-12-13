import { Session } from '../App';
import Login from './Login';
import Profile from './Profile';

type Props = {
  session: Session;
  login: () => void;
  logout: () => void;
  removeCartItem: (itemId: number) => void;
};

const My = ({
  session: { loginUser, cart },
  login,
  logout,
  removeCartItem,
}: Props) => {
  console.log('@@@My');
  return (
    <>
      {loginUser ? (
        <Profile loginUser={loginUser} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      <ul>
        {cart.map(({ id, name, price }) => (
          <li key={id}>
            {name}({price})
            <button onClick={() => removeCartItem(id)}>DEL</button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default My;
