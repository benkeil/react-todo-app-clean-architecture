import Log4JavascriptDefaultConfiguration from '@trustedshops/etrusted-aaa-library-log4javascript/dist/Log4JavascriptDefaultConfiguration';
import LogLevel from '@trustedshops/etrusted-aaa-library-logging/dist/LogLevel';
import Environment from './Environment';

const developmentEnvironment: Environment = new Environment({
  keycloakUrl: 'https://login-integr.etrusted.com/auth',
  keycloakRealm: 'business-INTEGR',
  eTrustedGraphqlUrl: 'https://api.etrusted.koeln/graphql',
  widgetApiUrl: 'https://widgets-api.integrations.etrusted.koeln',
  loggingConfiguration: Log4JavascriptDefaultConfiguration.create(LogLevel.DEBUG),
});

export default developmentEnvironment;
