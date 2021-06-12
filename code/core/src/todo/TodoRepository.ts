import { Observable } from 'rxjs';
import Todo from './Todo';
import { Optional } from 'typescript-optional';

export default interface TodoRepository {
  getAll(): Observable<Todo[]>;

  getById(id: number): Observable<Optional<Todo>>;

  save(todo: Todo): Observable<Todo>;

  create(text: string): Observable<Todo>;
}
