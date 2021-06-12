import UserTheme from './UserTheme';

export default interface ThemeRenderService {
  render(userTheme: UserTheme): string;
}
