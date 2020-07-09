const express = require('express');
const home = require('./route/home');
const heroes = require('./route/heroes');
const authenticator = require('./middleware/authenticator');
const logger = require('./middleware/logger');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(authenticator);
app.use(logger);
app.use('/', home);
app.use('/api/heroes', heroes);

app.listen(PORT, () => {
    console.log("Listning on Port : " + PORT);
});