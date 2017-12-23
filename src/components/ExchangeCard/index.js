import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import './style.css';

class ExchangeCard extends React.Component {
  componentWillMount() {
    const { id, from, to, value } = this.props;
    this.props.onHistoryUpdate(id, from, to, value);
  }

  onFromChange = from => {
    const { id, to, value, isRouteCard } = this.props;
    this.props.onHistoryUpdate(id, from, to, value, isRouteCard);
  }

  onRefresh = () => {
    const { id, from, to, value } = this.props;
    this.props.onHistoryUpdate(id, from, to, value);
  }

  onToChange = to => {
    const { id, from, value, isRouteCard } = this.props;
    this.props.onHistoryUpdate(id, from, to, value, isRouteCard);
  }

  onValueChange = e => {
    const { id, from, to, isRouteCard } = this.props;
    setTimeout(
      this.props.onHistoryUpdate(id, from, to, e.target.value, isRouteCard),
      2000,
    );
  }

  render() {
    const { id, value, from, to, currencies, exchanges } = this.props;
    let amount =  0;
    exchanges.map(exchange => {
      amount = Math.max(exchange.amount, parseFloat(amount));
    })
    return (
      <div className="card ex__card">
        <div className="card-body">
          <div className="ex__body">
            <div className="ex__left">
              <a href={`/${from}/${to}/${value}`} className="ex__link">{value} {from.toUpperCase()} = {amount || ''} {to.toUpperCase()}</a>
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
              <div className="ex__btnWrap">
                <button onClick={() => this.props.onRemoveCard(id)} className="ex__button card-link pull-right">Remove</button>
                <button onClick={this.onRefresh} className="ex__button card-link">Refresh</button>
              </div>
            </div>
            <div className="ex__tableWrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col" className="text-muted">Minimum</th>
                    <th scope="col" className="text-muted">Limit</th>
                    <th scope="col" className="text-muted">Exchange Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {exchanges.map(exchange => (
                      <tr key={exchange.exchange}>
                        <td>{exchange.exchange}</td>
                        <td style={{textAlign: 'right'}}>{exchange.minimum}</td>
                        <td style={{textAlign: 'right'}}>{exchange.maxLimit || 'NA'}</td>
                        <td style={{textAlign: 'right'}}>{exchange.amount}</td>
                      </tr>
                    ))}
                  <tr>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
