// Action types — string constants imported by both the reducer and the UI.
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// Module-level id counter. Lives in the action-creator layer so the reducer
// stays pure (no Date.now(), no Math.random()).
let nextTodoId = 1;

function nextId() {
  return nextTodoId++;
}

// Action creators.
export function addTodo(text) {
  return { type: ADD_TODO, id: nextId(), text, completed: false };
}

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id };
}

export function clearCompleted() {
  return { type: CLEAR_COMPLETED };
}

const initialState = { todos: [] };

export default function reducer(state, action) {
  if (state === undefined) {
    state = initialState;
  }

  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: state.todos.concat([{
          id: action.id,
          text: action.text,
          completed: false,
        }]),
      });

    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map(function (t) {
          return t.id === action.id
            ? Object.assign({}, t, { completed: !t.completed })
            : t;
        }),
      });

    case CLEAR_COMPLETED: {
      const remaining = state.todos.filter(function (t) {
        return !t.completed;
      });
      // Short-circuit: if nothing was removed, return the original state by
      // reference equality (test 7 demands this).
      if (remaining.length === state.todos.length) {
        return state;
      }
      return Object.assign({}, state, { todos: remaining });
    }

    default:
      return state;
  }
}
