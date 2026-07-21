import React from 'react';

const TodoItem = React.createClass({
  handleToggle() {
    this.props.onToggle(this.props.todo.id);
  },

  handleRemove() {
    this.props.onRemove(this.props.todo.id);
  },

  render() {
    const todo = this.props.todo;
    const itemStyle = todo.completed
      ? { textDecoration: 'line-through', color: '#999' }
      : {};
    return (
      <li>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={this.handleToggle}
        />
        <span style={itemStyle}>{todo.text}</span>
        <button type="button" onClick={this.handleRemove}>Remove</button>
      </li>
    );
  },
});

export default TodoItem;