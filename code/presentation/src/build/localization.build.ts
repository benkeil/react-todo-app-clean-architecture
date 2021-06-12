import * as path from 'path';
import * as process from 'process';
import TypeGeneratorImpl from '@trustedshops/etrusted-aaa-library-localization/dist/generator/TypeGeneratorImpl';
import defaultLocale from '../resources/de-DE.json';

const generate = (): void => {
  const directory = path.join(process.cwd(), 'src/generated');
  const generator = new TypeGeneratorImpl(directory);
  generator.generate(defaultLocale);
};

generate();
