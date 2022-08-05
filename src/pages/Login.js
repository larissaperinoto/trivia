import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.inputChange());
  }

  inputChange = () => {
    const { name, email } = this.state;
    const re = /\S+@\S+\.\S+/;
    const testEmail = re.test(email);
    console.log(testEmail);
    if (name.length !== 0 && testEmail) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
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
          /* onClick={ } */
          disabled={ isDisabled }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
