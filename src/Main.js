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

  render() {
    console.log('MAIN');
    const { history, currencies, onHistoryUpdate, onRemoveCard } = this.props;
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
