import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import './style.css';

class ExchangeCard extends React.PureComponent {
  componentWillMount() {
    const { id, from, to, value } = this.props;
    this.props.onHistoryUpdate(id, from, to, value);
  }

  onFromChange = from => {
    const { id, to, value } = this.props;
    this.props.onHistoryUpdate(id, from, to, value);
  }

  onToChange = to => {
    const { id, from, value } = this.props;
    this.props.onHistoryUpdate(id, from, to, value);
  }

  onValueChange = e => {
    const { id, from, to } = this.props;
    setTimeout(
      this.props.onHistoryUpdate(id, from, to, e.target.value),
      5000,
    );
  }

  render() {
    const { value, from, to, currencies, exchange } = this.props;
    let amount = exchange.changelly || '';
    return (
      <div className="card ex__card">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">{value} {from.toUpperCase()} = {exchange.changelly || ''} {to.toUpperCase()}</h6>
          {/* <h4 className="card-title">{value} {from.toUpperCase()} = {exchange.changelly || ''} {to.toUpperCase()}</h4> */}
          <div>
            <div className="input-group ex__group">
              <DebounceInput
                className="form-control ex__input"
                value={value}
                onChange={this.onValueChange}
                debounceTimeout={500}
              />
              <CurrencyDropdown
                currencies={currencies}
                selected={from}
                disabled={to}
                onChange={from => this.onFromChange(from)}
              />
            </div>
            <div style={{height: '5px'}} />
            <div className="input-group ex__group">
              <input className="form-control ex__input" value={amount} onChange={e => this.onToValueChange(e.target.value)} />
              <CurrencyDropdown
                currencies={currencies}
                selected={to}
                disabled={from}
                onChange={to => this.onToChange(to)}
              />
            </div>
          </div>
          {/* <button href="#" className="card-link">Refresh</button>
          <button href="#" className="card-link pull-right">Remove</button> */}
        </div>
      </div>
    );
  }
}

const CurrencyDropdown = props => (
  <select value={props.selected} onChange={e => {
    e.preventDefault();
    props.onChange(e.target.value);
    return false;
  }}>
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

export default ExchangeCard;
