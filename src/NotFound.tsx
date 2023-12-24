import { useLocation, useNavigate } from 'react-router-dom';
import { useTimer } from './hooks/timer-hooks';

export const NotFound = () => {
  const location = useLocation();
  const { useTimeout } = useTimer();
  const navigate = useNavigate();
  // useTimeout(() => navigate('/'), 2000);
  useTimeout(() => navigate(-1), 2000);
  return <h1>404:{location.pathname} Page Not Found!</h1>;
  // return <Navigate to='/' />;
};
