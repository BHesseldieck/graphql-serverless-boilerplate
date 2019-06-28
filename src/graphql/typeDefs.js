import { gql } from 'apollo-server-lambda';
import Base from './baseSchema';
import Article from './articles/schema';
import User from './users/schema';
import Image from './images/schema';

/**
 * Merging all Schemas into one.
 * @exports {schema} one merged schema.
 */

const typeDefs = gql`
${Base}
${Article}
${User}
${Image}
`;

export default typeDefs;
