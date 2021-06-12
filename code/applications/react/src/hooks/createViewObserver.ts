import { PartialObserver } from 'rxjs';
import Logger from '@trustedshops/etrusted-aaa-library-logging/dist/Logger';
import { Dispatch, SetStateAction } from 'react';

const createViewObserver = <V>(logger: Logger, dispatcher: Dispatch<SetStateAction<V>>): PartialObserver<V> => ({
  next: dispatcher,
  error: (err): void => logger.error('Could not render view - Exception caught:', err),
});

export default createViewObserver;
