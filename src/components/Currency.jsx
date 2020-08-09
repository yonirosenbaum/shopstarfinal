import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCurrency } from "../actions/Actions";
import PropTypes from "prop-types";

class Currency extends Component {
  currencyChangeHandler = (event) => {
    this.props.changeCurrency(event.target.value);
  };

  render() {
    return (
      <div className="form-group">
        {this.props.showLabel ? (
          <label>
            <h5 style={{ color: "#93b6ee" }}>Currency</h5>
          </label>
        ) : null}
        <select
          className="form-control"
          value={Object.keys(this.props.usedCurrency)[0]}
          onChange={this.currencyChangeHandler}
        >
          {Object.keys(this.props.exchangeRates.rates).map(
            (rateName, index) => (
              <option
                key={index}
                value={this.props.exchangeRates.rates[index]}
              >
                {rateName}
              </option>
            )
          )}
        </select>
      </div>
    );
  }
}

Currency.propType = {
  usedCurrency: PropTypes.object.isRequired,
  exchangeRates: PropTypes.object.isRequired,
  showLabel: PropTypes.bool,
};

const mapStateToProps = (state) => {
  
  return {
    exchangeRates: state.exchangeRates,
    usedCurrency: state.usedCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currencyName) =>
      dispatch(changeCurrency(currencyName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Currency);
