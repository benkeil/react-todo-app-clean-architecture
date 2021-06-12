import Log4JavascriptConfiguration from '@trustedshops/etrusted-aaa-library-log4javascript/dist/Log4JavascriptConfiguration';
import EnvironmentBuilder from './EnvironmentBuilder';

export default class Environment {
  public readonly keycloakUrl: string;

  public readonly keycloakRealm: string;

  public readonly eTrustedGraphqlUrl: string;

  public readonly widgetApiUrl: string;

  public readonly loggingConfiguration: Log4JavascriptConfiguration;

  constructor(builder: EnvironmentBuilder) {
    this.keycloakUrl = builder.keycloakUrl;
    this.keycloakRealm = builder.keycloakRealm;
    this.eTrustedGraphqlUrl = builder.eTrustedGraphqlUrl;
    this.widgetApiUrl = builder.widgetApiUrl;
    this.loggingConfiguration = builder.loggingConfiguration;
  }
}
