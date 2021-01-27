(function () {
  let fs, pkg, vers;
  fs = require('fs');
  pkg = require('./package.json');
  vers = pkg.version.split('.').map(n => +n);
  vers[vers.length - 1]++;
  if (vers[vers.length - 1] > 9) {
    vers[vers.length - 1] = 0;
    vers[vers.length - 2]++
  }
  if (vers[vers.length - 2] > 9) {
    vers[vers.length - 2] = 0;
    vers[vers.length - 3]++
  }
  pkg.version = vers.join('.');
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2), 'utf8')
})();
