/**
 * @jest-environment node
 */
import supertest from 'supertest';
import userFixtures from '../../helpers/users/fixtures';
import imageFixtures from '../../helpers/images/fixtures';
import fragments from '../../helpers/fragments/fragments';
import { testUrl } from '../constants';

/**
 * Fragments help with query building.
 * Fixtures are helping with the verification of the response.
 */

const { userFragment } = fragments;
const { userStruct } = userFixtures.actuals;
const { imageStruct } = imageFixtures.actuals;

// to run integration tests this way you need to have the lambda running locally
const request = supertest.agent(testUrl);

jest.setTimeout(30000); // 30 second timeout

describe('Users API', () => {
  test('get all Users', (done) => {
    const query = {
      query: `
        query {
          allUsers {
            ${userFragment}
          }
        }
      `,
    };

    request.post('/graphql')
      .set('Accept', 'application/json')
      .send(query)
      .then((res) => {
        expect(res.body.data.users.length).toBeGreaterThan(1);
        expect(res.body.errors).toBeUndefined();
        res.body.data.users.forEach((user) => {
          expect(Object.keys(user))
            .toEqual(expect.arrayContaining(Object.keys(userStruct)));
          expect(Array.isArray(user.image)).toBeDefined();
          expect(Object.keys(user.image))
            .toEqual(expect.arrayContaining(Object.keys(imageStruct)));
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
