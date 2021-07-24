const { ApolloServer } = require("apollo-server");
const { PubSub } = require('graphql-subscriptions');
const connectDB = require("./config/db");
require("dotenv").config({ path: "./config.env" });
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const Post = require("./models/Post");
//Connect to mongoDB
connectDB();

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

server.listen({ port: process.env.PORT }).then((res) => {
  console.log(`Server running at ${res.url}`);
});
