import Logger from '@trustedshops/etrusted-aaa-library-logging/dist/Logger';
import { FunctionComponent } from 'react';
import useApplicationContext from './useApplicationContext';
import { functionComponentIdentifier } from './identifier';

const createFunctionComponentLogger = (component: FunctionComponent<any>): Logger => {
  const { loggerFactory } = useApplicationContext();
  return loggerFactory.createLogger(functionComponentIdentifier(component));
};

export default createFunctionComponentLogger;
