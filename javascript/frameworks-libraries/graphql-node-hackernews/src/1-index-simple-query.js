const { GraphQLServer } = require('graphql-yoga');

// https://www.howtographql.com/graphql-js/0-introduction/

// 2d example
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

let links = [
  {
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com'
  }
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

/**  
query {
  feed {
    id
    url
    description
  }
}
*/

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(`Server is running on http://localhost:4000`));
