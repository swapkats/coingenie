import types from '../action_types';

export default (from, to, amount) =>
  (dispatch, getState) => {
    fetch(`http://localhost:3001/api/exchange/${from}/${to}?amount=${amount}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: types.FETCH_EXCHANGE_AMOUNT_SUCCESS,
          amount: parseFloat(res.result),
        })
      });
  }
