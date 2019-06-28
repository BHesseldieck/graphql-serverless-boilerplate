/**
 * @jest-environment node
 */
import { mapToIds1to1, mapToIds1toMany } from '../../loaders/helpers';

describe('Test loader\'s "mapToIds1to1" helper function', () => {
  test('id-ordered array with the same length should be returned', () => {
    // arrange
    const ids = [2, 1, 3];
    const response = [{ id: 1, check: 'one' }, { id: 3, check: 'three' }, { id: 2, check: 'two' }];
    // act
    const result = mapToIds1to1(ids, response);
    // assert
    expect(result).toHaveLength(3);
    expect(result[0].check).toBe('two');
    expect(result[0].id).toBe(2);
    expect(result[1].check).toBe('one');
    expect(result[1].id).toBe(1);
    expect(result[2].check).toBe('three');
    expect(result[2].id).toBe(3);
  });

  test('should map against provided property', () => {
    const ids = [1, 2, 3];
    const response = [{ story_id: 2, check: 'two' }, { story_id: 1, check: 'one' }, { story_id: 3, check: 'three' }];
    const result = mapToIds1to1(ids, response, 'story_id');
    expect(result).toHaveLength(3);
    expect(result[0].check).toBe('one');
    expect(result[0].story_id).toBe(1);
    expect(result[1].check).toBe('two');
    expect(result[1].story_id).toBe(2);
    expect(result[2].check).toBe('three');
    expect(result[2].story_id).toBe(3);
  });

  test('if no result matches id, element at index should be null', () => {
    const ids = [1, 2, 3, 4];
    const response = [{ id: 3, check: 'three' }, { id: 1, check: 'one' }, { id: 4, check: 'four' }];
    const result = mapToIds1to1(ids, response);
    expect(result).toHaveLength(4);
    expect(result[0].check).toBe('one');
    expect(result[0].id).toBe(1);
    expect(result[1]).toBeUndefined();
    expect(result[2].check).toBe('three');
    expect(result[2].id).toBe(3);
    expect(result[3].check).toBe('four');
    expect(result[3].id).toBe(4);
  });

  test('if result is empty return array with null-elements', () => {
    const ids = [1, 2, 3, 4];
    const response = [];
    const result = mapToIds1to1(ids, response);
    expect(result).toHaveLength(4);
    expect(result[0]).toBeUndefined();
    expect(result[1]).toBeUndefined();
    expect(result[2]).toBeUndefined();
    expect(result[3]).toBeUndefined();
  });

  test('if ids is empty return empty array', () => {
    const ids = [];
    const response = [{ id: 3, check: 'three' }, { id: 2, check: 'two' }, { id: 1, check: 'one' }, { id: 4, check: 'four' }];
    const result = mapToIds1to1(ids, response);
    expect(result).toHaveLength(0);
    expect(result).not.toBeUndefined();
  });

  test('if property does not exist on response return array with null-elements', () => {
    const ids = [1, 2, 3, 4];
    const response = [{ id: 3, check: 'three' }, { id: 2, check: 'two' }, { id: 1, check: 'one' }, { id: 4, check: 'four' }];
    const result = mapToIds1to1(ids, response, 'story_id');
    expect(result).toHaveLength(4);
    expect(result[0]).toBeUndefined();
    expect(result[1]).toBeUndefined();
    expect(result[2]).toBeUndefined();
    expect(result[3]).toBeUndefined();
  });

  test('if response has wrong type, return array with null-elements', () => {
    const ids = [1, 2, 3];
    const response = { a: { id: 3, check: 'three' }, id: { id: 1, check: 'one' }, 0: { id: 2, check: 'four' } };
    const result = mapToIds1to1(ids, response, 'story_id');
    expect(result).toHaveLength(3);
    expect(result[0]).toBeUndefined();
    expect(result[1]).toBeUndefined();
    expect(result[2]).toBeUndefined();
  });
});

describe('Test loader\'s "mapToIds1toMany" helper function', () => {
  test('id-ordered array with the same length should be returned, elements should be array of the items', () => {
    const ids = [2, 1, 3];
    const response = [{ id: 1, check: 'one 0' }, { id: 3, check: 'three0' }, { id: 2, check: 'two 0' }, { id: 3, check: 'three 1' }, { id: 2, check: 'two 1' }, { id: 2, check: 'two 2' }];
    const result = mapToIds1toMany(ids, response);
    expect(result).toHaveLength(3);

    expect(Array.isArray(result[0])).toBe(true);
    expect(result[0]).toHaveLength(3);
    expect(result[0][0].id).toBe(2);
    expect(result[0][1].id).toBe(2);
    expect(result[0][2].id).toBe(2);
    expect(result[0]).toEqual(expect.arrayContaining([{ id: 2, check: 'two 0' }, { id: 2, check: 'two 1' }, { id: 2, check: 'two 2' }]));

    expect(Array.isArray(result[1])).toBe(true);
    expect(result[1]).toHaveLength(1);
    expect(result[1][0].id).toBe(1);
    expect(result[1]).toEqual(expect.arrayContaining([{ id: 1, check: 'one 0' }]));

    expect(Array.isArray(result[2])).toBe(true);
    expect(result[2]).toHaveLength(2);
    expect(result[2][0].id).toBe(3);
    expect(result[2][1].id).toBe(3);
    expect(result[2]).toEqual(expect.arrayContaining([{ id: 3, check: 'three0' }, { id: 3, check: 'three 1' }]));
  });

  test('should map against provided property', () => {
    const ids = [1, 2, 3];
    const response = [{ story_id: 1, check: 'one 0' }, { story_id: 3, check: 'three0' }, { story_id: 2, check: 'two 0' }, { story_id: 3, check: 'three 1' }, { story_id: 2, check: 'two 1' }, { story_id: 2, check: 'two 2' }];
    const result = mapToIds1toMany(ids, response, 'story_id');
    expect(result).toHaveLength(3);

    expect(Array.isArray(result[0])).toBe(true);
    expect(result[0]).toHaveLength(1);
    expect(result[0][0].story_id).toBe(1);
    expect(result[0]).toEqual(expect.arrayContaining([{ story_id: 1, check: 'one 0' }]));

    expect(Array.isArray(result[1])).toBe(true);
    expect(result[1]).toHaveLength(3);
    expect(result[1][0].story_id).toBe(2);
    expect(result[1][1].story_id).toBe(2);
    expect(result[1][2].story_id).toBe(2);
    expect(result[1]).toEqual(expect.arrayContaining([{ story_id: 2, check: 'two 0' }, { story_id: 2, check: 'two 1' }, { story_id: 2, check: 'two 2' }]));

    expect(Array.isArray(result[2])).toBe(true);
    expect(result[2]).toHaveLength(2);
    expect(result[2][0].story_id).toBe(3);
    expect(result[2][1].story_id).toBe(3);
    expect(result[2]).toEqual(expect.arrayContaining([{ story_id: 3, check: 'three0' }, { story_id: 3, check: 'three 1' }]));
  });

  test('if no result matches id, element at index should be null', () => {
    const ids = [1, 2, 3, 4];
    const response = [{ story_id: 1, check: 'one 0' }, { story_id: 3, check: 'three0' }, { story_id: 4, check: 'four 0' }, { story_id: 3, check: 'three 1' }, { story_id: 4, check: 'four 1' }, { story_id: 4, check: 'four 2' }];
    const result = mapToIds1toMany(ids, response, 'story_id');
    expect(result).toHaveLength(4);

    expect(Array.isArray(result[0])).toBe(true);
    expect(result[0]).toHaveLength(1);
    expect(result[0][0].story_id).toBe(1);
    expect(result[0]).toEqual(expect.arrayContaining([{ story_id: 1, check: 'one 0' }]));

    expect(Array.isArray(result[1])).toBe(false);
    expect(result[1]).toBeUndefined();

    expect(Array.isArray(result[2])).toBe(true);
    expect(result[2]).toHaveLength(2);
    expect(result[2][0].story_id).toBe(3);
    expect(result[2][1].story_id).toBe(3);
    expect(result[2]).toEqual(expect.arrayContaining([{ story_id: 3, check: 'three0' }, { story_id: 3, check: 'three 1' }]));

    expect(Array.isArray(result[3])).toBe(true);
    expect(result[3]).toHaveLength(3);
    expect(result[3][0].story_id).toBe(4);
    expect(result[3][1].story_id).toBe(4);
    expect(result[3][2].story_id).toBe(4);
    expect(result[3]).toEqual(expect.arrayContaining([{ story_id: 4, check: 'four 0' }, { story_id: 4, check: 'four 1' }, { story_id: 4, check: 'four 2' }]));
  });

  test('if result is empty return array with null-elements', () => {
    const ids = [1, 2, 3, 4];
    const response = [];
    const result = mapToIds1toMany(ids, response);
    expect(result).toHaveLength(4);
    expect(result[0]).toBeUndefined();
    expect(result[1]).toBeUndefined();
    expect(result[2]).toBeUndefined();
    expect(result[3]).toBeUndefined();
  });

  test('if ids is empty return empty array', () => {
    const ids = [];
    const response = [{ id: 1, check: 'one 0' }, { id: 3, check: 'three0' }, { id: 2, check: 'two 0' }, { id: 3, check: 'three 1' }, { id: 2, check: 'two 1' }, { id: 2, check: 'two 2' }];
    const result = mapToIds1toMany(ids, response);
    expect(result).not.toBeUndefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
    expect(result[0]).toBeUndefined();
  });

  test('if property does not exist on response return array with null-elements', () => {
    const ids = [1, 2, 3];
    const response = [{ id: 1, check: 'one 0' }, { id: 3, check: 'three0' }, { id: 2, check: 'two 0' }, { id: 3, check: 'three 1' }, { id: 2, check: 'two 1' }, { id: 2, check: 'two 2' }];
    const result = mapToIds1toMany(ids, response, 'story_id');
    expect(result).toHaveLength(3);
    expect(result[0]).toBeUndefined();
    expect(result[1]).toBeUndefined();
    expect(result[2]).toBeUndefined();
  });

  test('if response has wrong type, return array with null-elements', () => {
    const ids = [1, 2, 3];
    const response = { a: { id: 3, check: 'three' }, id: { id: 1, check: 'one' }, 0: { id: 2, check: 'four' } };
    const result = mapToIds1toMany(ids, response, 'story_id');
    expect(result).toHaveLength(3);
    expect(result[0]).toBeUndefined();
    expect(result[1]).toBeUndefined();
    expect(result[2]).toBeUndefined();
  });
});
