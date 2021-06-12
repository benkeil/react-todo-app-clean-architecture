import DefaultUseCaseInputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultUseCaseInputPort';
import { EMPTY, Observable } from 'rxjs';
import TodoRepository from './TodoRepository';
import { first, switchMap, tap } from 'rxjs/operators';
import ReactiveUseCase from '@trustedshops/etrusted-aaa-library-core/dist/usecase/ReactiveUseCase';

export default class ToggleTodoUseCase implements ReactiveUseCase<DefaultUseCaseInputPort<number>, void> {
  constructor(private todoRepository: TodoRepository) {}

  execute<T>(inputPort: DefaultUseCaseInputPort<number>): Observable<T> {
    try {
      return this.todoRepository.getById(inputPort.getRequest()).pipe(
        first(),
        tap((optional) =>
          optional.ifPresent((todo) => {
            todo.toggle();
            this.todoRepository.save(todo);
          }),
        ),
        switchMap(() => EMPTY),
      );
    } catch (e) {
      throw e;
    }
  }
}
