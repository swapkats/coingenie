var express = require('express');
var fetch = require('node-fetch');
var Changelly = require('./lib/changelly');
const app = express();

const changelly = new Changelly('65c406e6db774842b3da8660fa3fe70f', '996e1d2d25090cbcd1fbcd1bac6f4d5ef01ff10a3029a3e046d20c8f5dec13af');

app.set("port", process.env.PORT || 3001);

/* GET users listing. */
app.get('/api/currencies', function(req, res, next) {
  changelly.getCurrencies(function(err, data) {
    if (err){
      console.log('Error!', err);
      res.json(data);
    } else {
      res.json(data);
      // console.log('getExchangeAmount', data);
    }
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/api/changelly/:from/:to', function(req, res, next) {
  const amount = req.query.amount;
  const { from, to } = req.params;
  if (!amount || isNaN(amount)) {
    error = { message: 'Amount is invalid' };
    res.json(error);
  }
  changelly.getMinAmount(from, to, function(err, data) {
    if (err){
      console.log('Error!', err);
      res.json(data);
    } else {
      const minimum = data.result;
      changelly.getExchangeAmount(from, to, amount, function(err, data) {
        if (err){
          console.log('Error!', err);
          res.json(data);
        } else {
          data.minimum = minimum;
          res.json(decorator(data, 'changelly'));
        }
      });
    }
  })

});

app.get('/api/shapeshift/:from/:to', function(req, res, next) {
  const amount = req.query.amount;
  const { from, to } = req.params;
  if (!amount || isNaN(amount)) {
    error = { message: 'Amount is invalid' };
    res.json(error);
  }
  fetch(`http://shapeshift.io/marketinfo/${from}_${to}`)
    .then(res => res.json())
    .then(function(data) {
      data.amount = data.rate * amount - data.minerFee;
      res.json(decorator(data, 'shapeshift'));
    });
});

const decorator = (data, exchange) => {
  switch(exchange) {
    case 'changelly': {
      return {
        amount: parseFloat(data.result),
        minimum: parseFloat(data.minimum),
        maxLimit: null,
        fee: null,
      }
    }
    case 'shapeshift': {
      return {
        amount: data.amount,
        minimum: data.minimum,
        maxLimit: data.maxLimit,
        fee: data.minerFee,
      }
    }
  }
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

module.exports = app;
