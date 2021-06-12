import { DependencyList, useEffect } from 'react';

const useTargetEventListener = (
  identifier: string,
  func: (...args: any) => Promise<any> | any,
  target: Element | null | undefined,
  deps: DependencyList = [],
): void =>
  useEffect(() => {
    console.log('useTargetEventListener', target);
    if (target) {
      target.addEventListener(identifier, func);
    }
    return (): void => {
      if (target) {
        target.removeEventListener(identifier, func);
      }
    };
  }, deps);

export default useTargetEventListener;
