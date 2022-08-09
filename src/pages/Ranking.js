import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { name, score, assertions } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <p>{ `${name} ---------------------- Acertos${assertions}/${score}` }</p>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.handleClick() }
        >
          Início
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  assertions: state.player.assertions,
});

Ranking.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  assertions: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Ranking);
