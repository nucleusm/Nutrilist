import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <Link id='logo' to='/'>
            Nutrilist
          </Link>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
