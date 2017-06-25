function constructQuery (filtersArr) {
  const result = '';

  if (!Array.isArray(filtersArr) || !filtersArr.length) {
    return result;
  }

  return filtersArr.reduce((accum, item, index, arr) => {
    const separator = index !== arr.length - 1 ? '&' : '';
    const {key, value} = item;

    if (typeof key === 'undefined') throw Error('field "key" doesn\'t exist');
    if (typeof value === 'undefined') throw Error('field "value" doesn\'t exist');

    accum += `${item.key}=${encodeURIComponent(item.value)}${separator}`;

    return accum;
  }, result);
}

module.exports = constructQuery;

