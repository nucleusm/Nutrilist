import React, { Component } from 'react';
import FoodItem from './FoodItem.js';

export class Foods extends Component {
  render() {
    return (
      <div>
        {this.props.foods.map((food, index) => (
          <FoodItem key={index} food={food} />
        ))}
      </div>
    );
  }
}

export default Foods;
