import { PropsWithChildren } from 'react';
import { useCounter } from '../hooks/counter-context';

type Props = {
  name: string;
  age: number;
};

const Hello = ({ name, age, children }: PropsWithChildren<Props>) => {
  const { plusCount } = useCounter();

  return (
    <>
      <h1>
        Hello, {name}({age})
      </h1>
      {children}
      <button onClick={plusCount}>count + 1</button>
    </>
  );
};
export default Hello;
