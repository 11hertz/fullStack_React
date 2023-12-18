import { memo, useEffect, useId } from 'react';

type Props = {
  // name?: string;
  age: number;
  fn: () => void;
};

export const Hello = ({ age, fn }: Props) => {
  console.log('Hello.age>>', age);
  const helloId = useId();

  useEffect(() => {
    console.log('child.fn>>>', fn());
  }, [fn]);

  return (
    <div style={{ border: '2px solid red' }}>
      <h5 id={helloId}>Hello, {age}</h5>
      {/* <button onClick={plusCount}>+count</button> */}
      <hr />
      {/* <Sample /> */}
    </div>
  );
};

export const MemoHello = memo(Hello, ({ age }, { age: age2 }) => {
  console.log('🚀  prePorp:', age, age2);
  // return Object.is(preProp.fn, postProp.fn) && preProp.age === postProp.age;
  return age === age2;
});
