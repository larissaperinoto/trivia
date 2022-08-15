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
    const localStorageData = localStorage.getItem('ranking');
    const rankingList = localStorageData && localStorageData !== ''
    && JSON.parse(localStorageData)
      .sort((a, b) => b.score - a.score);
    return (
      <div className="ranking-area">
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.handleClick() }
        >
          Início
        </button>
        <ul className="lista-ranking">
          {localStorageData && rankingList.map((c, i) => (
            <li className="player-rank" key={ i }>
              <img src={ `https://www.gravatar.com/avatar/${md5(c.email).toString()}` } alt={ `Imagem de ${c.name}` } />
              <div className="plyr-info">
                <div className="plyr-info-name">
                  <span>Player: </span>
                  <span
                    className="player-name"
                    data-testid={ `player-name-${i}` }
                  >
                    { c.name }
                  </span>
                </div>
                <div className="plyr-info-score">
                  <span>Score:</span>
                  <span
                    className="player-score"
                    data-testid={ `player-score-${i}` }
                  >
                    { c.score }
                  </span>
                </div>
              </div>
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
