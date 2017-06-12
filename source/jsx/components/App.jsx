import React, { Component } from 'react';
import { fromJS, List, Map } from 'immutable';
import { Router } from 'director/build/director.js';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

class App extends Component {
  constructor (props) {
    super(props);
    this.add = this.add.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.destroy = this.destroy.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      todos: fromJS(JSON.parse(window.localStorage.getItem('react-todomvc'))) || List([]),
      nowShowing: 'all'
    };
  }
  add (todo) {
    const id = this.state.todos.size;

    this.setState(({todos}) => ({todos: todos.push(Map({
      id: id,
      title: todo,
      completed: false
    }))}));
  }
  toggle (event) {
    const index = event.target.id;

    this.setState(({todos}) => ({
      todos: todos.update(index, todo => todo.update('completed', completed => !completed))
    }));
  }
  toggleAll (event) {
    const checked = event.target.checked;

    if (checked) {
      this.setState(({todos}) => ({
        todos: todos.map(todo => todo.update('completed', completed => true))
      }));
    } else {
      this.setState(({todos}) => ({
        todos: todos.map(todo => todo.update('completed', completed => false))
      }));
    }
  }
  destroy (event) {
    const index = event.target.id;

    this.setState(({todos}) => ({
      todos: todos.delete(index)
    }));
  }
  clearCompleted () {
    const completedTodos = this.state.todos.filter((todo) => {
      if (todo.get('completed') === false) return todo;
    });

    this.setState(({todos}) => ({
      todos: completedTodos
    }));
  }
  update (id, title) {
    const index = id;
    const updatedTitle = title;

    this.setState(({todos}) => ({
      todos: todos.update(index, todo => todo.update('title', title => updatedTitle))
    }));
  }
  componentDidMount () {
    const router = Router({
      '/': this.setState.bind(this, { nowShowing: 'all' }),
      '/active': this.setState.bind(this, { nowShowing: 'active' }),
      '/completed': this.setState.bind(this, { nowShowing: 'completed' })
    });
    router.init('/');
  }
  componentDidUpdate () {
    const todos = JSON.stringify(this.state.todos.toJS());

    if (window.localStorage) {
      window.localStorage.setItem('react-todomvc', todos);
    }
  }
  render () {
    const { add, toggle, toggleAll, destroy, clearCompleted, update } = this;
    const { todos, nowShowing } = this.state;

    const activeTodoCount = todos.reduce((accumulator, todo) => (
      todo.get('completed') ? accumulator : accumulator + 1
    ), 0);

    const todoCount = todos.size;
    const completedTodoCount = todoCount - activeTodoCount;

    return (
      <div className='todoapp'>
        <Header
          add={add}
        />
        <Main
          todos={todos}
          todoCount={todoCount}
          activeTodoCount={activeTodoCount}
          nowShowing={nowShowing}
          toggle={toggle}
          toggleAll={toggleAll}
          destroy={destroy}
          update={update}
        />
        <Footer
          activeTodoCount={activeTodoCount}
          completedTodoCount={completedTodoCount}
          nowShowing={nowShowing}
          clearCompleted={clearCompleted}
        />
      </div>
    );
  }
}

export default App;
