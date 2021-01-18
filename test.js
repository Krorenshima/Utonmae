let hps = require('./index.js');
let custom;
custom = Symbol.for('nodejs.util.inspect.custom')

let Mow = (() => {
  let mo;
  mo = function Mow (moww) {
    if (!(this instanceof Mow)) {return new Mow(...arguments)}
    if (moww == null) {throw Error("MOOWWWWW")}
    this.mow = moww;
  }
  mo.prototype = {
    constructor: mo,
    [custom]() {
      return '<Mow: '+this.mow+'>'
    }
  }
  mo.reviver = function (it) {
    return mo(it.data)
  }
  mo.destructor = function (it) {
    return {
      yup: 'mow',
      data: it.mow
    }
  }
  hps.nType(mo);
  return mo
})();

let jso = hps.stringify({
  moo: 'cow',
  wow: ['e', 'e', 'e', 'e'],
  lan: new Map([
    ['na', 'な']
  ]),
  ian: /reg/i,
  mo: Mow('mowwww')
}, 2);

console.log(jso);
console.log(hps.parse(jso));
