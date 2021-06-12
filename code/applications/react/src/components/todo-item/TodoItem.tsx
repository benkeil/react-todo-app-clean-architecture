import React, { FunctionComponent } from 'react';
import Todo from '../../../../../core/src/todo/Todo';
import styled from 'styled-components';
import useApplicationContext from '../../hooks/useApplicationContext';
import ToggleTodoController from './ToggleTodoController';

const Container = styled.div`
  display: block;
  margin-top: 10px;
`;

const Checkbox = styled.input`
  display: inline-block;
  margin-right: 10px;
`;

export interface TodoItemProperties {
  todo: Todo;
}

const TodoItem: FunctionComponent<TodoItemProperties> = ({ todo }) => {
  const { toggleTodoUseCase } = useApplicationContext();

  const toggleDone = (): void => {
    const controller = new ToggleTodoController(todo.id);
    toggleTodoUseCase.execute(controller).subscribe();
  };

  return (
    <Container>
      <Checkbox name={`todo-${todo.id}`} type="checkbox" defaultChecked={todo.done} onChange={toggleDone} />
      <span>{todo.text}</span>
    </Container>
  );
};

export default TodoItem;
