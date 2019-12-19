import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <Link id='logo' to='/'>
            <i class='lab la-envira'></i>Nutrilist
          </Link>
          <Link to='/about'>
            <i id='question' class='las la-question-circle'></i>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
