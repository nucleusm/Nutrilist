import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Food = ({ food, getFood, match }) => {
  useEffect(() => {
    getFood(match.params.food_name);
    // eslint-disable-next-line
  }, []);

  const {
    food_name,
    serving_weight_grams,
    nf_calories,
    nf_total_carbohydrate,
    nf_sugars,
    nf_protein,
    nf_sodium,
    nf_total_fat,
    nf_saturated_fat
  } = food;

  return (
    <Fragment>
      <Link to='/'>Go back</Link>
      <div className='center-page'>
        <h2>{food_name}</h2>
        <ul className='nutrition-list'>
          <li>serving size in grams: {serving_weight_grams}</li>
          <li>calories: {nf_calories}</li>
          <li>cabohydrates: {nf_total_carbohydrate}</li>
          <li>sugars: {nf_sugars}</li>
          <li>protein: {nf_protein}</li>
          <li>sodium: {nf_sodium}</li>
          <li>total fat: {nf_total_fat}</li>
          <li>saturated fat: {nf_saturated_fat}</li>
        </ul>
      </div>
    </Fragment>
  );
};

Food.propTypes = {
  getFood: PropTypes.func.isRequired
};

export default Food;
