import React, { Component } from 'react';
import { connect } from 'react-redux';
import initContext from './actions/initContext';
import getExchangeAmount from './actions/getExchangeAmount';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCurrency: 'btc',
      toCurrency: 'eth',
      fromValue: 1,
    }
  }

  fromCurrencyChange = event => {
    this.setState({ fromCurrency: event.target.value });
    const { toCurrency, fromValue } = this.state;
    this.props.getExchangeAmount(event.target.value, toCurrency, fromValue);
  }

  toCurrencyChange = event => {
    this.setState({ toCurrency: event.target.value });
    const { fromCurrency, fromValue } = this.state;
    this.props.getExchangeAmount(fromCurrency, event.target.value, fromValue);
  }

  componentWillMount() {
    const { fromCurrency, toCurrency, fromValue } = this.state;
    this.props.initContext();
    this.props.getExchangeAmount(fromCurrency, toCurrency, fromValue);
  }

  render() {
    const { fromValue, fromCurrency, toCurrency } = this.state;
    const { currencies, exchangeAmount } = this.props;
    return (
      <div>
        <input value={fromValue} />
        <CurrencyDropdown
          currencies={currencies}
          selected={fromCurrency}
          disabled={toCurrency}
          onChange={fromCurrency => this.fromCurrencyChange(fromCurrency)}
        />
        <span>=</span>
        <input value={exchangeAmount} />
        <CurrencyDropdown
          currencies={currencies}
          selected={toCurrency}
          disabled={fromCurrency}
          onChange={toCurrency => this.toCurrencyChange(toCurrency)}
        />
      </div>
    );
  }
}

const CurrencyDropdown = props => (
  <select onChange={props.onChange}>
    {props.currencies.map((currency, index) =>
      <option
        key={index}
        disabled={currency === props.disabled}
        defaultValue={currency === props.selected}
        value={currency}>
        {currency}
      </option>
    )}
  </select>
);

const mapStateToProps = (state) => ({
  currencies: state.currencies,
  exchangeAmount: state.exchangeAmount,
})

export default connect(mapStateToProps, { initContext, getExchangeAmount })(Main);
