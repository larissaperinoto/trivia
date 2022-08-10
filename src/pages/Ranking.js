import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import md5 from 'crypto-js/md5';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { name, score, assertions } = this.props;
    const localStorageData = localStorage.getItem('ranking');
    const rankingList = localStorageData && localStorageData !== ''
    && JSON.parse(localStorageData)
      .sort((a, b) => b.score - a.score);
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
        <ul>
          {localStorageData && rankingList.map((c, i) => (
            <li key={ i }>
              <img src={ `https://www.gravatar.com/avatar/${md5(c.email).toString()}` } alt={ `Imagem de ${c.name}` } />
              <p>Player:</p>
              <p data-testid={ `player-name-${i}` }>{ c.name }</p>
              <p>Score:</p>
              <p data-testid={ `player-score-${i}` }>{ c.score }</p>
            </li>))}
        </ul>
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
