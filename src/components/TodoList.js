import React, { Component } from 'react';
import Todo from './Todo';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class TodoList extends Component {
  render () {
    let { todos } = this.props;
    const renderTodos = todos.map((todo, index) => 
      <Todo key={index} index={index} {...todo} onToggle={this.props.onToggle}/>
    )
    return (
      <div  className="tc overflow-auto h-50 list">
        <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            className='flex flex-column items-center'
            >
          {renderTodos}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}