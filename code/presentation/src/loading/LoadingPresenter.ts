import DefaultReactiveUseCaseOutputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultReactiveUseCaseOutputPort';
import LoadingView from './LoadingView';
import { Observable } from 'rxjs';
import LocalizationService from '@trustedshops/etrusted-aaa-library-localization/dist/services/LocalizationService';
import LocalizationKeys from '../generated/LocalizationKeys';
import { delay, map } from 'rxjs/operators';

export default class LoadingPresenter implements DefaultReactiveUseCaseOutputPort<void, LoadingView> {
  constructor(private localizationService: LocalizationService<LocalizationKeys>) {}

  setError(error: Error): Observable<LoadingView> {
    throw error;
  }

  setResult(): Observable<LoadingView> {
    return this.localizationService
      .localizeMultiple({
        [LocalizationKeys.loading_text]: {},
      })
      .pipe(
        map((localizations) => {
          const view: LoadingView = {
            text: localizations.loading_text,
          };
          return view;
        }),
        delay(200),
      );
  }
}
