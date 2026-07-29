import React from 'react';

// Presentational component for a single todo row. Receives the todo's
// identity (id), display fields (text, completed) and the toggle handler
// already wired by the container. No Redux imports — this is a plain
// React class because the project is pinned to React 0.14 (no hooks).

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    var completedClass = this.props.completed ? 'completed' : '';
    return (
      React.createElement('li', {
        className: completedClass,
        onClick: this.handleClick,
      }, this.props.text)
    );
  }
}

Todo.propTypes = {
  id: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default Todo;