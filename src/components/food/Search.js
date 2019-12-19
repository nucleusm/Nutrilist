import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    text: ''
  };
  static propTypes = {
    searchFoods: PropTypes.func.isRequired,
    clearFoods: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something');
    } else {
      this.props.searchFoods(this.state.text);
      this.setState({ text: '' });
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='searchForm'>
          <input
            type='text'
            name='text'
            className='searchInput'
            placeholder='Search for a food product...'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input type='submit' value='Search' className='search-button' />
          <button
            onClick={this.props.clearFoods}
            className='search-button search-clear'
          >
            Clear
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
