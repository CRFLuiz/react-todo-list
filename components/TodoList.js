import React from 'react';
import TodoItem from './TodoItem';

const TodoList = React.createClass({
  render() {
    const items = this.props.todos.map(function (todo) {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.props.onToggle}
          onRemove={this.props.onRemove}
        />
      );
    }.bind(this));

    return (
      <ul>
        {items}
      </ul>
    );
  },
});

export default TodoList;