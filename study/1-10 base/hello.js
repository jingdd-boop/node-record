'use strict';

let string = 'hello';

function greetfn(name) {
    console.log(string + ',' + name + '!');
}

module.export = greetfn;