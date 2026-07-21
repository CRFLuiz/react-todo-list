import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function generateId() {
  return Date.now() + Math.random();
}

const App = React.createClass({
  getInitialState() {
    return {
      todos: [],
    };
  },

  addTodo(text) {
    const id = generateId();
    const todo = { id: id, text: text, completed: false };
    this.setState({ todos: [...this.state.todos, todo] });
  },

  toggleTodo(id) {
    const todos = this.state.todos.map(function (t) {
      if (t.id === id) {
        return Object.assign({}, t, { completed: !t.completed });
      }
      return t;
    });
    this.setState({ todos: todos });
  },

  removeTodo(id) {
    const todos = this.state.todos.filter(function (t) {
      return t.id !== id;
    });
    this.setState({ todos: todos });
  },

  render() {
    return (
      <div>
        <TodoForm onAdd={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          onToggle={this.toggleTodo}
          onRemove={this.removeTodo}
        />
      </div>
    );
  },
});

export default App;
