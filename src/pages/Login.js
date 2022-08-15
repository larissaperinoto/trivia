import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../trivia.png';
import getToken from '../services/getToken';
import { userLogin as userLoginAction } from '../redux/actions';
import './Login.css';

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
    const { userLogin } = this.props;
    const { name, email } = this.state;
    await getToken();
    this.setState({ redirectLogin: true });

    userLogin(name, email);
  }

  handleClickSettings = () => {
    this.setState({ redirectSettings: true });
  }

  render() {
    const { name, email, isDisabled, redirectLogin, redirectSettings } = this.state;
    return (
      <div className="login-area-geral">
        <div className="login-area">
          <img src={ logo } className="App-logo" alt="logo" />
          <form className="input-area">
            <label htmlFor="input-player-name">
              <input
                className="input-login-name"
                data-testid="input-player-name"
                type="text"
                placeholder="Nome"
                name="name"
                onChange={ (event) => this.handleChange(event) }
                value={ name }
              />
            </label>
            <label htmlFor="input-gravatar-email">
              <input
                className="input-login-email"
                data-testid="input-gravatar-email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={ (event) => this.handleChange(event) }
                value={ email }
              />
            </label>
            <div className="btn-area">
              <button
                className={ isDisabled ? 'input-btn-play' : 'btn-play' }
                data-testid="btn-play"
                type="button"
                onClick={ this.handleClickLogin }
                disabled={ isDisabled }
              >
                Play
              </button>
              <button
                className="input-btn-settings"
                data-testid="btn-settings"
                type="button"
                onClick={ this.handleClickSettings }
              >
                Configurações
              </button>
            </div>
          </form>
          {
            redirectLogin && <Redirect to="/game-trivia" />
          }
          {
            redirectSettings && <Redirect to="/settings" />
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (name, email) => dispatch(userLoginAction(name, email)),
});

Login.propTypes = {
  userLogin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
