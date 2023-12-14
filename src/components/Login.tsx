import { FormEvent, useEffect, useRef } from 'react';
import { LoginUser } from '../App';

type Props = {
  login: ({ id, name }: LoginUser) => void;
};

const Login = ({ login }: Props) => {
  console.log('@@@Login');
  // const [id, setId] = useState(0);
  // const [name, setName] = useState('');
  const userIdRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  // const changeId = (evt: ChangeEvent<HTMLInputElement>) =>
  //   setId(Number(evt.currentTarget.value));

  // const changeName = (evt: ChangeEvent<HTMLInputElement>) =>
  //   setName(evt.currentTarget.value);

  const submit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const id = Number(userIdRef.current?.value);
    const name = userNameRef.current?.value || '';

    if (id && name) {
      login({ id, name });
    }
  };

  const focusName = () => {
    if (userIdRef.current) userIdRef.current.value = '100';
  };

  useEffect(() => {
    if (userNameRef.current) userNameRef.current.focus();
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
};
export default Login;
