import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import onClickOutside from 'react-onclickoutside';

class AddTodo extends Component {

  handleClickOutside() {
    $("#welcomeDiv").removeClass('welcomeDiv-show');
    $("#header").removeClass('header-minified');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const todoText = this.refs.todoText.value;
    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      this.props.onAddTodo(todoText);
    } else {
      this.refs.todoText.focus();
    }
  }

  render () {
    return (
      <div className="tc f3">
        <form ref="form" className='welcomeDiv flex flex-row w-100 items-start' id='welcomeDiv' onSubmit={this.handleSubmit}>
          <input type="text" ref="todoText" id='welcomeDiv' className='w-90 tc ht-40' placeholder="What do you need to do?"/>
          <div className='w-10'>
              <button className='flat-button bn w-100'><i className="fa fa-plus" aria-hidden="true"></i></button>
          </div>  
        </form>
      </div>
    );
  }
}

export default onClickOutside(AddTodo);