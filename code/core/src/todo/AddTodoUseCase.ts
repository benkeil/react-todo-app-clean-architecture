import DefaultReactiveUseCase from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultReactiveUseCase';
import Todo from './Todo';
import DefaultUseCaseInputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultUseCaseInputPort';
import DefaultReactiveUseCaseOutputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultReactiveUseCaseOutputPort';
import { Observable } from 'rxjs';
import TodoRepository from './TodoRepository';
import ListTodosUseCase from './ListTodosUseCase';
import DefaultReactivePassThroughOutputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultReactivePassThroughOutputPort';
import { first, switchMap } from 'rxjs/operators';

export default class AddTodoUseCase implements DefaultReactiveUseCase<string, Todo[]> {
  constructor(private todoRepository: TodoRepository, private listTodosUseCase: ListTodosUseCase) {}

  execute<T>(
    inputPort: DefaultUseCaseInputPort<string>,
    outputPort: DefaultReactiveUseCaseOutputPort<Todo[], T>,
  ): Observable<T> {
    try {
      const result = this.todoRepository.create(inputPort.getRequest()).pipe(
        first(),
        switchMap(() => this.listTodosUseCase.execute(new DefaultReactivePassThroughOutputPort())),
      );
      return outputPort.setResult(result);
    } catch (e) {
      return outputPort.setError(e);
    }
  }
}
