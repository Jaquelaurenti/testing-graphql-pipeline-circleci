const express = require("express");
const graphqlHTTP= require("express-graphql");
const schema = require("./schema/index");
const resolvers = require("./resolvers/index");
const { startDatabase } = require("./database/index");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;

const context = async () => {
  const db = await startDatabase();

  return { db };
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    context,
  })
);

//Graphql Playground route
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

module.exports = app;
