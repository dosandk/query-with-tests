function constructQuery (filtersArr, options = {}) {
  const result = '';

  if (!Array.isArray(filtersArr) || !filtersArr.length) {
    return result;
  }

  return filtersArr.reduce((accum, item, index, arr) => {
    const separator = index !== arr.length - 1 ? '&' : '';
    const {key, value} = item;

    if (typeof key === 'undefined') throw Error('field "key" doesn\'t exist');
    if (typeof value === 'undefined') throw Error('field "value" doesn\'t exist');

    accum += `${item.key}=${encode(item.value, options)}${separator}`;

    return accum;
  }, result);
}

function constructQueryFromObj (obj = {}, options = {}) {
  const result = '';

  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return result;
  }

  return Object.keys(obj).reduce((accum, item, index, arr) => {
    const separator = index !== arr.length - 1 ? '&' : '';
    const value = obj[item];

    accum += `${item}=${encode(value, options)}${separator}`;

    return accum;
  }, result);
}

function encode(str, options) {
  return options.strict ? strictEncodeURIComponent(str) : encodeURIComponent(str);
}

function strictEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g,
    char => '%' + char.charCodeAt(0).toString(16).toUpperCase()
  )
}

module.exports = {
  constructQueryFromObj,
  constructQuery
};
