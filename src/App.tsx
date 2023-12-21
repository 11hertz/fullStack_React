import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MemoHello } from './components/Hello';
import My from './components/My';
import './App.css';
import { useCounter } from './hooks/counter-context';
import { useTimer } from './hooks/timer-hooks';
import { SessionContextProvider } from './hooks/session-context';
import * as CN from 'classnames';
import clsx from 'clsx';

type ChildHandler = {
  appendPeriod: () => void;
};
const ChildComponent = forwardRef((_, ref) => {
  const [childText, setChildText] = useState('.');
  const [badCount, setBadCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);

  const { useInterval, useTimeout } = useTimer();

  useInterval(() => setBadCount((pre) => pre + 1), 1000);

  useInterval(() => setGoodCount((pre) => pre + 1), 1000);

  // useEffect(() => {
  //   const intl = setInterval(() => setGoodCount((pre) => pre + 1), 1000);

  //   return () => clearInterval(intl);
  // }, []);

  useTimeout(
    (initSec) => {
      setBadCount(initSec);
      setGoodCount(initSec);
    },
    5000,
    100
  );

  const handler: ChildHandler = {
    appendPeriod: () => setChildText((c) => c + '.'),
  };
  useImperativeHandle(ref, () => handler);
  return (
    <>
      <strong style={{ float: 'left', color: 'red' }}>{badCount}</strong>
      childComp: {childText}
      <strong style={{ float: 'right', color: 'green' }}>{goodCount}</strong>
    </>
  );
});

function App() {
  const { count, plusCount, minusCount } = useCounter();

  const childRef = useRef<ChildHandler>(null);

  // const fn = () => 'FN!';
  const fn = useCallback(() => 'FN!', []);
  const age = useMemo(() => count + 1, [count]);

  const rrr = () => ['bold', 'red'];
  return (
    <SessionContextProvider>
      <ChildComponent ref={childRef} />
      <hr />
      <button onClick={() => childRef.current?.appendPeriod()}>
        Call Child Component
      </button>
      <MemoHello age={age} fn={fn} />
      <hr />
      <My
      // loginHandleRef={loginHandleRef}
      />
      {/* <div className={count % 2 === 0 ? 'card' : ''}> */}
      <div className={CN({ card: count % 2 === 0 })}>
        <button onClick={plusCount}>
          count is {count > 0 ? 'Big' : 'Zero'}
        </button>
        <span className={clsx('card', { bold: count > 1 }, rrr())}>
          {count}
        </span>
        <button onClick={minusCount}>Minus</button>
      </div>
    </SessionContextProvider>
  );
}

export default App;
