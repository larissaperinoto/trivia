import React, { Component } from 'react';
import logo from '../trivia.png';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="App">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
    );
  }
}
