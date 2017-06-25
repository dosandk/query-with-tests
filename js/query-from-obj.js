function constructQueryFromObj (obj = {}) {
  const result = '';

  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return result;
  }

  return Object.keys(obj).reduce((accum, item, index, arr) => {
    const separator = index !== arr.length - 1 ? '&' : '';
    const value = obj[item];

    accum += `${item}=${encodeURIComponent(value)}${separator}`;

    return accum;
  }, result);
}

module.exports = constructQueryFromObj;

