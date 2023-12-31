import { getUniqueObjectArray } from '../../src/helpers/array-helper';

describe('getUniqueObjectArray works as expected', () => {
  test('filters out duplicate objects and preserves order', () => {
    const duplicateObject = { a: 1, b: 2 };
    const startArray = [
      { c: 1 },
      duplicateObject,
      duplicateObject,
      { c: 2 },
      duplicateObject,
    ];
    const expectedResponse = [{ c: 1 }, duplicateObject, { c: 2 }];

    expect(getUniqueObjectArray(startArray)).toEqual(expectedResponse);
  });

  test('distinguishes between different types with the same stringified value', () => {
    const stringValueObject = { a: '1' };
    const numberValueObject = { a: 1 };
    const startArray = [stringValueObject, numberValueObject];
    expect(getUniqueObjectArray(startArray)).toEqual(startArray);
  });

  test('works for empty array', () => {
    expect(getUniqueObjectArray([])).toEqual([]);
  });
});
