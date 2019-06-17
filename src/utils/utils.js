export function isObject(value) {
  const type = typeof value
  return (
    value != null &&
    (type === 'object' || type === 'function') &&
    !isArray(value)
  )
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
    (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
      isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}