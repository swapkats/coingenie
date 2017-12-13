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
      <ExchangeCard
        fromValue={fromValue}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        exchangeAmount={exchangeAmount}
        currencies={currencies}
        onFromCurrencyChange={this.fromCurrencyChange}
        onToCurrencyChange={this.toCurrencyChange}
      />
    );
  }
}

class ExchangeCard extends React.PureComponent {

  render() {
    const { fromValue, fromCurrency, toCurrency, currencies, exchangeAmount } = this.props;
    return (
      <div class="card" style={{width: '25rem'}}>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">{fromValue} {fromCurrency.toUpperCase()} equals</h6>
          <h4 class="card-title">{exchangeAmount} {toCurrency.toUpperCase()}</h4>
          <div>
            <div class="input-group">
              <input class="form-control" value={fromValue} />
              <CurrencyDropdown
                currencies={currencies}
                selected={fromCurrency}
                disabled={toCurrency}
                onChange={fromCurrency => this.props.onFromCurrencyChange(fromCurrency)}
              />
            </div>
            <div class="input-group">
              <input class="form-control" value={exchangeAmount} />
              <CurrencyDropdown
                currencies={currencies}
                selected={toCurrency}
                disabled={fromCurrency}
                onChange={toCurrency => this.props.onToCurrencyChange(toCurrency)}
              />
            </div>
          </div>
          <a href="#" class="card-link">Refresh</a>
          <a href="#" class="card-link pull-right">Remove</a>
        </div>
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
