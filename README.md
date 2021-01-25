# Helper fun's :P
Just implements a few helper functions to help get around both browser and node api's
no support for deno.js ~~mainly because I don't know how~~

### **Legend**:
+ ***<hps|helpers>*** - `hps || helpers`

---
## `<hps|helpers>.defin`
**Basically**, less of a headache, Object.defineProperty / Object.defineProperties.
~~`Why do programmers insist on making it super hard or tedious for others..., instead of it being smart or easy`~~

```js
hps.defin(Map,
  ['array', {
    value () {
      // if you're not from ye olde
      return Array.from(this.entries())
    }
  }]
)
```
---
## `<hps|helpers>.empty`
**Basically**, easy use case `.length` for the base types

```js
let empt;
empt = {
  obj: {}, // object
  arr: [], // array
  str: '', // string
  rgxp: new RegExp('') // regular expression, had to do it this way otherwise the processer would've had a fit
}

console.log(`Is obj empty? ${hps.empty(empt.obj)}
Is arr empty? ${hps.empty(empt.arr)}
Is str empty? ${hps.empty(empt.str)}
Is rgxp empty? ${hps.empty(empt.rgxp)}`);

// these will all be true
// if its an unknown type or there is no size value, will throw an error ;P.
```
---
## `<hps|helpers>.parse | <hps|helpers>.stringify & <hps|helpers>.nType`
**Basically**, extendable JSON stringifiy and parse
that should've been a thing by now but nope-

```js
// edit: indented it so some style enforcer doesn't have a stroke ;P
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
---
## `<hps|helpers>.type`
Returns the type of the first argument, if another is passed, compares the second to the first's type, of course, must be a string, what kind of person would do it any other way ;P

```js
console.log(hps.type('moo')) // 'string';
// or
console.log(hps.type('moo', 'string')) // true;
```
---
## `<hps|helpers>.ncheck`
**Basically** checks if the main is nodejs or a browser
can just call it for the value if you don't want to do it callback wise.

```js
hps.ncheck(yin => {
  if (!yin) {console.log('node-')}
  console.log('window-')
});
```
---
## `<hps|helpers>.mkdown`
**Basically**, easy definable into the window process-
if doing something from a self call anonymous function
```js
(() => {
  let moo;
  moo = {weh: 'egg'}
  hps.mkdown(moo, 'cow');
})();
console.log(cow) /* or window.cow */ // {weh: "egg"}
```
---
## `<hps|helpers>.mns`
**Basically**, ease of access localStorage

```js
hps.mns('moocow', (exists, item, helperNodeShard) => {
  // exists || e
  // item || it
  // helperNodeShard || hns
  if (!exists) {helperNodeShard.define('weewow')}
  someGlobalVariable = helperNodeShard.dat
})
```
