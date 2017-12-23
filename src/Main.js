import React, { Component } from 'react';
import { connect } from 'react-redux';
import initContext from './actions/initContext';
import onHistoryUpdate from './actions/onHistoryUpdate';
import ExchangeCard from './components/ExchangeCard';
import './Main.css';

class Main extends Component {
  componentWillMount() {
    this.props.initContext();
  }

  render() {
    const { history, currencies, onHistoryUpdate } = this.props;
    return (
      <div>
        {history.sort((a, b) => a.id < b.id).map(item =>
          <ExchangeCard
            key={item.id}
            id={item.id}
            from={item.from}
            to={item.to}
            value={item.value}
            exchanges={item.exchanges}
            currencies={currencies}
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

export default connect(mapStateToProps, { initContext, onHistoryUpdate })(Main);
