const isArray = (test: any): test is Array<any> => {
  return test instanceof Array;
}

const isObject = (test: any): test is object => {
  return typeof test === 'object';
}


const getKeys = (target: object, source: object): Array<string> => {
  const keyObject = Object
    .keys(target)
    .concat(Object.keys(source))
    .reduce((acc, key) => ({...acc, [key]: true}), {});

  return Object.keys(keyObject);
}

const clone = (object: any) => {
  return JSON.parse(JSON.stringify(object));
}

const mergeObject = (target: object, source: object): object => {
  
  const destination = getKeys(target, source).reduce((dest, key) => {

    const sourceValue = source[key];
    const targetValue = target[key];

    if(sourceValue == null && targetValue == null) {
      return { ...dest, [key]: null };
    }
    
    if(sourceValue == null) {
      return { ...dest, [key]: clone(targetValue) }
    }
      
    if(targetValue == null) {
      return { ...dest, [key]: clone(sourceValue) }
    }

    return { ...dest, [key]: mergeDeep(targetValue, sourceValue) };

  }, {});

  return destination;
}

const mergeArray = (target: Array<any>, source: Array<any>): Array<any> => {
  return target.concat(source).map((element) => {
    return clone(element);
  });
}

const mergeDeep = (target: object | Array<any>, source: object | Array<any>): object | Array<any> => {
  if (isArray(source) && isArray(target)) {
    console.log('Merge Arrays');
    return mergeArray(target, source);
  } else if(isObject(source) && isObject(target)) {
    console.log('Merge Objects');
    return mergeObject(target, source);
  }

  return source;
}


var target = { a: { b: { c: 'test', copy: 'yes' }, copy: true}, copy: true};
var source = { a: { b: { c: 'newvalue' }}};

var merged = mergeDeep(target, source);

console.log(JSON.stringify(merged));