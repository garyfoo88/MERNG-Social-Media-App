const { ApolloServer } = require("apollo-server");
const connectDB = require("./config/db");
require("dotenv").config({ path: "./config.env" });
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const Post = require("./models/Post");
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT }).then((res) => {
  console.log(`Server running at ${res.url}`);
});
