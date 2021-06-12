import TodoRepository from '../../../core/src/todo/TodoRepository';
import { EMPTY, Observable, of, ReplaySubject } from 'rxjs';
import Todo from '../../../core/src/todo/Todo';
import { Optional } from 'typescript-optional';
import { map } from 'rxjs/operators';

export default class CacheTodoRepository implements TodoRepository {
  private todos$ = new ReplaySubject<Todo[]>(1);

  private todos: Todo[] = [];

  constructor() {
    this.todos.push(
      new Todo({
        id: 1,
        text: 'todo 1',
        done: true,
      }),
      new Todo({
        id: 2,
        text: 'todo 2',
        done: true,
      }),
      new Todo({
        id: 3,
        text: 'todo 3',
        done: true,
      }),
    );
    this.todos$.next(this.todos);
  }

  getAll(): Observable<Todo[]> {
    return this.todos$;
  }

  getById(id: number): Observable<Optional<Todo>> {
    return this.todos$.pipe(
      map((todos) => todos.find((todo) => todo.id === id)),
      map((todo) => Optional.ofNullable<Todo>(todo)),
    );
  }

  create(text: string): Observable<Todo> {
    const id = this.todos.length + 1;
    const todo = new Todo({
      id,
      text,
      done: false,
    });
    this.todos.push(todo);
    this.todos$.next(this.todos);
    return of(todo);
  }

  save(todo: Todo): Observable<Todo> {
    return EMPTY;
  }
}
