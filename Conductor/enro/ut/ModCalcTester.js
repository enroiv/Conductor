/**
 * New node file
 */
var ModCalc = require('../utils/ModCalc');
var assert = require('assert');

/*
 * Modular calculator creation tests
 */
// Invalid modulus
assert.throws(function(){var mc = new ModCalc();},TypeError,'Null modulus');
assert.throws(function(){var mc = new ModCalc(0);},TypeError,'0 modulus');
assert.throws(function(){var mc = new ModCalc("t");},TypeError,'String');
assert.throws(function(){var mc = new ModCalc([1,2]);},TypeError,'Array');
assert.throws(function(){var mc = new ModCalc({});},TypeError,'Object');
assert.throws(function(){var mc = new ModCalc(function(){});},TypeError,'Function');
assert.throws(function(){var mc = new ModCalc(-1.5);},TypeError,'Floating point');

// Correct modulus
assert.doesNotThrow(function(){var mc = new ModCalc(1);},'Positive integer');
assert.doesNotThrow(function(){var mc = new ModCalc(-1);},'Negative integer');



var mc = new ModCalc(5);



/*
 * Modular calculator addition argument tests
 */

// Invalid arguments
assert.throws(function(){mc.add([-1],{});},TypeError,'Invalid operands');
assert.throws(function(){mc.add(1,{});},TypeError,'Invalid operands');
assert.throws(function(){mc.add({},1);},TypeError,'Invalid operands');
assert.throws(function(){mc.add(1.5,1);},TypeError,'Invalid operands');
assert.throws(function(){mc.add(1,function(){});},TypeError,'Invalid operands');
assert.throws(function(){mc.add(1,null);},TypeError,'Invalid operands');
assert.throws(function(){mc.add(1,undefined);},TypeError,'Invalid operands');

// First argument has to be greater than 0
assert.throws(function(){mc.add(-1,0);},Error,'Negative first operand');
assert.throws(function(){mc.add(0,0);},Error,'Zero first operand');

// Correct arguments
assert.doesNotThrow(function(){mc.add(1,-1);},'Negative integer');
assert.doesNotThrow(function(){mc.add(1,0);},'Zero');
assert.doesNotThrow(function(){mc.add(1,1000);},'Positive integer');

/*
 * Modular calculator addition tests
 */
assert.equal(mc.add(1,0),1,'1 + 0 = 1');
assert.equal(mc.add(1,1),2,'1 + 1 = 2');
assert.equal(mc.add(1,-1),5,'1 - 1 = 5');
assert.equal(mc.add(5,0),5,'5 + 0 = 5');
assert.equal(mc.add(5,1),1,'5 + 1 = 1');
assert.equal(mc.add(5,-1),4,'5 - 1 = 4');
assert.equal(mc.add(3,10),3,'3 + 10 = 3');
assert.equal(mc.add(3,-10),3,'3 - 10 = 3');
assert.equal(mc.add(2,14),1,'2 + 14 = 1');
assert.equal(mc.add(4,-17),2,'4 - 17 = 2');

