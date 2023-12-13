import { useState, ChangeEvent } from 'react';

type Props = {
  login: (id: number, name: string) => void;
};

const Login = ({ login }: Props) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const changeId = (evt: ChangeEvent<HTMLInputElement>) =>
    setId(Number(evt.currentTarget.value));

  const changeName = (evt: ChangeEvent<HTMLInputElement>) =>
    setName(evt.currentTarget.value);

  return (
    <>
      <div>
        Login ID(숫자): <input type='number' value={id} onChange={changeId} />
      </div>
      <div>
        Login Name: <input type='text' value={name} onChange={changeName} />
      </div>
      <button onClick={() => login(id, name)}>Login</button>
    </>
  );
};
export default Login;
