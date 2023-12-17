import { PropsWithChildren, useId } from 'react';
import { useCounter } from '../hooks/counter-context';

type Props = {
  name?: string;
  age: number;
};

const Hello = ({ name = 'CCC', age, children }: PropsWithChildren<Props>) => {
  const { count, plusCount } = useCounter();
  const helloId = useId();

  return (
    <>
      <h5 id={helloId}>
        Hello, {name}({age}세) [{count}]
      </h5>
      {children}
      <button onClick={plusCount}>+count</button>
    </>
  );
};
export default Hello;
