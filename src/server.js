const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true 
}));

const PORT = process.env.PORT || 9999;
app.listen(PORT);
console.log(`server running at localhost:${PORT}`);