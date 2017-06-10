function constructQuery(arr) {
  let result = '';

  if (!Array.isArray(arr) || !arr.length) {
    return result;
  }

  return arr.reduce((accum, item, index, arr) => {
    const separator = index !== arr.length - 1 ? '&' : '';
    const {queryKey, value} = item;

    if (typeof queryKey === 'undefined') throw Error(`filed "queryKey" doesn\`t exist`);
    if (typeof value === 'undefined') throw Error(`filed "value" doesn\`t exist`);

    accum += `${item.queryKey}=${encodeURIComponent(item.value)}${separator}`;

    return accum;
  }, result)
}

module.exports = constructQuery;
