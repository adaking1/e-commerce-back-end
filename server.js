const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// this syncs the sequelize models to the database before turning it on
sequelize.sync().then(() => {
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
});
