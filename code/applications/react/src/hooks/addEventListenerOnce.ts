import { DependencyList, RefObject, useEffect, useState } from 'react';

const addEventListenerOnce = (
  objectRef: RefObject<HTMLElement>,
  eventName: string,
  func: (event: Event) => void,
  deps?: DependencyList,
): void => {
  const [executed, setExecuted] = useState(false);
  const [oldRef] = useState(() => func);
  return useEffect(() => {
    const shouldReallyRun = !executed && objectRef.current;
    if (shouldReallyRun) {
      setExecuted(true);
      objectRef.current?.addEventListener(eventName, func);
    }
    return (): void => {
      if (shouldReallyRun) {
        objectRef.current?.removeEventListener(eventName, oldRef);
      }
    };
  }, [...(deps !== undefined ? deps : []), executed]);
};

export default addEventListenerOnce;
