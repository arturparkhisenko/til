const { GraphQLServer } = require('graphql-yoga');

// https://www.howtographql.com/graphql-js/0-introduction/

// 1st example
const typeDefs = `
  type Query {
    info: String!
  }
`;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
};

// type Query {
//   info: String!
// }

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(`Server is running on http://localhost:4000`));
