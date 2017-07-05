const mockedData = require('../data.mock');
const {constructQuery, constructQueryFromObj, concatQueryStrings} = require('../query');

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

  it('should return "query" string with encoded values and separators' , () => {
    const filtersList = [sectorFilter1, sectorFilter2];
    const result = 'gicsSector%3DCASH%26gicsIndustryGroup%3DMoney%20category';
    const options = {encodeSeparators: true};

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

  it('should return "query" string with encoded values' , () => {
    const obj = {
      api: 'some (api) string',
      pages: 10,
      language: '*en'
    };
    const options = {encodeSeparators: true};
    const result = 'api%3Dsome%20(api)%20string%26pages%3D10%26language%3D*en';

    expect(constructQueryFromObj(obj, options)).toBe(result);
  });
});

describe('Check "concatQueryStrings" function', function () {
  const queryString1 = 'GICSSector=20&GICSIndustryGroup=2020';
  const queryString2 = 'currency=USD';
  const queryString3 = 'country=US';
  const queryString4 = 'country=CA';

  it('Should return first query-string if second query-string not passed', function () {
    expect(concatQueryStrings(queryString1)).toBe(queryString1);
  });

  it('Should return second query-string if first query-string not passed', function () {
    const undef = a => a;

    expect(concatQueryStrings(undef(), queryString2)).toBe(queryString2);
  });

  it('Should return empty string if arguments not passed', function () {
    expect(concatQueryStrings()).toBe('');
  });

  it('Should return concatenated query-string from two query-strings', function () {
    const result = `${queryString1}&${queryString2}`;

    expect(concatQueryStrings(queryString1, queryString2)).toBe(result);
  });

  it('Should return concatenated query-string from any count of query-strings', function () {
    const result = `${queryString1}&${queryString2}&${queryString3}&${queryString4}`;

    expect(concatQueryStrings(queryString1, queryString2, queryString3, queryString4)).toBe(result);
  });

  it('Should return concatenated query-string from any count of query-strings with encoded separator', function () {
    const separator = encodeURIComponent('&');
    const result = `${queryString1}${separator}${queryString2}${separator}${queryString3}${separator}${queryString4}`;

    expect(concatQueryStrings(queryString1, queryString2, queryString3, queryString4, {encodeSeparators: true})).toBe(result);
  });

  it('Should return concatenated query-string without encoded separator by default', function () {
    const result = `${queryString1}&${queryString2}`;

    expect(concatQueryStrings(queryString1, queryString2)).toBe(result);
  });

  it('Should return concatenated query-string with encoded separator', function () {
    const result = `${queryString1}${encodeURIComponent('&')}${queryString2}`;

    expect(concatQueryStrings(queryString1, queryString2, {encodeSeparators: true})).toBe(result);
  });
})
