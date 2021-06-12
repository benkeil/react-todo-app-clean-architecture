import LoggerFactory from '@trustedshops/etrusted-aaa-library-logging/dist/LoggerFactory';
import Logger from '@trustedshops/etrusted-aaa-library-logging/dist/Logger';
import ThemeService from '@project/presentation/src/theme/ThemeService';
import DefaultUserTheme from '@project/presentation/src/theme/DefaultUserTheme';
import UserTheme from '@project/presentation/src/theme/UserTheme';
import { fromEventPattern, Observable, of, ReplaySubject } from 'rxjs';
import RegisterThemeCommand from './RegisterThemeCommand';
import ApplicationError from '../error/ApplicationError';
import ErrorType from '../error/ErrorType';

export default class ThemeServiceImpl implements ThemeService {
  DEFAULT_THEME_NAME = 'default';

  DEFAULT_THEME = DefaultUserTheme;

  private static LOGGER: Logger;

  private readonly availableThemes = new Map<string, UserTheme>();

  private theme$ = new ReplaySubject<UserTheme>(1);

  constructor(readonly loggerFactory: LoggerFactory) {
    ThemeServiceImpl.LOGGER = loggerFactory.createLogger();
    this.availableThemes.set(this.DEFAULT_THEME_NAME, this.DEFAULT_THEME);
    this.set(this.DEFAULT_THEME_NAME);
    fromEventPattern<RegisterThemeCommand>(
      (handler) => {
        window.addEventListener('com.benkeil.todo-app.RegisterThemeCommand', handler);
      },
      (handler) => {
        window.removeEventListener('com.benkeil.todo-app.RegisterThemeCommand', handler);
      },
    ).subscribe(({ detail: { theme, name } }) => {
      try {
        this.register(name, theme);
      } catch (error) {
        ThemeServiceImpl.LOGGER.error("Can't register theme - Exception caught:", error);
      }
    });
  }

  register(name: string, theme: UserTheme): Observable<UserTheme> {
    if (name === this.DEFAULT_THEME_NAME) {
      throw new ApplicationError({
        message: `You can not overwrite the default theme.`,
        type: ErrorType.INVALID_VALUE,
      });
    }
    this.availableThemes.set(name, theme);
    return of(theme);
  }

  set(name: string): Observable<UserTheme> {
    const theme = this.availableThemes.get(name);
    if (!theme) {
      throw new ApplicationError({ message: `Theme ${name} not registered.`, type: ErrorType.INVALID_VALUE });
    }
    this.theme$.next(theme);
    return of(theme);
  }

  get(): Observable<UserTheme> {
    return this.theme$;
  }
}
