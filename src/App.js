import React, { Component } from 'react';
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

class App extends Component {
  state = {
    foods: [],
    food: {},
    emptyFoods: false,
    emptyName: '',
    loading: false,
    alert: null
  };

  searchFoods = async text => {
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
      this.setState({ emptyFoods: true, emptyName: text });
      setTimeout(
        () => this.setState({ emptyFoods: false, emptyName: '' }),
        7000
      );
    }
    this.setState({ foods: res.data.common, loading: false });
  };

  getFood = async id => {
    this.setState({ food: {}, loading: false, alert: null });

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
    this.setState({
      loading: false,
      food: res.data.foods[0]
    });
  };

  clearFoods = () => {
    this.setState({ foods: [], loading: false, alert: null });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 7000);
  };

  render() {
    return (
      <Router>
        <Navbar />
        <main className='container'>
          <Alert
            alert={this.state.alert}
            emptyFoods={this.state.emptyFoods}
            emptyName={this.state.emptyName}
          />
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <div>
                  <Search
                    searchFoods={this.searchFoods}
                    clearFoods={this.clearFoods}
                    setAlert={this.setAlert}
                  />
                  <Foods foods={this.state.foods} />
                </div>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/food/:food_name'
              render={props => (
                <Food
                  {...props}
                  getFood={this.getFood}
                  food={this.state.food}
                  foodThumb={this.state.foodThumb}
                />
              )}
            />
          </Switch>
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
