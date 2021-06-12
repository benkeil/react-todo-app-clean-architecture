import { FunctionComponent } from 'react';

const identifier = (app: string, component: string): string => `com.etrusted.${app}.${component}`;

const functionComponentIdentifier = (component: FunctionComponent<any>): string =>
  identifier('connect-etrusted-app', component.name);

export { identifier, functionComponentIdentifier };
