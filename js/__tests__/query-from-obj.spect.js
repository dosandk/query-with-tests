const constructQueryFromObj = require('../query-from-obj');

describe('Check "constructQueryFromObj" function', () => {
  it('should return empty string if argument is not object', () => {
    expect(constructQueryFromObj(null)).toBe('');
    expect(constructQueryFromObj([])).toBe('');
    expect(constructQueryFromObj(() => {})).toBe('');
  });

  it('should return empty string for empty object', () => {
    expect(constructQueryFromObj({})).toBe('');
  });

  it('should return "query" string' , () => {
    const obj = {
      api: 'some api string',
      pages: 10,
      language: 'en'
    };
    const result = 'api=some%20api%20string&pages=10&language=en';

    expect(constructQueryFromObj(obj)).toBe(result);
  });
});
