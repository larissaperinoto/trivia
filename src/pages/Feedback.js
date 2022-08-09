import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const base = 3;
    return (
      <>
        <Header />
        <div>
          { assertions < base
            && (
              <span
                data-testid="feedback-text"
              >
                Could be better...
              </span>
            )}
          { assertions === base && <span data-testid="feedback-text">Well done!</span> }
          { assertions > base && <span data-testid="feedback-text">Well done!</span> }
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
