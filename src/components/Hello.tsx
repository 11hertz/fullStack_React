import { PropsWithChildren } from 'react';

type Props = {
  name: string;
  age: number;
  plusCount: () => void;
};

const Hello = ({
  name,
  age,
  plusCount,
  children,
}: PropsWithChildren<Props>) => {
  console.log('@@@Hello');
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
