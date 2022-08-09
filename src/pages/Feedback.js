import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return(
      <>
        <Header />
        <div>
          {assertions < 3 && <span data-testid="feedback-text">Could be better...</span>}
          {assertions === 3 && <span data-testid="feedback-text">Well done!</span>}
          {assertions > 3 && <span data-testid="feedback-text">Well done!</span>}
        </div>
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  assertions: state.assertions,
});

export default connect(mapStateToProps)(Feedback);