const { GraphQLServer } = require('graphql-yoga');

// 3. [Adding a Database](https://www.howtographql.com/graphql-js/4-adding-a-database/)

let links = [
  {
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com'
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (_, {id}) => links.find(i => i.id === id)
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        // New unique ID
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };

      links.push(link);

      return link;
    },
    updateLink: (parent, args) => {
      let link = null;
      let len = links.length;
      // id: ID!, url: String, description: String
      let { id, url, description } = args;
      for (let i = 0; i < len; i++) {
        link = links[i];
        if (link.id === id) {
          Object.assign(link, { url, description });
          break;
        }
      }
      return link;
    },
    deleteLink: (parent, args) => {
      let newLinks = [];
      let link = null;
      let len = links.length;
      // id: ID!
      for (let i = 0; i < len; i++) {
        if (links[i].id === args.id) {
          link = links[i];
        } else {
          newLinks.push(links[i]);
        }
      }
      links = newLinks;
      return link;
    }
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

/**
mutation {
  post(
    url: "www.prisma.io"
    description: "Prisma replaces traditional ORMs"
  ) {
    id
  }
}
*/

/**
Exercise
If you want to practice implementing GraphQL resolvers a bit more,
here’s an optional challenge for you. Based on your current
implementation, extend the GraphQL API with full CRUD functionality
for the Link type. In particular, implement the queries and mutations
that have the following definitions:

type Query {
  # Fetch a single link by its `id`
  link(id: ID!): Link
}

type Mutation {
  # Update a link
  updateLink(id: ID!, url: String, description: String): Link

  # Delete a link
  deleteLink(id: ID!): Link
}
*/

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
