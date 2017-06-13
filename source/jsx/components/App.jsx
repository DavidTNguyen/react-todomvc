import React, { Component } from 'react';
import { fromJS, List, Map } from 'immutable';
import { Router } from 'director/build/director.js';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

const uuid = () => {
  let i;
  let random;
  let id = '';

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) id += '-';
    id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }

  return id;
};

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
    const id = uuid();

    const newTodo = Map({
      id: id,
      title: todo,
      completed: false
    });

    this.setState(({todos}) => ({todos: todos.push(newTodo)}));
  }
  toggle (event) {
    const id = event.target.id;
    const index = this.state.todos.findIndex((todo) => todo.get('id') === id);

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
    const id = event.target.id;
    const index = this.state.todos.findIndex((todo) => todo.get('id') === id);

    this.setState(({todos}) => ({
      todos: todos.delete(index)
    }));
  }
  clearCompleted () {
    const activeTodos = this.state.todos.filter((todo) => (
      todo.get('completed') === false
    ));

    this.setState(({todos}) => ({
      todos: activeTodos
    }));
  }
  update (id, title) {
    const index = this.state.todos.findIndex((todo) => todo.get('id') === id);
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

    return (
      <div className='todoapp'>
        <Header
          add={add}
        />
        <Main
          todos={todos}
          nowShowing={nowShowing}
          toggle={toggle}
          toggleAll={toggleAll}
          destroy={destroy}
          update={update}
        />
        <Footer
          todos={todos}
          nowShowing={nowShowing}
          clearCompleted={clearCompleted}
        />
      </div>
    );
  }
}

export default App;
