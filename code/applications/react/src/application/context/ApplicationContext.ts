import { Optional } from 'typescript-optional';
import { createContext } from 'react';
import ApplicationContextProperties from './ApplicationContextProperties';

const ApplicationContext = createContext<Optional<ApplicationContextProperties>>(Optional.empty());

export default ApplicationContext;
