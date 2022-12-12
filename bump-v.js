(async function () {
  // become grabby
  let fs, fetch, pkg, vers, resp;
  fs = require('fs').promises;
  fetch = require('node-fetch');
  pkg = require('./package.json');
  
  // le await the fetch request
  resp = await fetch('https://cdn.jsdelivr.net/npm/utonmae@latest/package.json');
  
  // le await the response and grab it as a json format
  resp = await resp.json();
  
  // convert the string into an array that can be easily edited
  vers = resp.version.split('.').map(n => +n);
  
  //           V                   V
  // if [1, 0, 0] is > 9; bump [1, 0, 0]
  if (vers[2] > 9) {
    vers[2] = 0;
    vers[1]++
  }
  
  //        V                   V
  // if [1, 0, 0] is > 9; bump [1, 0, 0]
  if (vers[1] > 9) {
    vers[1] = 0;
    vers[0]++
  }
  
  // smmMOOSH back into 1.0.0 .w.
  pkg.version = vers.join('.');
  
  // wait for fs to write ze fiel
  let er = await fs.writeFile('./package.json', JSON.stringify(pkg, null, 2), 'utf8');
  
  // if uhoh- then die (lol I love the fact that inorder to throw an error in php.. you tell it to die())
  if (er) {
    console.log('Something went wrong.');
    throw er;
  }
})();
