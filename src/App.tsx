import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Hello from './components/Hello';
import My from './components/My';
import './App.css';
import { useCounter } from './hooks/counter-context';

type ChildHandler = {
  appendPeriod: () => void;
};
const ChildComponent = forwardRef((_, ref) => {
  const [childText, setChildText] = useState('.');

  const handler: ChildHandler = {
    appendPeriod: () => setChildText((c) => c + '.'),
  };
  useImperativeHandle(ref, () => handler);
  return <>childComp: {childText}</>;
});

function App() {
  const { count } = useCounter();

  const childRef = useRef<ChildHandler>(null);

  return (
    <>
      <ChildComponent ref={childRef} />
      <hr />
      <button onClick={() => childRef.current?.appendPeriod()}>
        Call Child Component
      </button>
      <h2>count: {count}</h2>
      <My
      // loginHandleRef={loginHandleRef}
      />
      <Hello name='홍길동' age={30}>
        <h3>반갑습니다~</h3>
      </Hello>
    </>
  );
}

export default App;
