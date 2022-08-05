import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import getToken from '../services/getToken';
// import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      redirectLogin: false,
      redirectSettings: false,
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.inputChange());
  }

  inputChange = () => {
    const { name, email } = this.state;
    const re = /\S+@\S+\.\S+/;
    const testEmail = re.test(email);
    if (name.length !== 0 && testEmail) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClickLogin = async () => {
    await getToken();
    this.setState({ redirectLogin: true });
  }

  handleClickSettings = () => {
    this.setState({ redirectSettings: true });
  }

  render() {
    const { name, email, isDisabled, redirectLogin, redirectSettings } = this.state;
    return (
      <>
        <Header />
        <form>
          <label htmlFor="input-player-name">
            <input
              data-testid="input-player-name"
              type="text"
              id="input-player-name"
              placeholder="Nome"
              name="name"
              onChange={ (event) => this.handleChange(event) }
              value={ name }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            <input
              data-testid="input-gravatar-email"
              type="email"
              id="input-gravatar-email"
              placeholder="Email"
              name="email"
              onChange={ (event) => this.handleChange(event) }
              value={ email }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClickLogin }
            disabled={ isDisabled }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.handleClickSettings }
          >
            Configurações
          </button>
        </form>
        {
          redirectLogin && <Redirect to="/game-trivia" />
        }
        {
          redirectSettings && <Redirect to="/settings" />
        }
      </>
    );
  }
}

export default Login;
