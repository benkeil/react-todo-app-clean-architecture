import DefaultReactiveUseCaseOutputPort from '@trustedshops/etrusted-aaa-library-core/dist/usecase/DefaultReactiveUseCaseOutputPort';
import Todo from '../../../core/src/todo/Todo';
import TodoListView from './TodoListView';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import LocalizationService from '@trustedshops/etrusted-aaa-library-localization/dist/services/LocalizationService';
import LocalizationKeys from '../generated/LocalizationKeys';

export default class TodoListPresenter implements DefaultReactiveUseCaseOutputPort<Todo[], TodoListView> {
  constructor(private localizationService: LocalizationService<LocalizationKeys>) {}
  setError(error: Error): Observable<TodoListView> {
    throw error;
  }

  setResult(result: Observable<Todo[]>): Observable<TodoListView> {
    return combineLatest([
      result,
      this.localizationService.localizeMultiple({
        [LocalizationKeys.todoList_topic]: {},
        [LocalizationKeys.todoList_createButtonText]: {},
      }),
    ]).pipe(
      map(([todos, localizations]) => {
        const view: TodoListView = {
          topic: localizations.todoList_topic,
          todos,
          createButtonText: localizations.todoList_createButtonText,
          newTodoInputDefaultText: '',
        };
        return view;
      }),
    );
  }
}
