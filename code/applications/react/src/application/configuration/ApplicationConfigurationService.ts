import { Observable } from 'rxjs';
import StaticApplicationConfiguration from './StaticApplicationConfiguration';
import DynamicApplicationConfiguration from './DynamicApplicationConfiguration';

export default interface ApplicationConfigurationService {
  readApplicationConfiguration(): void;

  getStaticApplicationConfiguration(): StaticApplicationConfiguration;

  getDynamicApplicationConfiguration(): Observable<DynamicApplicationConfiguration>;
}
