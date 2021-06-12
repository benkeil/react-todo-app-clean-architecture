import { useEffect } from 'react';

const useEventListener = (identifier: string, func: (...args: any) => Promise<any> | any): void =>
  useEffect(() => {
    window.addEventListener(identifier, func);
    return (): void => {
      window.removeEventListener(identifier, func);
    };
  }, []);

export default useEventListener;
