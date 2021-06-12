import { Observable, ReplaySubject } from 'rxjs';
import ApplicationConfigurationService from './ApplicationConfigurationService';
import StaticApplicationConfiguration from './StaticApplicationConfiguration';
import { stageFromString } from '../environment/Stage';
import DynamicApplicationConfiguration from './DynamicApplicationConfiguration';

export default class ApplicationConfigurationServiceImpl implements ApplicationConfigurationService {
  private dynamicConfiguration$ = new ReplaySubject<DynamicApplicationConfiguration>(1);

  constructor(private element: HTMLElement) {}

  readApplicationConfiguration(): void {
    const locale = this.element.getAttribute('locale') ?? undefined;
    const theme = this.element.getAttribute('theme') ?? undefined;
    this.dynamicConfiguration$.next({
      locale,
      theme,
    });
  }

  getDynamicApplicationConfiguration(): Observable<DynamicApplicationConfiguration> {
    return this.dynamicConfiguration$;
  }

  getStaticApplicationConfiguration(): StaticApplicationConfiguration {
    const stage = stageFromString(this.element.getAttribute('stage'));
    const basePath = this.element.getAttribute('base-path') ?? undefined;
    return {
      stage,
      basePath,
    };
  }
}
