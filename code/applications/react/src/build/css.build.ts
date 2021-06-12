import * as path from 'path';
import * as fs from 'fs';
import * as process from 'process';
import DefaultUserTheme from '@project/presentation/src/theme/DefaultUserTheme';
import ThemeRenderServiceImpl from '@project/adapters/src/services/ThemeRenderServiceImpl';

const generate = (): void => {
  const directory = path.join(process.cwd(), 'src/generated');
  fs.mkdirSync(directory, { recursive: true });
  const theme = DefaultUserTheme;
  const themeRenderService = new ThemeRenderServiceImpl('com-benkeil');
  const variables = themeRenderService.render(theme);
  fs.writeFileSync(path.join(directory, 'Variables.scss'), variables);
};

generate();
