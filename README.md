# Helper fun's :P


Just implements a few helper functions to help get around both browser and node api's
no support for deno.js ~~mainly because I don't know how~~


`<hps|helpers>.parse | <hps|helpers>.stringify & <hps|helpers>.nType`
```js
// say you want to stringify a map or regexp
// or a unsupported class
// you could do things like:
let Mow = (() => {
let mo;
mo = function Mow (moow) {
  if (!(this instanceof Mow)) {return new Mow(...arguments)}
  if (moow == null) {throw Error("MOOOOW")}
  this.moow = moow;
}
mo.prototype = {
  constructor: Mow
}
// defines the deconstrucor rule, basically turns it into json jargen
mo.destructor = function (it) {
  return {
    yup: 'mow', // needed, the rest of it.. structure it how you like, of course, within the rules of a JSON file.
    data: it.moow
  }
}
// defines the reviver rule, basically turns that json jargen into the original data before json jargen
mo.reviver = function (it) {
  return Mow(it.data)
}

// passes the custom class into a library which saves the data.
hps.nType(mo);
return mo
})();

// then you can use parse & stringify
let dt = hps.stringify({
  mo: Mow('mowmowmowmow')
}); // {"mo":{"yup":"mow",data:"mowmowmowmow"}}
hps.parse(dt) // {mo: Mow {moow: "mowmowmowmow"}}
```
