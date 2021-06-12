import ThemeRenderService from '@project/presentation/src/theme/ThemeRenderService';
import UserTheme from '@project/presentation/src/theme/UserTheme';

export default class ThemeRenderServiceImpl implements ThemeRenderService {
  constructor(private readonly prefix: string) {}

  private reduce(key: string, value: any, themeArray: string[]): void {
    if (typeof value !== 'string') {
      Object.entries(value).forEach((tempArray) => {
        tempArray.reduce((subKey: any, subValue: any) => this.reduce(`${key}-${subKey}`, subValue, themeArray));
      });
      return;
    }
    const kebabizedbKey = ThemeRenderServiceImpl.kebabize(key);
    themeArray.push(value.includes(':') ? `--${kebabizedbKey}-${value}` : `--${kebabizedbKey}: ${value};`);
  }

  render(userTheme: UserTheme): string {
    const themeArray: string[] = [];
    Object.entries(userTheme).forEach(([propertyName, propertyValue]) => {
      this.reduce(`${this.prefix}-user-${propertyName}`, propertyValue, themeArray);
    });
    // Object.entries(theme).forEach(([propertyName, propertyValue]) => {
    //   this.reduce(propertyName, propertyValue, themeArray);
    // });
    return `html {
${themeArray.join('\n')}
}`;
  }

  private static kebabize(value: string): string {
    return value
      .split('-')
      .map((str) => {
        return str
          .split('')
          .map((letter, idx) => {
            return letter.toUpperCase() === letter ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}` : letter;
          })
          .join('');
      })
      .join('-');
  }
}
