import UserTheme from '@project/presentation/src/theme/UserTheme';

export interface RegisterThemeCommandDetails {
  name: string;
  theme: UserTheme;
}

export default class RegisterThemeCommand extends CustomEvent<RegisterThemeCommandDetails> {
  public static readonly IDENTIFIER = 'com.benkeil.todo-app.RegisterThemeCommand';

  constructor(detail: RegisterThemeCommandDetails) {
    super(RegisterThemeCommand.IDENTIFIER, {
      detail,
      bubbles: true,
    });
  }
}

declare global {
  interface WindowEventHandlersEventMap {
    [RegisterThemeCommand.IDENTIFIER]: CustomEvent<RegisterThemeCommandDetails>;
  }
}
