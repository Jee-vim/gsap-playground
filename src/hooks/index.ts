import { useState, useCallback } from 'react';

export function useRerender(): [number, () => void] {
  const [key, setKey] = useState<number>(0);
  const rerender = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  return [key, rerender];
  // const [renderKey, triggerRerender] = useRerender();
  // <section key={renderKey}>
}
