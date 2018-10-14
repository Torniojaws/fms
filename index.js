const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

// Configure Express
app.use(bodyParser.json());
// Use qs instead of querystring. Default behaviour, but explicit definition is recommended.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());
// The routes must be defined AFTER bodyParser is configured
app.use('/', routes);

module.exports = app.listen(3000, () => console.log('Listening on port 3000'));
