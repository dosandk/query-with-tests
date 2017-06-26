const mockedData = require('../data.mock');
const {constructQuery, constructQueryFromObj} = require('../query');

const {
  sectorFilter1,
  sectorFilter2,
  currencyFilter1,
  currencyFilter2,
  countryFilter1,
  countryFilter2,
  filterWithInvalidValue,
  filterWithInvalidQueryKey,
  filterWithSpecialChars
} = mockedData;

describe('Check "constructQuery" function', () => {
  it('should return empty string if argument is not array', () => {
    expect(constructQuery({})).toBe('');
  });

  it('should return empty string if array has a length === 0', () => {
    expect(constructQuery([])).toBe('');
  });

  it('should throw error if "key" field doesn\'t exist' , () => {
    const filtersList = [sectorFilter1, sectorFilter2, filterWithInvalidQueryKey];
    const result = 'field "key" doesn\'t exist';

    expect(() => constructQuery(filtersList)).toThrowError(result);
  });

  it('should throw error if "value" filed doesn\'t exist' , () => {
    const filtersList = [sectorFilter1, sectorFilter2, filterWithInvalidValue];
    const result = 'field "value" doesn\'t exist';

    expect(() => constructQuery(filtersList)).toThrowError(result);
  });

  it('should return "query" string' , () => {
    const filtersList = [sectorFilter1, sectorFilter2, currencyFilter1, currencyFilter2, countryFilter1, countryFilter2];
    const result = 'gicsSector=CASH&gicsIndustryGroup=Money%20category&currency=USD&currency=CAD&country=USA&country=CA';

    expect(constructQuery(filtersList)).toBe(result);
  });

  it('should return "query" string with encoded values' , () => {
    const filtersList = [sectorFilter1, sectorFilter2];
    const result = 'gicsSector=CASH&gicsIndustryGroup=Money%20category';

    expect(constructQuery(filtersList)).toBe(result);
  });

  it('should return "query" string with strict encoded values' , () => {
    const filtersList = [sectorFilter1, sectorFilter2, filterWithSpecialChars];
    const result = 'gicsSector=CASH&gicsIndustryGroup=Money%20category&country!=%2ACA%2A';
    const options = {strict: true};

    expect(constructQuery(filtersList, options)).toBe(result);
  });
});

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

  it('should return "query" string with strict encoded values' , () => {
    const obj = {
      api: 'some (api) string',
      pages: 10,
      language: '*en'
    };
    const options = {strict: true};
    const result = 'api=some%20%28api%29%20string&pages=10&language=%2Aen';

    expect(constructQueryFromObj(obj, options)).toBe(result);
  });
});
