import Logger from '@trustedshops/etrusted-aaa-library-logging/dist/Logger';
import useApplicationContext from './useApplicationContext';

const createLogger = (name: string): Logger => {
  const { loggerFactory } = useApplicationContext();
  return loggerFactory.createLogger(name);
};

export default createLogger;
