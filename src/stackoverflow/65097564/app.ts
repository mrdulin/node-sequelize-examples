import { ApolloServer, gql } from 'apollo-server';
import * as models from './model';

const typeDefs = gql`
  type Tag {
    id: ID!
    name: String!
  }

  type Service {
    id: ID!
    name: String!
    slug: String!
    tags: [Tag!]!
  }

  type Query {
    findServicesByTag(tag: String!): [Service]!
  }
`;

const resolvers = {
  Query: {
    async findServicesByTag(_, { tag }, { models }) {
      const res = await models.Service.findAll({
        where: {
          '$tags.name$': tag,
        },
        include: [
          {
            model: models.Tag,
            as: 'tags',
          },
        ],
      });
      const data = res.map((v) => v.get({ plain: true }));
      return data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
