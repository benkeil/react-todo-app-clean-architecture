import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';
import TodoList from '../components/todo-list/TodoList';
import useObservableEffect from '../hooks/useObservableEffect';
import useApplicationContext from '../hooks/useApplicationContext';
import ApplicationPresenter from '@project/presentation/src/application/ApplicationPresenter';
import ApplicationView from '@project/presentation/src/application/ApplicationView';
import Loading from '../components/loading/Loading';
import GlobalCss from './GlobalCss';
import UserTheme from '@project/presentation/src/theme/UserTheme';
import useOptionalOfNullable from '../hooks/useOptionalOfNullable';
import DarkUserTheme from '@project/presentation/src/theme/DarkUserTheme';
import createFunctionComponentLogger from '../hooks/createFunctionComponentLogger';

const Main = styled.div`
  display: block;
  position: relative;
  padding: 5px;
  background-color: var(--com-benkeil-user-color-pairs-1-background);
  color: var(--com-benkeil-user-color-pairs-1-text);
`;

/**
 * Handles changes in the dynamic configuration and is the entry point for styling.
 *
 * @constructor
 */
const Application: FunctionComponent = (): ReactElement => {
  const { dynamicConfiguration$, localizationService, themeRenderService, themeService } = useApplicationContext();
  const presenter = new ApplicationPresenter(localizationService);
  const [optionalView, setOptionalView] = useOptionalOfNullable<ApplicationView>();
  const [theme, setTheme] = useOptionalOfNullable<UserTheme>();
  const logger = createFunctionComponentLogger(Application);

  themeService.register('dark', DarkUserTheme);

  useObservableEffect(dynamicConfiguration$, {
    next: (configuration) => {
      if (configuration.locale) {
        localizationService.setLocale(configuration.locale);
      }
      if (configuration.theme) {
        try {
          themeService.set(configuration.theme);
        } catch (e) {
          logger.error('Theme %s not found.', configuration.theme);
        }
      }
    },
    error: (error) => logger.error('Could not configure application - Exception caught:', error),
  });

  useObservableEffect(presenter.setResult(), {
    next: setOptionalView,
  });

  useObservableEffect(themeService.get(), {
    next: setTheme,
  });

  return (
    <>
      <GlobalCss themeRenderService={themeRenderService} theme={theme} />
      <Main>
        {optionalView.matches({
          empty: () => <Loading />,
          present: (view) => (
            <>
              <h1>{view.topic}</h1>
              <TodoList />
            </>
          ),
        })}
      </Main>
    </>
  );
};

export default Application;
