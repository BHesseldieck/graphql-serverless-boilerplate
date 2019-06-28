/**
 * Basis for schemas.
 * @exports {string} base schema that provides scalars.
 */

const Base = `
type Query {
    env: String
}
scalar JSON
scalar URL
scalar EmailAddress
scalar PhoneNumber
scalar Date
`;

export default Base;
