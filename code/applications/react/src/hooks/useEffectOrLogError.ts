import { DependencyList, EffectCallback, useEffect } from 'react';
import Logger from '@trustedshops/etrusted-aaa-library-logging/dist/Logger';

const useEffectOrLogError = (logger: Logger, effect: EffectCallback, deps?: DependencyList): void =>
  useEffect(() => {
    try {
      effect();
    } catch (e) {
      logger.error(e);
    }
  }, deps);

export default useEffectOrLogError;
