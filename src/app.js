const express = require("express");
const graphQL = require("express-graphql");
const winston = require("winston");
const schema = require("./schema.js");
const voyagerMiddleware = require("graphql-voyager/middleware").express;

const app = express();

app.use(
  "/graphql",
  graphQL({
    schema,
    graphiql: true,
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path
    })
  })
);

app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));

app.listen(4000, () => {
  winston.info("App Started listening on port 4000");
});
