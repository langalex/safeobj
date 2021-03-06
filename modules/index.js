const isObject = obj => typeof obj === 'object'
const hasKey = (obj, key) => key in obj
const isNullOrUndefined = obj => obj === null || obj === undefined

export const Undefined = new Proxy({}, {
  get: function(target, name){
      return Undefined;
  }
})

export const either = (val,fallback) => (val === Undefined? fallback : val)

const returnPropertyOnObject = (target, name) =>
  isObject(target[name])
    ? safe(target[name])
    : target[name]

function safe (obj) {
  return new Proxy(obj, {
    get: (target, name) =>
      hasKey(target, name) && !isNullOrUndefined(target[name])
      ? returnPropertyOnObject(target, name)
      : Undefined
  });
}

export default safe
