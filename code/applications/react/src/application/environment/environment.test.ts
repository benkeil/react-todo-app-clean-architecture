import Log4JavascriptDefaultConfiguration from '@trustedshops/etrusted-aaa-library-log4javascript/dist/Log4JavascriptDefaultConfiguration';
import LogLevel from '@trustedshops/etrusted-aaa-library-logging/dist/LogLevel';
import Environment from './Environment';

const testEnvironment: Environment = new Environment({
  keycloakUrl: 'https://xxx.com/auth',
  keycloakRealm: 'business-',
  eTrustedGraphqlUrl: 'https://api.etrusted.site/graphql',
  widgetApiUrl: 'https://widgets-api.integrations.etrusted.site',
  loggingConfiguration: Log4JavascriptDefaultConfiguration.create(LogLevel.DEBUG),
});

export default testEnvironment;
