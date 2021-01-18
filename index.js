(function () {
  if (Object['keys'] == null) {
    Object.keys = function (obj) {
      let props = [];
      for (let prop in obj) {
        if (!obj.hasOwnProperty(prop)) {continue}
        props.push(prop)
      }
      return props;
    }
  }
  let hps, fs; hps = {};
  hps.type = function (it, is) {
    let ty = Object.prototype.toString.call(it).toLowerCase();
    return is != null ? (ty.includes(is.toLowerCase())) : (ty.replace(/[\[\]]/g, '').split(' ').pop());
  }
  hps.empty = function (arg) {
    let it;
    it = hps;
    switch (it.type(arg)) {
      case 'array': case 'string': return arg.length === 0;
      case 'object': return Object.keys(arg).length === 0 && arg.constructor === Object;
      case 'regexp': return arg.source.length === 0;
      default: console.error('Unknown type || cannot calculate size');
    }
  }
  hps.defin = function (obj, ...items) {
    let it;
    it = hps;
    if (obj['prototype'] != null) {obj = obj.prototype}
    items.forEach(item => {
      if (item == null) {return}
      if (!hps.type(item, 'array')) {return}
      if (!item.length === 2) {return}
      if (!hps.type(item[0], 'string')) {return}
      if (!hps.type(item[1], 'object')) {return}
      if (Object.hasOwnProperty(obj, item[0])) {return}
      Object.defineProperty(obj, item[0], item[1])
    });
    return this;
  }
  hps.extend = function (mf, ...exts) {
    exts.forEach((ext) => {
      if ((ext['prototype'] == null)) {
        switch (!0) {
          case ext.constructor?.prototype == null:
            throw Error("No existing 'prototype', pass the constructor.");
          case ext.constructor?.prototype != null:
            ext = ext.constructor.prototype;
          break
        }
      } else {ext = ext.prototype}
      mf.prototype = Object.assign(mf.prototype, ext);
    });
    return mf;
  }
  hps[Symbol('hps.yin')] = null;
  hps.ncheck = function (fn) {
    let yin, wull, wountio; yin = Symbol.for('hps.yin');
    if (hps[yin] == null) {hps[yin] = this['process'] != null ? !0 : !1}
    if (fn == null) {return hps[yin]}
    fn(hps[yin]);
    return hps;
  }
  hps.ncheck((yin) => {if (yin) {fs = require('fs'); return}});
  hps.mkdown = function (obj, ...names) {
    hps.ncheck((yin) => {
      if (yin) {
        if (((names == null) || !hps.type(names, 'array')) || names.length < 1) {module.exports = obj; return}
        names.forEach(name => {exports[name] = obj});
        return
      }
      names.forEach(name => {window[name] = obj});
    });
    return this
  }
  hps.nType = function (cl, revive, destruct) {
    if (!hps.type(cl, 'function')) {throw TypeError('First argument must be the constructor')}
    let obj; obj = {};
    if ((cl['reviver'] != null) && hps.type(cl.reviver, 'function')) {obj.reviver = cl.reviver} else {obj.reviver = revive}
    if ((cl['destructor'] != null) && hps.type(cl.destructor, 'function')) {obj.destructor = cl.destructor} else {obj.destructor = destruct}
    obj.name = cl.name.toLowerCase();
    hps.types.set(obj.name, obj);
    return hps;
  }
  hps.reviver = function (k, v) {
    if ((hps.type(v, 'object')) && v['yup'] != null) {
      switch (v.yup) {
        case 'map':
          v = new Map(v.data)
        break;
        case 'regexp':
          let args = [];
          args.push(v.str);
          if (v['flags'] != null) {args.push(v.flags)}
          v = new RegExp(...args);
        break;
        default:
          if (!hps.types.has(v.yup)) {throw TypeError(`${v.yup} has not been defined.`)}
          let ty; ty = hps.types.get(v.yup);
          v = ty.reviver(v);
          if (v == null) {throw ReferenceError("Must return the child of the class.")}
      }
    }
    return v;
  }
  hps.destructor = function (k, v) {
    if (!hps.ncheck() && (v instanceof Element || v instanceof p)) {
      console.log('yos');
      return}
    let typ, normal;
    typ = hps.type(v);
    normal = !0;
    if (v.constructor.name.toLowerCase() !== typ) {
      normal = !1;
      typ = v.constructor.name.toLowerCase();
    }
    switch (typ) {
      case 'map':
        return {
          yup: typ,
          data: Array.from(v.entries())
        }
      case 'regexp':
        return {
          yup: typ,
          str: v.source,
          flags: v.flags
        }
      default:
        if (normal) {return v}
        if (!hps.types.has(typ)) {throw Error("No known type: " + typ)}
        let ty, data;
        ty = hps.types.get(typ);
        data = ty.destructor(v);
        if (data == null) {throw ReferenceError("Destructor must return a data object depicting the custom class.")}
        if (data['yup'] == null) {throw ReferenceError("Data must have a 'yup' key.")}
        return data;
    }
    return v;
  }
  hps.stringify = function (str, beh = 0) {
    return JSON.stringify(str, hps.destructor, beh)
  }
  hps.parse = function (str, fl = !1) {
    if (fs != null && fl) {
      if (!fs.existsSync(str)) {throw Error("Path does not exist.")}
      if (!str.includes('json')) {throw Error("Path must be a json file.")}
      str = fs.readFileSync(fs.realpathSync(str)).toString();
    }
    return JSON.parse(str, hps.reviver)
  }
  hps.mns = function (item, cb) {
    if (hps.ncheck()) {throw Error("This function is only ment for browsers.")}
    let e = localStorage[item] != null;
    cb(e, item);
    return this;
  }
  hps.mkdown(hps, 'helpers', 'hps');
})();
