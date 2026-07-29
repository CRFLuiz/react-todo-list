import reducer, {
  ADD_TODO,
  TOGGLE_TODO,
  CLEAR_COMPLETED,
  addTodo,
  toggleTodo,
  clearCompleted,
} from '../reducer';

// Helper: build a todo with the given field overrides.
function makeTodo(overrides) {
  return Object.assign({
    id: 1,
    text: 'default',
    completed: false,
  }, overrides);
}

describe('reducer', function () {
  it('ADD_TODO from an empty state yields the expected first todo', function () {
    const action = addTodo('x');
    const next = reducer(undefined, action);
    expect(next).toEqual({ todos: [{ id: 1, text: 'x', completed: false }] });
    expect(action.type).toBe(ADD_TODO);
  });

  it('two successive addTodo calls produce distinct ids', function () {
    const a = addTodo('first');
    const b = addTodo('second');
    expect(a.id).not.toBe(b.id);
    const stateAfterA = reducer(undefined, a);
    const stateAfterB = reducer(stateAfterA, b);
    expect(stateAfterB.todos[0].id).toBe(a.id);
    expect(stateAfterB.todos[1].id).toBe(b.id);
    expect(stateAfterB.todos[0].id).not.toBe(stateAfterB.todos[1].id);
  });

  it('TOGGLE_TODO flips completed from false to true', function () {
    const start = { todos: [makeTodo({ id: 1, completed: false })] };
    const next = reducer(start, toggleTodo(1));
    expect(next.todos[0].completed).toBe(true);
  });

  it('TOGGLE_TODO leaves a non-matching todo by reference equality', function () {
    const matching = makeTodo({ id: 1, completed: false });
    const other = makeTodo({ id: 2, completed: false });
    const start = { todos: [matching, other] };
    const next = reducer(start, toggleTodo(1));
    expect(next.todos[1]).toBe(other);
    expect(next.todos[0]).not.toBe(matching);
  });

  it('CLEAR_COMPLETED removes only completed items, keeps actives by reference', function () {
    const active1 = makeTodo({ id: 1, text: 'active1', completed: false });
    const completed1 = makeTodo({ id: 2, text: 'done1', completed: true });
    const completed2 = makeTodo({ id: 3, text: 'done2', completed: true });
    const active2 = makeTodo({ id: 4, text: 'active2', completed: false });
    const start = { todos: [active1, completed1, completed2, active2] };

    const next = reducer(start, clearCompleted());

    expect(next.todos).toEqual([
      { id: 1, text: 'active1', completed: false },
      { id: 4, text: 'active2', completed: false },
    ]);
    expect(next.todos[0]).toBe(active1);
    expect(next.todos[1]).toBe(active2);
    expect(next.todos).toHaveLength(2);
  });

  it('CLEAR_COMPLETED on a fully-completed list returns { todos: [] }', function () {
    const start = {
      todos: [
        makeTodo({ id: 1, completed: true }),
        makeTodo({ id: 2, completed: true }),
      ],
    };
    const next = reducer(start, clearCompleted());
    expect(next).toEqual({ todos: [] });
  });

  it('CLEAR_COMPLETED with no completed todos returns state by reference equality', function () {
    const a = makeTodo({ id: 1, completed: false });
    const b = makeTodo({ id: 2, completed: false });
    const start = { todos: [a, b] };
    const next = reducer(start, clearCompleted());
    expect(next).toBe(start);
  });

  it('an unknown action type returns state by reference equality', function () {
    const start = { todos: [makeTodo({ id: 1 })] };
    const next = reducer(start, { type: 'UNKNOWN_TYPE' });
    expect(next).toBe(start);
  });
});

describe('action creators', function () {
  it('clearCompleted has the CLEAR_COMPLETED type', function () {
    expect(clearCompleted().type).toBe(CLEAR_COMPLETED);
  });

  it('toggleTodo carries the given id', function () {
    expect(toggleTodo(42).type).toBe(TOGGLE_TODO);
    expect(toggleTodo(42).id).toBe(42);
  });
});
