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
  hps.yin = this['window'] != null ? !1 : !0;
  hps.ncheck = function (fn) {
    if (fn == null) {return hps.yin}
    fn(hps.yin);
    return hps;
  }
  hps.ncheck((yin) => {
    if (yin) {fs = require('fs'); return}
  });
  hps.pather = function () {
    switch (!0) {
      case process.platform === 'win32':
        return process.env['USERPROFILE'];
      break;
    }
  }
  hps.zypes = {}
  if (fs != null) {
    let zypes; zypes = `${hps.pather()}/.hps-types.json`;
    if (!fs.existsSync(zypes)) {
      fs.writeFile(zypes, '{}', 'utf8', (er) => {
        if (er) {throw er}
      })
    } else {
      hps.zypes = JSON.parse(fs.readFileSync(zypes, 'utf8').toString())
    }
  }
  hps._oSavedData = JSON.stringify(hps.zypes);
  hps.type = function (it, is) {
    let ty, vow;
    ty = Object.prototype.toString.call(it);
    if (hps.zypes[ty] == null) {
      vow = ty.replace(/[\[\]]/g, '').split(' ').pop().toLowerCase();
      hps.zypes[ty] = vow;
    }
    vow = hps.zypes[ty];
    if (fs != null) {
      hps._savedData = JSON.stringify(hps.zypes);
      if (hps._oSavedData !== hps._savedData) {
        fs.writeFileSync((hps.pather()+'/.hps-types.json'), JSON.stringify(hps.zypes), 'utf8', (er) => {if (er) {throw er}});
      }
    }
    return is != null ? (vow === is) : vow;
  }
  hps.requirs = new Map([
    ['fs', {enabled: !1, fns: new Map()}]
  ]);
  hps.checkToast = (maxlevel, type) => {
    let fn;
    fn = (v, argloc, level) => {
      if (level > maxlevel) {level = maxlevel}
      if (level >= 1) {if (v == null) {throw ReferenceError(`Arg ${argloc} cannot be null.`)}}
      if (level >= 2) {
        let t;
        if ((t=hps.type(v),t!==type)) {throw TypeError(`Arg ${argloc} must be a ${type}, got: ${t}`)}}
      if (level === 3) {if (hps.empty(v)) {throw Error(`Arg ${argloc} cannot be empty.`)}}
      return hps.check;
    }
    return fn
  }
  hps.check = {
    str: hps.checkToast(3, 'string'),
    fn: hps.checkToast(2, 'function'),
  }
  hps.nquire = function (name, mod, fn) {
    hps.check.str(name, 1, 3).str(mod, 2, 3).fn(fn, 3, 2);
    if (!hps.requirs.has(mod)) {
      hps.requirs.set(mod, {
        enabled: !1,
        fns: new Map()
      });
    }
    let med;
    med = hps.requirs.get(mod);
    mod.fns.set(name, fn);
    if (mod.enabled === !0) {hps.establish(mod, name)}
    return hps
  }
  hps.establish = function (mod, name) {
    if (!hps.requirs.has(mod)) {throw ReferenceError(`No known module ${mod}`)}
    mod = hps.requirs.get(mod);
    mod.enabled = !0;
    if (name != null) {
      if (!mod.fns.has(name)) {throw ReferenceError(`No known function ${name}`)}
      hps[name] = mod.fns.get(name); return this
    }
    mod.fns.forEach((v, k) => {hps[k] = v});
    return this
  }
  hps.destroy = function (mod) {
    if (!hps.requirs.has(mod)) {throw ReferenceError(`No known module ${mod}`)}
    mod = hps.requirs.get(mod);
    mod.fns.forEach((v, k) => {delete hps[k]});
    return this
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
  hps.mkdown = function (obj, ...names) {
    hps.ncheck((yin) => {
      if (yin) {
        if (((names == null) || !hps.type(names, 'array')) || names.length < 1) {module.exports = obj; return}
        module.exports = obj;
        return
      }
      names.forEach(name => {window[name] = obj});
    });
    return this
  }
  hps.types = new Map();
  hps.iType = function (cl) {
    let obj; obj = {};
    obj.name = cl.name.toLowerCase();
    obj.destructor = function (it) {
      return {yup: obj.name}
    }
    obj.ignored = !0;
    hps.types.set(obj.name, obj);
    return hps;
  }
  hps.nType = function (cl, revive, destruct) {
    if (!hps.type(cl, 'function')) {throw TypeError('First argument must be the constructor')}
    let obj; obj = {};
    if ((cl['reviver'] != null) && hps.type(cl.reviver, 'function')) {obj.reviver = cl.reviver} else {obj.reviver = revive}
    if ((cl['destructor'] != null) && hps.type(cl.destructor, 'function')) {obj.destructor = cl.destructor} else {obj.destructor = destruct}
    obj.name = cl.name.toLowerCase();
    obj.ignored = !1;
    hps.types.set(obj.name, obj);
    return hps;
  }
  hps.reviver = function (k, v) {
    if (v == null) {return}
    if (v['constructor'] != null) {return v}
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
          if (ty.ignored) {return}
          v = ty.reviver(v);
          if (v == null) {throw ReferenceError("Must return the child of the class.")}
      }
    }
    return v;
  }
  hps.destructor = function (k, v) {
    if (v == null) {return}
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
        if (ty.ignored) {return}
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
    if (cb == null) {return localStorage[item]}
    if (!hps.type(cb, 'function')) {localStorage[item] = hps.stringify(cb); return localStorage[item]}
    cb((localStorage[item] != null), item, {
      define (at) {
        if (at == null) {throw Error("Argument cannot be null")}
        localStorage[item] = hps.parse(at);
        this.dat = localStorage[item];
        return this
      },
      delete () {
        if (localStorage[item] == null) {console.warn(`${item} was already deleted`); return}
        delete localStorage[item];
        this.dat = null;
        return this
      },
      dat: localStorage[item]
    });
    return this;
  }
  hps.mkdown(hps, 'helpers', 'hps');
})();
