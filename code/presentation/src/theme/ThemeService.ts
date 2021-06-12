import UserTheme from './UserTheme';
import { Observable } from 'rxjs';

export default interface ThemeService {
  DEFAULT_THEME_NAME: string;
  DEFAULT_THEME: UserTheme;
  register(name: string, theme: UserTheme): Observable<UserTheme>;
  set(name: string): Observable<UserTheme>;
  get(): Observable<UserTheme>;
}
