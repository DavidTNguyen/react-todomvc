import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, List, Map } from 'immutable';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

const uuid = require('uuid/v4');

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

class TodoApp extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired
  };
  state = {
    todos: fromJS(JSON.parse(window.localStorage.getItem('react-todomvc'))) || List([]),
    active: this.props.active
  };
  onSubmit = (title) => {
    const key = uuid();

    const newTodo = Map({
      key: key,
      title: title,
      completed: false
    });

    this.setState(({todos}) => ({todos: todos.push(fromJS(newTodo))}));
  };
  onToggle = (event) => {
    const key = event.target.key;
    const index = this.state.todos.findIndex((todo) => todo.get('key') === key);

    this.setState(({todos}) => ({
      todos: todos.update(index, todo => todo.update('completed', completed => !completed))
    }));
  };
  onToggleAll = (event) => {
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
  };
  onDestroy = (event) => {
    const key = event.target.key;
    const index = this.state.todos.findIndex((todo) => todo.get('key') === key);

    this.setState(({todos}) => ({
      todos: todos.delete(index)
    }));
  };
  onClear = () => {
    const activeTodos = this.state.todos.filter((todo) => (
      todo.get('completed') === false
    ));

    this.setState(({todos}) => ({
      todos: activeTodos
    }));
  };
  onUpdate = (key, title) => {
    const index = this.state.todos.findIndex((todo) => todo.get('key') === key);
    const updatedTitle = title;

    this.setState(({todos}) => ({
      todos: todos.update(index, todo => todo.update('title', title => updatedTitle))
    }));
  };
  componentWillReceiveProps (nextProps) {
    this.setState(({active}) => ({
      active: nextProps.active
    }));
  }
  componentDidMount () {
    window.document.title = `React TodoMVC | ${capitalize(this.state.active)}`;
  }
  componentDidUpdate (prevProps, prevState) {
    window.document.title = `React TodoMVC | ${capitalize(this.state.active)}`;

    if (window.localStorage && prevState.todos !== this.state.todos) {
      const todos = JSON.stringify(this.state.todos.toJS());

      window.localStorage.setItem('react-todomvc', todos);
    }
  }
  render () {
    const { onSubmit, onToggle, onToggleAll, onDestroy, onClear, onUpdate } = this;
    const { todos, active } = this.state;

    return (
      <div className='todoapp'>
        <Header
          onSubmit={onSubmit}
        />
        <Main
          todos={todos}
          active={active}
          onToggle={onToggle}
          onToggleAll={onToggleAll}
          onDestroy={onDestroy}
          onUpdate={onUpdate}
        />
        <Footer
          todos={todos}
          onClear={onClear}
        />
      </div>
    );
  }
}

export default TodoApp;
