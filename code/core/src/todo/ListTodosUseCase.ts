import DefaultReactiveUseCaseWithNoInput from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultReactiveUseCaseWithNoInput';
import Todo from './Todo';
import DefaultReactiveUseCaseOutputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultReactiveUseCaseOutputPort';
import { Observable } from 'rxjs';
import TodoRepository from './TodoRepository';

export default class ListTodosUseCase implements DefaultReactiveUseCaseWithNoInput<Todo[]> {
  constructor(private todoRepository: TodoRepository) {}

  execute<T>(outputPort: DefaultReactiveUseCaseOutputPort<Todo[], T>): Observable<T> {
    try {
      return outputPort.setResult(this.todoRepository.getAll());
    } catch (e) {
      return outputPort.setError(e);
    }
  }
}
