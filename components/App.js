import React from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, clearCompleted } from '../client/reducer';
import Todo from './Todo';

// Redux-connected class container. React 0.14 has no hooks, so this
// is a class with local component state for the AddTodo draft input.
//
// Visibility rule for the "Clear completed" button: rendered only
// when completedCount > 0 — hidden entirely when there are no
// completed todos (acceptance criterion 4).

var mapStateToProps = function (state) {
  return {
    todos: state.todos,
    completedCount: state.todos.filter(function (t) {
      return t.completed;
    }).length,
  };
};

var mapDispatchToProps = function (dispatch) {
  return {
    addTodo: function (text) { dispatch(addTodo(text)); },
    toggleTodo: function (id) { dispatch(toggleTodo(id)); },
    clearCompleted: function () { dispatch(clearCompleted()); },
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { draft: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    this.setState({ draft: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var text = this.state.draft.trim();
    if (text.length === 0) {
      return;
    }
    this.props.addTodo(text);
    this.setState({ draft: '' });
  }

  handleClear() {
    this.props.clearCompleted();
  }

  render() {
    var self = this;
    var todoNodes = this.props.todos.map(function (todo) {
      return (
        React.createElement(Todo, {
          key: todo.id,
          id: todo.id,
          text: todo.text,
          completed: todo.completed,
          onClick: self.props.toggleTodo,
        })
      );
    });

    var clearButton = null;
    if (this.props.completedCount > 0) {
      clearButton = React.createElement(
        'button',
        { type: 'button', onClick: this.handleClear },
        'Clear completed'
      );
    }

    return (
      React.createElement('div', null,
        React.createElement('form', { onSubmit: this.handleSubmit },
          React.createElement('input', {
            type: 'text',
            value: this.state.draft,
            onChange: this.handleChange,
            placeholder: 'What needs to be done?',
          }),
          React.createElement(
            'button',
            { type: 'submit' },
            'Add'
          )
        ),
        React.createElement('ul', null, todoNodes),
        clearButton
      )
    );
  }
}

App.propTypes = {
  todos: React.PropTypes.array.isRequired,
  completedCount: React.PropTypes.number.isRequired,
  addTodo: React.PropTypes.func.isRequired,
  toggleTodo: React.PropTypes.func.isRequired,
  clearCompleted: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);