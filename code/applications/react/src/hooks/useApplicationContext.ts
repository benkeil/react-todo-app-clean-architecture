import { useContext } from 'react';
import ApplicationContext from '../application/context/ApplicationContext';
import ApplicationContextProperties from '../application/context/ApplicationContextProperties';

const useApplicationContext = (): ApplicationContextProperties => useContext(ApplicationContext).get();

export default useApplicationContext;
