let hps = require('./index.js');
let custom, expect;
custom = Symbol.for('nodejs.util.inspect.custom');

expect = function (query, fn, opt = 'boolean', mb = !0) {
  if (query === null) {throw ReferenceError("Must ask a question to get an answer :P")}
  query += "?: ";
  let res; res = fn();
  if (fn === null) {throw Error("Must have a return")}
  if (!hps.yin) {process.stdout.write(query)}
  let yin;
  if (opt === 'boolean') {
    let yin2;
    if ((yin = hps.type(res, opt)) && (yin2 = res === mb)) {
      if (hps.yin) {console.log(query + 'yes')} else {process.stdout.write('yes')}
      console.log('Matched must be?: yes');
      return expect
    } else {
      throw Error(`Was type bool?: ${yin ? 'yes' : 'no'}
Matched must be?: ${yin2 ? 'yes' : 'no'}`);
    }
  } else {
    if ((yin = hps.type(res, opt))) {
      if (hps.yin) {console.log(query + 'yes')} else {process.stdout.write('yes')}
      return expect
    } else {
      throw Error(`Was type ${opt}?: ${yin ? 'yes' : 'no'}`)
    }
  }
}

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

expect('Is jso a string', () => hps.type(jso, 'string'))
('Is the parsed version of jso an object', () => hps.type(hps.parse(jso), 'object'))
('Is this running off of node', () => {
  return hps.yin
});
