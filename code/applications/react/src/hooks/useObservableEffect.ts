import { DependencyList, useEffect } from 'react';
import { Observable, Observer } from 'rxjs';

const useObservableEffect = <T>(
  observable: Observable<T>,
  observer: Partial<Observer<T>>,
  deps: DependencyList = [],
): void => {
  return useEffect(() => {
    const subscription = observable.subscribe(observer);
    return (): void => {
      subscription.unsubscribe();
    };
  }, deps);
};

export default useObservableEffect;
