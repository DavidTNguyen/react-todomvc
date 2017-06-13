# React TodoMVC
> TodoMVC in ES2015 React with Immutable.

This is a completed rewrite of the React [example](https://github.com/tastejs/todomvc/tree/master/examples/react) on [TodoMVC.com](http://todomvc.com) in ES2015.  

The `utils.js` and `todoModel.js` files have been removed and their logic has been moved into the `<App />` container component.  

Instead of three large components, the app has been broken up into smaller, stateless pure components.  

All application state lives in the `<App />` component. The two Form components - `<TodoForm />` and `<TodoEditForm />` - are controlled components.  

All props are type-checked using PropTypes.  

Immutable is used to prevent accidental data mutations and for its robust API for getting and setting data.  

### TODO
*How appropriate...*

1. Add Redux.
2. Replace Director with React Router.
3. Replace `localStorage` with IndexedDB.
