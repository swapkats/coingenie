import React, { Component } from 'react';
import { connect } from 'react-redux';
import initContext from './actions/initContext';
import onHistoryUpdate from './actions/onHistoryUpdate';
import onRemoveCard from './actions/onRemoveCard';
import ExchangeCard from './components/ExchangeCard';
import './Main.css';

class Main extends Component {
  componentWillMount() {
    this.props.initContext();
  }

  renderLocation = (queryParams) => {
    const { history, currencies, onHistoryUpdate, onRemoveCard } = this.props;
    const historyItem = history[history.length - 1];
    console.log(historyItem);
    return (
      <div style={{paddingTop: '20px'}}>
        <ExchangeCard
          id={history.length}
          from={queryParams[1]}
          to={queryParams[2]}
          value={queryParams[3]}
          exchanges={historyItem.exchanges}
          currencies={currencies}
          onRemoveCard={onRemoveCard}
          onHistoryUpdate={onHistoryUpdate}
          isRouteCard={true}
        />
      </div>
    );
  }

  render() {
    const { history, currencies, onHistoryUpdate, onRemoveCard } = this.props;
    const queryParams = window.location.pathname.split('/');
    if (queryParams.length > 3) {
      return this.renderLocation(queryParams);
    }
    return (
      <div style={{paddingTop: '20px'}}>
        {history.map((item, index) =>
          <ExchangeCard
            key={index}
            id={item.id}
            from={item.from}
            to={item.to}
            value={item.value}
            exchanges={item.exchanges}
            currencies={currencies}
            onRemoveCard={onRemoveCard}
            onHistoryUpdate={onHistoryUpdate}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies,
  history: state.history,
})

export default connect(mapStateToProps, { initContext, onHistoryUpdate, onRemoveCard })(Main);
