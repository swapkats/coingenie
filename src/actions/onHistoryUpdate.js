import types from '../action_types';

export default (id, from, to, value) =>
  (dispatch, getState) => {
    const { history } = getState();
    const item = history.find(item => item.id === id);
    if (item.from !== from || item.to !== to) {
      dispatch(addNewHistoryItem(history.length, from, to, value, {}));
      return;
    }
    const exchanges = ['changelly'];
    exchanges.forEach(exchange => {
      dispatch(fetchExchangeAmount(id, from, to, value, exchange));
    })
  }

const addNewHistoryItem = (id, from, to, value, exchange = {}) =>
  (dispatch, getState) => {
    const { history } = getState();
    console.log({ id, from, to, value, exchange })
    history.push({ id, from, to, value, exchange });
    dispatch({
      type: types.UPDATE_HISTORY,
      history
    })
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
          item.exchange = Object.assign({}, item.exchange, {
            [`${exchange}`]: parseFloat(res.result)
          });
          dispatch({
            type: types.UPDATE_HISTORY,
            history
          });
        });
    }
