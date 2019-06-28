/**
 * @jest-environment node
 */
import globalFixtures from '../../helpers/fixtures';
import { User as Resolver } from '../../../graphql/users/resolvers';

const { context } = globalFixtures.setup;

/**
 * Testing the User resolver through calling the resolver functions directly.
 */

describe('Test User resolver', () => {
  test('get first name', () => {
    const givenObj = {
      first_name: 'Karl-Heinz',
    };
    const result = Resolver.firstName(givenObj, undefined, context);
    expect(result).toBe('Karl-Heinz');
  });

  test('get last name', () => {
    const givenObj = {
      last_name: 'Brutzelpfanne',
    };
    const result = Resolver.lastName(givenObj, undefined, context);
    expect(result).toBe('Brutzelpfanne');
  });

  test('get full name', () => {
    const givenObj = {
      first_name: 'Peter',
      last_name: 'Lustig',
    };
    const result = Resolver.fullName(givenObj, undefined, context);
    expect(result).toBe('Peter Lustig');
  });
});
