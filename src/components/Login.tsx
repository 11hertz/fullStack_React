import {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useSession } from '../hooks/session-context';
import { useCounter } from '../hooks/counter-context';
import { useNavigate } from 'react-router-dom';

export type LoginHandle = {
  focusName: () => void;
};

const Login = forwardRef((_, ref) => {
  // const [id, setId] = useState(0);
  // const [name, setName] = useState('');
  const {
    login,
    session: { loginUser },
  } = useSession();
  const { plusCount, minusCount } = useCounter();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser) navigate('/my');
  }, [loginUser, navigate]);

  const userIdRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    plusCount();

    return () => {
      minusCount();
    };
  }, [plusCount, minusCount]);

  // const changeId = (evt: ChangeEvent<HTMLInputElement>) =>
  //   setId(Number(evt.currentTarget.value));

  // const changeName = (evt: ChangeEvent<HTMLInputElement>) =>
  //   setName(evt.currentTarget.value);

  const submit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const id = Number(userIdRef.current?.value);
    const name = userNameRef.current?.value || '';

    login({ id, name });
  };

  const focusName = () => {
    if (userNameRef.current) userNameRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focusName,
  }));

  useEffect(() => {
    if (userIdRef.current) userIdRef.current.value = '100';
    focusName();
  }, []);

  return (
    <form onSubmit={submit}>
      <div>
        Login ID(숫자): <input type='number' ref={userIdRef} />
      </div>
      <div>
        Login Name: <input type='text' ref={userNameRef} />
      </div>
      <button>Login</button>
    </form>
  );
});
export default Login;
