import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, List, Map } from 'immutable';
import uuid from 'uuid/v4';

import { todoApp } from './TodoApp.scss';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

class TodoApp extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired
  };

  state = {
    todos: fromJS(JSON.parse(window.localStorage.getItem('react-todomvc'))) || List([]),
    active: this.props.active,
    editing: null
  };

  setWindowTitle = (title) => {
    window.document.title = `React TodoMVC | ${title.charAt(0).toUpperCase() + title.slice(1)}`;
  };

  saveTodo = (title) => {
    const id = uuid();

    const newTodo = Map({
      _id: id,
      title: title,
      completed: false
    });

    this.setState(({todos}) => ({ todos: todos.push(newTodo) }));
  };

  toggleTodo = (event) => {
    const id = event.target.id;
    const index = this.state.todos.findIndex((todo) => todo.get('_id') === id);

    this.setState(({todos}) => ({
      todos: todos.update(index, todo => todo.update('completed', completed => !completed))
    }));
  };

  toggleAllTodos = (event) => {
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

  deleteTodo = (event) => {
    const id = event.target.id;
    const index = this.state.todos.findIndex((todo) => todo.get('_id') === id);

    this.setState(({todos}) => ({
      todos: todos.delete(index)
    }));
  };

  clearCompletedTodos = () => {
    const activeTodos = this.state.todos.filter((todo) => (
      todo.get('completed') === false
    ));

    this.setState({
      todos: activeTodos
    });
  };

  editTodo = (event) => {
    const id = event.target.id;

    if (id === this.state.editing) {
      this.setState({ editing: null });
    } else {
      this.setState({ editing: id });
    }
  };

  cancelEditing = (event) => {
    const escape = 27;

    if (event.which === escape) {
      this.setState({ editing: null });
    }
  };

  updateTodo = (id, title) => {
    const index = this.state.todos.findIndex((todo) => todo.get('_id') === id);
    const updatedTitle = title;

    this.setState(({todos}) => ({
      todos: todos.update(index, todo => todo.update('title', title => updatedTitle))
    }));
  };

  componentWillReceiveProps (nextProps) {
    this.setState({
      active: nextProps.active
    });
  }

  componentDidMount () {
    this.setWindowTitle(this.state.active);
  }

  componentDidUpdate (prevProps, prevState) {
    this.setWindowTitle(this.state.active);

    if (window.localStorage && prevState.todos !== this.state.todos) {
      const todos = JSON.stringify(this.state.todos.toJS());

      window.localStorage.setItem('react-todomvc', todos);
    }
  }

  render () {
    const { todos, active, editing } = this.state;
    const {
      saveTodo,
      toggleTodo,
      toggleAllTodos,
      clearCompletedTodos,
      deleteTodo,
      editTodo,
      cancelEditing,
      updateTodo
    } = this;

    return (
      <div className={todoApp}>
        <Header
          saveTodo={saveTodo}
        />
        <Main
          todos={todos}
          active={active}
          editing={editing}
          toggleTodo={toggleTodo}
          toggleAllTodos={toggleAllTodos}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          cancelEditing={cancelEditing}
          updateTodo={updateTodo}
        />
        <Footer
          todos={todos}
          clearCompletedTodos={clearCompletedTodos}
        />
      </div>
    );
  }
}

export default TodoApp;
