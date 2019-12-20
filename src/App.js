import React, { useState } from 'react';
import './App.css';
import About from './components/pages/About.js';
import Navbar from './components/layout/Navbar.js';
import Alert from './components/layout/Alert.js';
import Foods from './components/food/Foods.js';
import Food from './components/food/Food.js';
import Search from './components/food/Search.js';
import Footer from './components/layout/Footer.js';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [foods, setFoods] = useState([]);
  const [food, setFood] = useState({});
  const [emptyFoods, setEmptyFoods] = useState(false);
  const [emptyName, setEmptyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchFoods = async text => {
    const res = await axios.get(
      `https://trackapi.nutritionix.com/v2/search/instant?query=${text}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': 'ab1986a7',
          'x-app-key': '2f3d2a51cb5c6cb5803e4d39c5937618'
        }
      }
    );
    console.log(res.data);
    if (res.data.common.length === 0) {
      setEmptyFoods(true);
      setEmptyName(text);
      setTimeout(() => {
        setEmptyFoods(false);
        setEmptyName('');
      }, 7000);
    }
    setFoods(res.data.common);
    setLoading(false);
  };

  const getFood = async id => {
    setFood({});
    setLoading(false);
    setAlert(null);
    const myData = { query: id };

    const encodeForm = data => {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
    };

    const res = await axios.post(
      `https://trackapi.nutritionix.com/v2/natural/nutrients`,
      encodeForm(myData),
      {
        headers: {
          'x-app-id': 'ab1986a7',
          'x-app-key': 'f5d97a4a96fe4fa38e6fdf5eeb64cbf7',
          'x-remote-user-id': 0
        }
      }
    );
    console.log(res.data.foods[0]);

    setLoading(false);
    setFood(res.data.foods[0]);
  };

  const clearFoods = () => {
    setFoods([]);
    setLoading(false);
    setAlert(null);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 7000);
  };

  return (
    <Router>
      <Navbar />
      <main className='container'>
        <Alert alert={alert} emptyFoods={emptyFoods} emptyName={emptyName} />
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <div>
                <Search
                  searchFoods={searchFoods}
                  clearFoods={clearFoods}
                  setAlert={showAlert}
                />
                <Foods foods={foods} />
              </div>
            )}
          />
          <Route exact path='/about' component={About} />
          <Route
            exact
            path='/food/:food_name'
            render={props => <Food {...props} getFood={getFood} food={food} />}
          />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
