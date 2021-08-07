import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import initialProgress from "./initialProgress";

// make a fake graphql tagged template literal
const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      initialProgress(habitId: ID!, date: String!): Progress
    }
  `,
  resolvers: {
    Mutation: {
      initialProgress,
    },
  },
});
