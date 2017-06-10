const mockedData = require('../data.mock');
const constructQuery = require('../query');

const {
  sectorFilter1,
  sectorFilter2,
  currencyFilter1,
  currencyFilter2,
  countryFilter1,
  countryFilter2,
  filterWithInvalidValue,
  filterWithInvalidQueryKey
} = mockedData;

describe('Check "getQuery function', () => {
  it('should return empty string if argument is not array', () => {
    expect(constructQuery({})).toBe('');
  });

  it('should return empty string if array has a length === 0', () => {
    expect(constructQuery([])).toBe('');
  });

  it('should throw error if "queryKey"  field doesn\'t exist' , () => {
    const filtersList = [sectorFilter1, sectorFilter2, filterWithInvalidQueryKey];
    const result = `filed "queryKey" doesn\`t exist`;

    expect(() => constructQuery(filtersList)).toThrowError(result);
  });

  it('should throw error if "value" filed doesn\'t exist' , () => {
    const filtersList = [sectorFilter1, sectorFilter2, filterWithInvalidValue];
    const result = `filed "value" doesn\`t exist`;

    expect(() => constructQuery(filtersList)).toThrowError(result);
  });

  it('should return "query" string' , () => {
    const filtersList = [sectorFilter1, sectorFilter2, currencyFilter1, currencyFilter2, countryFilter1, countryFilter2];
    const result = 'gicsSector=CASH&gicsIndustryGroup=Money&currency=USD&currency=CAD&country=USA&country=CA';

    expect(constructQuery(filtersList)).toBe(result);
  });
});
