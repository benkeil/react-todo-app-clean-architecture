import React, { FunctionComponent, ReactElement } from 'react';
import LoggerFactory from '@trustedshops/etrusted-aaa-library-logging/dist/LoggerFactory';
import Log4JavascriptLoggerFactory from '@trustedshops/etrusted-aaa-library-log4javascript/dist/Log4JavascriptLoggerFactory';
import Log4JavascriptConfigurator from '@trustedshops/etrusted-aaa-library-log4javascript/dist/Log4JavascriptConfigurator';
import { Observable } from 'rxjs';
import IntlLocalizationServiceFactory from './factories/IntlLocalizationServiceFactory';
import ApplicationContextProperties from './context/ApplicationContextProperties';
import ApplicationContext from './context/ApplicationContext';
import StaticApplicationConfiguration from './configuration/StaticApplicationConfiguration';
import EnvironmentFactory from './environment/EnvironmentFactory';
import Locale from './factories/Locale';
import { Optional } from 'typescript-optional';
import DynamicApplicationConfiguration from './configuration/DynamicApplicationConfiguration';
import Application from './Application';
import ListTodosUseCase from '@project/core/src/todo/ListTodosUseCase';
import AddTodoUseCase from '@project/core/src/todo/AddTodoUseCase';
import LocalStorageTodoRepository from '@project/adapters/src/services/LocalStorageTodoRepository';
import ToggleTodoUseCase from '@project/core/src/todo/ToggleTodoUseCase';
import ThemeServiceImpl from '@project/adapters/src/services/ThemeServiceImpl';
import ThemeRenderServiceImpl from '@project/adapters/src/services/ThemeRenderServiceImpl';

interface AppProperties {
  staticConfiguration: StaticApplicationConfiguration;

  dynamicConfiguration$: Observable<DynamicApplicationConfiguration>;
}

/**
 * Create the DI context.
 *
 * @param dynamicConfiguration$
 * @param staticConfiguration
 * @constructor
 */
const App: FunctionComponent<AppProperties> = ({ dynamicConfiguration$, staticConfiguration }): ReactElement => {
  const environmentFactory = new EnvironmentFactory(staticConfiguration.stage);
  const environment = environmentFactory.getEnvironment();

  const loggerFactory: LoggerFactory = new Log4JavascriptLoggerFactory();
  Log4JavascriptConfigurator.configure(environment.loggingConfiguration);

  // services
  const fallbackLocale = Locale.DE_DE;
  const intlLocalizationServiceFactory = new IntlLocalizationServiceFactory(fallbackLocale);
  const localizationService = intlLocalizationServiceFactory.createFromLocalizationPackage();
  const todoRepository = new LocalStorageTodoRepository();
  const themeRenderService = new ThemeRenderServiceImpl('com-benkeil');
  const themeService = new ThemeServiceImpl(loggerFactory);

  // Use cases
  const listTodosUseCase = new ListTodosUseCase(todoRepository);
  const addTodoUseCase = new AddTodoUseCase(todoRepository, listTodosUseCase);
  const toggleTodoUseCase = new ToggleTodoUseCase(todoRepository);

  const context: ApplicationContextProperties = {
    // general
    dynamicConfiguration$,
    loggerFactory,
    // services
    localizationService,
    themeService,
    themeRenderService,
    // use cases
    listTodosUseCase,
    addTodoUseCase,
    toggleTodoUseCase,
  };

  return (
    <React.StrictMode>
      <ApplicationContext.Provider value={Optional.of(context)}>
        <Application />
      </ApplicationContext.Provider>
    </React.StrictMode>
  );
};
export default App;
