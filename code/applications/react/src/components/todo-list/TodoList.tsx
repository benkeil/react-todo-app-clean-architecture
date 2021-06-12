import React, { ChangeEvent, createRef, FunctionComponent, useState, KeyboardEvent, FormEvent } from 'react';
import TodoListView from '@project/presentation/src/todo/TodoListView';
import TodoListPresenter from '@project/presentation/src/todo/TodoListPresenter';
import TodoItem from '../todo-item/TodoItem';
import useObservableEffect from '../../hooks/useObservableEffect';
import useApplicationContext from '../../hooks/useApplicationContext';
import Loading from '../loading/Loading';
import AddTodoController from './AddTodoController';
import useOptionalOfNullable from '../../hooks/useOptionalOfNullable';
import styled from 'styled-components';

const Button = styled.button`
  background-color: var(--com-benkeil-user-color-pairs-2-background);
  color: var(--com-benkeil-user-color-pairs-2-text);
  margin-left: 10px;
`;

const TodoList: FunctionComponent = () => {
  const { localizationService } = useApplicationContext();
  const { addTodoUseCase, listTodosUseCase } = useApplicationContext();
  const [optionalView, setOptionalView] = useOptionalOfNullable<TodoListView>();
  const presenter = new TodoListPresenter(localizationService);
  const newTodoInputRef = createRef<HTMLInputElement>();
  const [newTodoText, setNewTodoText] = useState('');

  const handleNewTodoText = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    setNewTodoText(value);
  };

  const handleAddTodo = (): void => {
    if (newTodoText.length > 0) {
      const controller = new AddTodoController(newTodoText);
      addTodoUseCase.execute(controller, presenter).subscribe({
        next: (view) => {
          setOptionalView(view);
          setNewTodoText('');
          newTodoInputRef.current?.focus();
        },
      });
    }
  };

  const onSubmit = (event: FormEvent): void => {
    handleAddTodo();
    event.preventDefault();
  };

  useObservableEffect(listTodosUseCase.execute(presenter), { next: setOptionalView });

  return (
    <div>
      {optionalView.matches({
        empty: () => <Loading />,
        present: (view) => (
          <>
            <h2> {view.topic}</h2>
            {view.todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            <hr />
            <form onSubmit={onSubmit}>
              <input type="text" ref={newTodoInputRef} value={newTodoText} onChange={handleNewTodoText} />
              <Button onClick={handleAddTodo}>{view.createButtonText}</Button>
            </form>
          </>
        ),
      })}
    </div>
  );
};

export default TodoList;
