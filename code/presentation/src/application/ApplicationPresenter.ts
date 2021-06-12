import DefaultReactiveUseCaseOutputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultReactiveUseCaseOutputPort';
import ApplicationView from './ApplicationView';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import LocalizationService from '@trustedshops/etrusted-aaa-library-localization/dist/services/LocalizationService';
import LocalizationKeys from '../generated/LocalizationKeys';

export default class ApplicationPresenter implements DefaultReactiveUseCaseOutputPort<void, ApplicationView> {
  constructor(private localizationService: LocalizationService<LocalizationKeys>) {}

  setError(error: Error): Observable<ApplicationView> {
    throw error;
  }

  setResult(): Observable<ApplicationView> {
    return this.localizationService
      .localizeMultiple({
        [LocalizationKeys.application_topic]: {},
      })
      .pipe(
        map((localizations) => {
          const view: ApplicationView = {
            topic: localizations.application_topic,
          };
          return view;
        }),
        delay(200),
      );
  }
}
