const sectorFilter1 = {
  queryKey: 'gicsSector',
  value: 'CASH'
};
const sectorFilter2 = {
  queryKey: 'gicsIndustryGroup',
  value: 'Money category'
};
const currencyFilter1 = {
  queryKey: 'currency',
  value: 'USD'
};
const currencyFilter2 = {
  queryKey: 'currency',
  value: 'CAD'
};
const countryFilter1 = {
  queryKey: 'country',
  value: 'USA'
};
const countryFilter2 = {
  queryKey: 'country',
  value: 'CA'
};
const filterWithInvalidValue = {
  queryKey: 'country',
};
const filterWithInvalidQueryKey = {
  value: 'CA',
};

module.exports = {
  sectorFilter1,
  sectorFilter2,
  currencyFilter1,
  currencyFilter2,
  countryFilter1,
  countryFilter2,
  filterWithInvalidValue,
  filterWithInvalidQueryKey
};
