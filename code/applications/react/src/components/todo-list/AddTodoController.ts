import DefaultUseCaseInputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultUseCaseInputPort';

export default class AddTodoController implements DefaultUseCaseInputPort<string> {
  constructor(private text: string) {}
  getRequest(): string {
    return this.text;
  }
}
