/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
import schema from './graphql/';
require('dotenv').config();

console.log(">>>"+process.env.GRAPHQL_URL);
var logger = function(req, res, next) {
  debugger;
  console.log("GOT REQUEST >", req.url);
  next(); // Passing the request to the next handler in the stack.
}

const DB = process.env.MONGO_DB_KEY;
const PORT = process.env.PORT || 4001;
const app = express();

mongoose
  .connect(
    DB, {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(logger);

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: true,
}))

app.listen(4001, () => {
  console.log('Server is running on PORT:%s', PORT)
});