function constructQuery (filtersArr, options = {}) {
  const result = '';
  const {encodeSeparators = false} = options;

  if (!Array.isArray(filtersArr) || !filtersArr.length) {
    return result;
  }

  return filtersArr.reduce((accum, item, index, arr) => {
    const separator = index !== arr.length - 1 ? '&' : '';
    const {key, value} = item;

    // if (typeof key === 'undefined') throw Error('field "key" doesn\'t exist');
    if (typeof value === 'undefined') throw Error('field "value" doesn\'t exist');

    accum += encodeSeparators
      ? `${key}${encodeWithSeparators(value, separator)}`
      : `${key}=${encodeURIComponent(value)}${separator}`;

    return accum;
  }, result);
}

function constructQueryFromObj (obj = {}, options = {}) {
  const result = '';
  const {encodeSeparators = false} = options;

  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return result;
  }

  return Object.keys(obj).reduce((accum, item, index, arr) => {
    const separator = index !== arr.length - 1 ? '&' : '';
    const value = obj[item];

    accum += encodeSeparators
      ? `${item}${encodeWithSeparators(value, separator)}`
      : `${item}=${encodeURIComponent(value)}${separator}`;

    return accum;
  }, result);
}

function concatQueryStrings (...args) {
  const [queryFirst = '', querySecond = '', ...rest] = args;
  const options = typeof rest[rest.length - 1] === 'object' ? rest.pop() : {};
  const {encodeSeparators = false} = options;
  const joiner = (toEncode, separator) => toEncode ? encodeURIComponent(separator) : separator;

  return [queryFirst, querySecond].concat(rest).filter(item => !!item).join(joiner(encodeSeparators, '&'));
}

function encodeWithSeparators (value, separator) {
  return encodeURIComponent(`=${value}${separator}`);
}

module.exports = {
  constructQueryFromObj,
  constructQuery,
  concatQueryStrings
};
