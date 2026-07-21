import React from 'react';

const TodoForm = React.createClass({
  getInitialState() {
    return {
      text: '',
    };
  },

  handleChange(event) {
    this.setState({ text: event.target.value });
  },

  handleSubmit(event) {
    event.preventDefault();
    const trimmed = this.state.text.trim();
    if (trimmed === '') {
      return;
    }
    this.props.onAdd(trimmed);
    this.setState({ text: '' });
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>
    );
  },
});

export default TodoForm;
