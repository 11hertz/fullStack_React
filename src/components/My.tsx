import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import Profile from './Profile';
import { useEffect } from 'react';

const My = () => {
  const {
    session: { loginUser },
  } = useSession();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loginUser) navigate('/login');
  }, [loginUser, navigate]);

  return (
    <>
      <Profile />
    </>
  );
};
export default My;
