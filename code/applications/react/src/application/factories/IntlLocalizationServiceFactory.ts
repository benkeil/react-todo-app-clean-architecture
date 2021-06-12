import IntlLocalizationService from '@trustedshops/etrusted-aaa-library-localization/dist/adapters/IntlLocalizationService';
import Locale from './Locale';
import deDE from '@project/presentation/src/resources/de-DE.json';
import enGb from '@project/presentation/src/resources/en-GB.json';
import LocalizationKeys from '@project/presentation/src/generated/LocalizationKeys';
import Maps from '@trustedshops/etrusted-widget-library-utils/dist/collection/Maps';

export default class IntlLocalizationServiceFactory {
  constructor(private readonly fallbackLocale: Locale) {}

  public createFromLocalizationPackage(): IntlLocalizationService<LocalizationKeys> {
    return new IntlLocalizationService(Maps.of(Locale.DE_DE, deDE, Locale.EN_GB, enGb), this.fallbackLocale);
  }
}
