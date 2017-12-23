import types from '../action_types';

export default (id, from, to, value) =>
  (dispatch, getState) => {
    const { history } = getState();
    const item = history.find(item => item.id === id);
    if (item.from !== from || item.to !== to) {
      dispatch(addNewHistoryItem(history.length, from, to, value, []));
      return;
    }
    const exchanges = ['changelly', 'shapeshift'];
    exchanges.forEach(exchange => {
      dispatch(fetchExchangeAmount(id, from, to, value, exchange));
    })
  }

const addNewHistoryItem = (id, from, to, value, exchanges = []) =>
  (dispatch, getState) => {
    const { history } = getState();
    history.push({ id, from, to, value, exchanges });
    dispatch({
      type: types.ADD_HISTORY_ITEM,
      history
    });
    document.body.scrollTop = 0;
  }

const fetchExchangeAmount = (id, from, to, value, exchange) =>
    (dispatch, getState) => {
      fetch(`http://localhost:3001/api/${exchange}/${from}/${to}?amount=${value}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then(res => res.json())
        .then(res => {
          const { history } = getState();
          const item = history.find(item => item.id === id);
          item.from = from;
          item.to = to;
          item.value = value;
          res.exchange = exchange;
          const exchanges = item.exchanges.map(exchange => exchange.exchange);
          if (exchanges.includes(exchange)) {
            item.exchanges.map(item => {
              if (item.exchange === exchange) {
                return res;
              }
              return item;
            });
          } else {
            item.exchanges.push(res);
          }
          dispatch({
            type: types.UPDATE_EXCHANGE_AMOUNT,
            history
          });
        });
    }
