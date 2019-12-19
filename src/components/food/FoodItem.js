import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class FoodItem extends Component {
  static propTypes = {
    food: PropTypes.object.isRequired
  };
  render() {
    const { food_name } = this.props.food;
    return (
      <div className='food-item'>
        <Link to={`/food/${food_name}`}>{food_name}</Link>
      </div>
    );
  }
}

export default FoodItem;
