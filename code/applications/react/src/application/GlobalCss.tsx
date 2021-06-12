import { createGlobalStyle } from 'styled-components';
import UserTheme from '@project/presentation/src/theme/UserTheme';
import ThemeRenderService from '@project/presentation/src/theme/ThemeRenderService';
import { Optional } from 'typescript-optional';

interface CssThemeProperties {
  themeRenderService: ThemeRenderService;
  theme: Optional<UserTheme>;
}

const GlobalCss = createGlobalStyle<CssThemeProperties>(({ themeRenderService, theme }) => {
  return theme.matches({
    empty: () => '',
    present: (value) => themeRenderService.render(value),
  });
});

export default GlobalCss;
