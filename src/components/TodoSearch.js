import React, { Component } from 'react';
import '../css/search-box.css';

export default class TodoSearch extends Component {

  constructor (props) {
    super(props);

    this.state = {
      completed: false
    }
  }

  handleSearch = () => {
    const completed = !this.state.completed;

    this.setState({completed: completed})

    this.props.onSearch(completed);
  }

  render () {
    const completed = this.state.completed;
    return (
      <div className='h-100'>
        <div className="tc">
          <div>
            <div className='tl h-100 pointer'>
              <span className="ion-checkmark-round" aria-hidden="true" onClick={this.handleSearch}></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}