const sectorFilter1 = {
  key: 'gicsSector',
  value: 'CASH'
};
const sectorFilter2 = {
  key: 'gicsIndustryGroup',
  value: 'Money category'
};
const currencyFilter1 = {
  key: 'currency',
  value: 'USD'
};
const currencyFilter2 = {
  key: 'currency',
  value: 'CAD'
};
const countryFilter1 = {
  key: 'country',
  value: 'USA'
};
const countryFilter2 = {
  key: 'country',
  value: 'CA'
};
const filterWithInvalidValue = {
  key: 'country',
};
const filterWithInvalidQueryKey = {
  value: 'CA',
};
const filterWithSpecialChars = {
  key: 'country!',
  value: '*CA*'
};

module.exports = {
  sectorFilter1,
  sectorFilter2,
  currencyFilter1,
  currencyFilter2,
  countryFilter1,
  countryFilter2,
  filterWithInvalidValue,
  filterWithInvalidQueryKey,
  filterWithSpecialChars
};
