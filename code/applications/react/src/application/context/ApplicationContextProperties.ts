import { Observable } from 'rxjs';
import LoggerFactory from '@trustedshops/etrusted-aaa-library-logging/dist/LoggerFactory';
import DynamicApplicationConfiguration from '../configuration/DynamicApplicationConfiguration';
import IntlLocalizationService from '@trustedshops/etrusted-aaa-library-localization/dist/adapters/IntlLocalizationService';
import ListTodosUseCase from '@project/core/src/todo/ListTodosUseCase';
import AddTodoUseCase from '@project/core/src/todo/AddTodoUseCase';
import ToggleTodoUseCase from '@project/core/src/todo/ToggleTodoUseCase';
import LocalizationKeys from '@project/presentation/src/generated/LocalizationKeys';
import ThemeService from '@project/presentation/src/theme/ThemeService';
import ThemeRenderService from '@project/presentation/src/theme/ThemeRenderService';

export default interface ApplicationContextProperties {
  // general
  loggerFactory: LoggerFactory;
  dynamicConfiguration$: Observable<DynamicApplicationConfiguration>;
  // services
  localizationService: IntlLocalizationService<LocalizationKeys>;
  themeService: ThemeService;
  themeRenderService: ThemeRenderService;
  // use cases
  listTodosUseCase: ListTodosUseCase;
  addTodoUseCase: AddTodoUseCase;
  toggleTodoUseCase: ToggleTodoUseCase;
}
