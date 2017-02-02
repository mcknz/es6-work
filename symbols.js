var assert = require('assert');
function l(a) {console.log(a)}
/*
Symbol();
console.log(Symbol());

console.log(Symbol('foo'));

assert(typeof Symbol() === 'symbol');
assert(Symbol('foo').toString() === 'Symbol(foo)');
assert.notEqual(Symbol(), Symbol());
assert.notEqual(Symbol('foo'), Symbol('foo'));
assert.notEqual(Symbol('foo'), Symbol('bar'));

var myObj = {};
var fooSym = Symbol('foo');
var otherSym = Symbol('bar');
myObj['foo'] = 'bar';
myObj[fooSym] = 'baz';
myObj[otherSym] = 'bing';
assert(myObj.foo === 'bar');
assert(myObj[fooSym] === 'baz');
assert(myObj[otherSym] === 'bing');
*/
/*
var fooSym = Symbol('foo');
var myObj = {};
myObj['foo'] = 'bar';
myObj[fooSym] = 'baz';
l(Object.keys(myObj)); // -> [ 'foo' ]
l(Object.getOwnPropertyNames(myObj)); // -> [ 'foo' ]
l(Object.getOwnPropertySymbols(myObj)); // -> [ Symbol(foo) ]
assert(Object.getOwnPropertySymbols(myObj)[0] === fooSym);
*/

assert.notEqual(Symbol('foo'), Symbol('foo'));
assert.equal(Symbol.for('foo'), Symbol.for('foo'));
/*
// Not unique:
var myObj = {};
var fooSym = Symbol.for('foo');
var otherSym = Symbol.for('foo');
myObj[fooSym] = 'baz';
myObj[otherSym] = 'bing';
assert(fooSym === otherSym);
assert(myObj[fooSym] === 'bing');
assert(myObj[otherSym] === 'bing');
*/
/*
// Cross-Realm
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
assert.notEqual(iframe.contentWindow.Symbol, Symbol);
assert(iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo'));
*/
/*
var localFooSymbol = Symbol('foo');
var globalFooSymbol = Symbol.for('foo');

assert(Symbol.keyFor(localFooSymbol) === undefined);
assert(Symbol.keyFor(globalFooSymbol) === 'foo');
assert(Symbol.for(Symbol.keyFor(globalFooSymbol)) === Symbol.for('foo'));
*/

//1. As a unique value where you’d probably normally use a String or Integer:
/*
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn'),
};
log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');
*/

// 2. A place to put metadata values in an Object
/*
var size = Symbol('size');
class Collection {
    constructor() {
        this[size] = 0;
    }

    add(item) {
        this[this[size]] = item;
        this[size]++;
    }

    static sizeOf(instance) {
        return instance[size];
    }

}

var x = new Collection();
assert(Collection.sizeOf(x) === 0);
x.add('foo');
assert(Collection.sizeOf(x) === 1);
assert.deepEqual(Object.keys(x), ['0']);
assert.deepEqual(Object.getOwnPropertyNames(x), ['0']);
assert.deepEqual(Object.getOwnPropertySymbols(x), [size]);
*/
/*
//3. Giving developers ability to add hooks to their objects, through your API
// Retreive the magic inspect Symbol from the API's Symbol constants
var inspect = console.Symbols.INSPECT;

var myVeryOwnObject = {};
console.log(myVeryOwnObject); // logs out `{}`

myVeryOwnObject[inspect] = function () { return 'DUUUDE'; };
console.log(myVeryOwnObject); // logs out `DUUUDE`
*/

class MyClass {
    static [Symbol.hasInstance](lho) {
        return Array.isArray(lho);
    }
}
assert([] instanceof MyClass);