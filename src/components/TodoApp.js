import React, { Component } from 'react'
import TodoSearch from './TodoSearch';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import TodoAPI from '../api.js';
import axios from 'axios';
import $ from 'jquery';
import dateFormat from 'dateformat';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

// https://dribbble.com/shots/3313725-Todo-1
export default class TodoApp extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showCompleted: false,
      searchText: '',
      todos : [],
      today: new Date(),
      dayName: null,
      day: null,
      todayTimestamp: null
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  fetchTodos (date) {
    axios.get(`http://138.197.29.193/todo/api/v1.0/tasks/${date}`)
      .then(res => {
        this.setState({todos: res.data.result})
      })
    ;
  }

  componentWillMount () {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const dayName= days[date.getDay()];
    const day = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    const todayTimestamp = `${day}-${mm}-${yyyy}`;
    this.setState({day, dayName, todayTimestamp})
    this.fetchTodos(todayTimestamp);
  }

  handleAddTodo (text) {
    const { todayTimestamp } = this.state;
    console.log(todayTimestamp);
    axios.post(`http://138.197.29.193/todo/api/v1.0/tasks`, {
      title: text,
      done: false,
      timestamp: todayTimestamp
    }).then(res => this.fetchTodos(todayTimestamp))
  }

  handleSearch (showCompleted, searchText) {
    var searchText = this.refs.searchText.value;
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  }

  handleToggle (id) {
    var updatedTodos = this.state.todos.map(function (todo) {
      if (todo._id === id) {
        todo.done = !todo.done;
        axios.put(`http://138.197.29.193/todo/api/v1.0/tasks/${todo._id}`, {
          done: todo.done
        })
      }
      return todo;
    });

    this.setState({todos: updatedTodos});
  }

  handleDateChange (date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDate = new Date(date);
    const timestamp = Math.floor(selectedDate.getTime() / 1000);
    const dayName= days[selectedDate.getDay()];
    const day = selectedDate.getDate();
    const mm = selectedDate.getMonth() + 1;
    const yyyy = selectedDate.getFullYear();

    const todayTimestamp = `${day}-${mm}-${yyyy}`;
    this.setState({day, dayName, todayTimestamp});
    this.fetchTodos(todayTimestamp);
  }

  handleAdding = (e) => {
    $("#welcomeDiv").toggleClass('welcomeDiv-show');
    $("#header").toggleClass('header-minified');
  }

  render () {
    // filer todos
    const {showCompleted, searchText, today, day, dayName} = this.state;

    let todos = this.state.todos
    todos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    return (
      <div className=' w-100 h-100 flex flex-column'>
        <div className="center main-window h-100 w-80">
          <div className="container h-100 w-100 flex w6 center">
            <div className='flex items-center w-30 calender'>
              <InfiniteCalendar
                selected={today}
                className='w-40 card-5'
                width={(window.innerWidth <= 300) ? window.innerWidth : 350}
                height={350}
                onSelect={(date) => this.handleDateChange(date)}
              />
            </div>
            <div className='flex z-1 w-70 items-center todos'>
              <div className='w-100 card-5 ht-per-85 todo-list'>
                <div className="card-date shdw w-100 h-50 tc ttu">
                  <div className="header h-100" id='header'>
                  <AddTodo onAddTodo={this.handleAddTodo} />
                  <div className='flex justify-between f3'>
                    <div className='pointer'>
                      <i className="fa fa-plus v-mid" aria-hidden="true" onClick={this.handleAdding}></i>
                    </div>
                    <TodoSearch onSearch={this.handleSearch}/>
                    <div className="tl search" id='demo-2'>
                      <input type='search' id='inpt_search' className='bg-black' ref='searchText' placeholder="Search todos" onChange={this.handleSearch}/>
                    </div>
                  </div>
                    <h1>{day}</h1>
                    <p>{dayName}</p>
                  </div>
                </div>
                <TodoList todos={todos} onToggle={this.handleToggle}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}