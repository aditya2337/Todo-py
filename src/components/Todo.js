import React, { Component } from 'react';
import $ from 'jquery';

export default class Todo extends Component {
  getOpacity = (index) => {
    const realIndex= index.toString().split('').pop();
    if (realIndex < 6) {
      return 100 - (realIndex*10);
    } else {
      return Math.abs(Math.abs((realIndex*10) - 100) - 100);
    }
  }

  render () {
    const {_id, title, done, index} = this.props;

    const todo = 
      (!done) ? (
        <div onClick={() => {
          $(this).toggleClass('clicked');
            this.props.onToggle(_id);
          }} className={`card checkNom m-auto mt3 flex h3 w-80 bg-red white o-${this.getOpacity(index)}`}>
           <div className='w-10 todo-title done'>
           <i className="fa fa-check" aria-hidden="true"></i>
            <input type="checkbox" id="test" className='checkbox-custom' checked={done} />
          </div>
          <div className='w-100 v-mid todo-title'>{title}</div>
        </div>
      ) : (
        <div onClick={() => {
            this.props.onToggle(_id);
          }} className={`card flex checkNom m-auto mt3 h3 w-80 bg-green white o-${this.getOpacity(index)}`}>
          <div className='w-10 todo-title not-done'>
            <i className="fa fa-times" aria-hidden="true"></i> 
            <input type="checkbox" id="test" className='checkbox-custom' checked={done} />
          </div>
          <div className='w-100 v-mid todo-title strike'>
            <div>{title}</div>
          </div>
        </div>
      )

    return todo;
  }
}