import TodoBuilder from './TodoBuilder';

export default class Todo {
  id: number;

  text: string;

  done: boolean;

  constructor(builder: TodoBuilder) {
    this.id = builder.id;
    this.text = builder.text;
    this.done = builder.done;
  }

  public toggle(): boolean {
    this.done = !this.done;
    return this.done;
  }
}
