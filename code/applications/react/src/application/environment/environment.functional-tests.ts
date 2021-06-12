import Log4JavascriptDefaultConfiguration from '@trustedshops/etrusted-aaa-library-log4javascript/dist/Log4JavascriptDefaultConfiguration';
import LogLevel from '@trustedshops/etrusted-aaa-library-logging/dist/LogLevel';
import Environment from './Environment';

const functionalTestsEnvironment: Environment = new Environment({
  keycloakUrl: 'http://localhost:3000/auth',
  keycloakRealm: 'business-',
  eTrustedGraphqlUrl: 'http://localhost:3000/graphql',
  widgetApiUrl: 'http://localhost/3000/widgets',
  loggingConfiguration: Log4JavascriptDefaultConfiguration.create(LogLevel.DEBUG),
});

export default functionalTestsEnvironment;
