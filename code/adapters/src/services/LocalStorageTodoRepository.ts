import TodoRepository from '../../../core/src/todo/TodoRepository';
import { Observable, of, ReplaySubject } from 'rxjs';
import Todo from '../../../core/src/todo/Todo';
import { Optional } from 'typescript-optional';
import { map } from 'rxjs/operators';
import TodoBuilder from '../../../core/src/todo/TodoBuilder';

export default class LocalStorageTodoRepository implements TodoRepository {
  private todos$ = new ReplaySubject<Todo[]>(1);

  private todos: Todo[] = [];

  constructor() {
    const json = localStorage.getItem('todos');
    if (json) {
      const items: TodoBuilder[] = JSON.parse(json);
      this.todos.push(...items.map((item) => new Todo(item)));
    }
    this.todos$.next(this.todos);
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos.sort((a, b) => a.id - b.id)));
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
    this.saveTodos();
    this.todos$.next(this.todos);
    return of(todo);
  }

  save(todo: Todo): Observable<Todo> {
    this.todos = this.todos.filter((value) => value.id !== todo.id);
    this.todos.push(todo);
    this.todos$.next(this.todos);
    this.saveTodos();
    return of(todo);
  }
}
