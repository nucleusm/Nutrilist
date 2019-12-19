import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class FoodItem extends Component {
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
