const activeFilters = [
  {
    "key": "gicsSector",
    "value": "25",
    "parent": "",
    "label": "Consumer Discretionary"
  },
  {
    "key": "gicsSector",
    "value": "10",
    "parent": "",
    "label": "Energy"
  }
];

const queryString = 'gicsSector=25&gicsSector=10&gicsIndustryGroup=2020&currency=USD&currency=CAD&country=USA&country=CA';

function clearQueryString (string, activeFilters) {
  if (!activeFilters.length || !string.length) return string;

  const separator = '&';
  const queryArr = string.split(separator);
  const activeFiltersQueryString = constructQueryString(activeFilters);
  const activeFiltersQueryArr = activeFiltersQueryString.split(separator);
  const queryArrCleared = queryArr.filter(item => activeFiltersQueryArr.indexOf(item) < 0);

  const obj = queryArrCleared.map(item => {
    const [key, value] = item.split('=');

    return {key, value};
  });

  return constructQueryString(obj);
}
