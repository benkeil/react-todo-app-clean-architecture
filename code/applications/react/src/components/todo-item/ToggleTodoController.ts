import DefaultUseCaseInputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultUseCaseInputPort';

export default class ToggleTodoController implements DefaultUseCaseInputPort<number> {
  constructor(private id: number) {}
  getRequest(): number {
    return this.id;
  }
}
