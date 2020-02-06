const { GraphQLServer } = require('graphql-yoga');

// @see
//  https://www.howtographql.com/graphql-js/4-adding-a-database/
//  https://www.howtographql.com/graphql-js/5-connecting-server-and-database/

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

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

const server = new GraphQLServer({
  typeDefs: './generated/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
