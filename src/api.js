const TodoAPI = {
  filterTodos : function (todos, showCompleted, searchText) {
    var filterTodos = todos;
    // filter by showCompleted
    filterTodos = filterTodos.filter((todo) => {
      return !todo.done || showCompleted;
    });

    // filter by searchText
    filterTodos = filterTodos.filter((todo) => {
      var title = todo.title.toLowerCase();
      return searchText.length === 0 || title.indexOf(searchText) > -1;
    });

    // sort todos woth non-completed first
    filterTodos.sort((a, b) => {
      if (!a.done && b.done) {
        return -1;
      } else if (a.done && !b.done) {
        return 1;
      } else {
        return 0;
      }
    });

    return filterTodos;
  }
}

export default TodoAPI;