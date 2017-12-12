var express = require('express');
var Changelly = require('./lib/changelly');
const app = express();

const changelly = new Changelly('65c406e6db774842b3da8660fa3fe70f', '996e1d2d25090cbcd1fbcd1bac6f4d5ef01ff10a3029a3e046d20c8f5dec13af');

app.set("port", process.env.PORT || 3001);

/* GET users listing. */
app.get('/api/exchange/:from/:to', function(req, res, next) {
  const amount = req.query.amount;
  const { from, to } = req.params;
  if (!amount || isNaN(amount)) {
    error = { message: 'Amount is invalid' };
    res.json(error);
  }
  changelly.getExchangeAmount(from, to, amount, function(err, data) {
    if (err){
      console.log('Error!', err);
      res.json(data);
    } else {
      res.json(data);
      // console.log('getExchangeAmount', data);
    }
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

module.exports = app;
