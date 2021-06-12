import Todo from '../../../core/src/todo/Todo';

export default interface TodoListView {
  topic: string;

  todos: Todo[];

  createButtonText: string;

  newTodoInputDefaultText: string;
}
