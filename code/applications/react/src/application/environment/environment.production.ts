import Log4JavascriptDefaultConfiguration from '@trustedshops/etrusted-aaa-library-log4javascript/dist/Log4JavascriptDefaultConfiguration';
import LogLevel from '@trustedshops/etrusted-aaa-library-logging/dist/LogLevel';
import Environment from './Environment';

const productionEnvironment: Environment = new Environment({
  keycloakUrl: 'https://xxx.com/auth',
  keycloakRealm: 'business-',
  eTrustedGraphqlUrl: 'https://api.etrusted.com/graphql',
  widgetApiUrl: 'https://widgets-api.integrations.etrusted.com',
  loggingConfiguration: Log4JavascriptDefaultConfiguration.create(LogLevel.INFO),
});

export default productionEnvironment;
