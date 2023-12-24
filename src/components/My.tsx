import { useSession } from '../hooks/session-context';
import Login from './Login';
import Profile from './Profile';
import clsx from 'clsx';

const My = () => {
  const {
    session: { loginUser },
  } = useSession();
  return (
    <>
      {/* {loginUser ? <Profile /> : <Login />} */}
      <div className={clsx({ 'green-border': !loginUser })}>
        {loginUser ? <Profile /> : <Login />}
      </div>
    </>
  );
};
export default My;
