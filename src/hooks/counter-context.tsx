import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';

type CounterContextProps = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};
const CounterContext = createContext<CounterContextProps>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

type Action = { type: string; payload?: number };

const reducer = (count: number, { type, payload = 1 }: Action) => {
  switch (type) {
    case 'plus':
      return count + payload;
    case 'minus':
      return count - payload;

    default:
      return count;
  }
};

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  // const [count, setCount] = useState(0);

  // const plusCount = () => setCount(count + 1);
  // const minusCount = () => setCount((count) => count - 1);

  const [count, dispatch] = useReducer(reducer, 0);
  const plusCount = useCallback(
    () => dispatch({ type: 'plus', payload: 1 }),
    []
  );
  const minusCount = useCallback(() => dispatch({ type: 'minus' }), []);

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const useCounter = () => useContext(CounterContext);

// eslint-disable-next-line react-refresh/only-export-components
export { CounterContextProvider, useCounter };
