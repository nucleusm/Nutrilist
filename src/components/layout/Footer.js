import React, { Component } from 'react';

export class Footer extends Component {
  render() {
    return <footer>{new Date().getFullYear()} | Nutrilist</footer>;
  }
}

export default Footer;
