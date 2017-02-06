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
/*
class MyClass {
    static [Symbol.hasInstance](lho) {
        return Array.isArray(lho);
    }
}
assert([] instanceof MyClass);
*/
var myArray = [1,2,3];

/*
// with `for of`
for(var value of myArray) {
    console.log(value);
}

// without `for of`
var _myArray = myArray[Symbol.iterator]();
var _iteration;

while(_iteration = _myArray.next()) {
    if (_iteration.done) {
        break;
    }
    var value = _iteration.value;
    console.log(value);
}
*/
/*
class Collection {
  *[Symbol.iterator]() {
    var i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

var myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;
for(var value of myCollection) {
    console.log(value); // 1, then 2
}
*/
/*
class ArrayIsh extends Array {
    get [Symbol.isConcatSpreadable]() {
        return true;
    }
}
class Collection extends Array {
    get [Symbol.isConcatSpreadable]() {
        return false;
    }
}
arrayIshInstance = new ArrayIsh();
arrayIshInstance[0] = 3;
arrayIshInstance[1] = 4;
collectionInstance = new Collection();
collectionInstance[0] = 5;
collectionInstance[1] = 6;
spreadableTest = [1,2].concat(arrayIshInstance).concat(collectionInstance);
assert.deepEqual(spreadableTest, [1, 2, 3, 4, collectionInstance]);
*/

Object.keys(Array.prototype[Symbol.unscopables]); // -> ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'keys']

// Without unscopables:
/*
class MyClass {
    foo() { return 1; }
}
var foo = function () { return 2; };
with (MyClass.prototype) {
    foo(); // 1!!
}
*/

// Using unscopables:
class MyClass {
    foo() { return 1; }
    get [Symbol.unscopables]() {
        return { foo: true };
    }
}
var foo = function () { return 2; };
with (MyClass.prototype) {
    l(foo()); // 2!!
}