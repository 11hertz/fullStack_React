import { memo, useEffect, useId, useReducer } from 'react';
import styles from './Hello.module.css';

type Props = {
  // name?: string;
  age: number;
  fn: () => void;
};

export const Hello = ({ age, fn }: Props) => {
  console.log('Hello.age>>', age);
  const helloId = useId();
  // const [isActive, setActive] = useState(false);
  const [isActive, toggleActive] = useReducer((preActive) => !preActive, false);

  useEffect(() => {
    console.log('child.fn>>>', age, fn());
  }, [age, fn]);

  return (
    <div className={styles['hello-border']}>
      <h5 id={helloId}>Hello, {age}</h5>
      {/* <button onClick={plusCount}>+count</button> */}
      <hr />
      {isActive ? 'Active' : 'Passive'}
      <button onClick={toggleActive}>Toggle</button>
      {/* <Sample /> */}
    </div>
  );
};

export const MemoHello = memo(Hello, ({ age }, { age: age2 }) => {
  console.log('🚀  prePorp:', age, age2);
  // return Object.is(preProp.fn, postProp.fn) && preProp.age === postProp.age;
  return age === age2;
});
