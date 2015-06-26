/**
 * New node file
 */
var SimpleNote = require('../hrmny/SimpleNote');
var Accidentals = require('../hrmny/Accidentals');
var assert = require('assert');


// One octave
var octave = [new SimpleNote('A',Accidentals.NAT),
              new SimpleNote('A',Accidentals.SHARP),
              new SimpleNote('B',Accidentals.NAT),
              new SimpleNote('C',Accidentals.NAT),
              new SimpleNote('C',Accidentals.SHARP),
              new SimpleNote('D',Accidentals.NAT),
              new SimpleNote('D',Accidentals.SHARP),
              new SimpleNote('E',Accidentals.NAT),
              new SimpleNote('F',Accidentals.NAT),
              new SimpleNote('F',Accidentals.SHARP),
              new SimpleNote('G',Accidentals.NAT),
              new SimpleNote('G',Accidentals.SHARP)];

/*
 * Simple Note creation tests
 */
// Wrong note names are rejected
assert.throws(function(){var sn = new SimpleNote();},TypeError,'Null arguments');
assert.throws(function(){var sn = new SimpleNote(null,Accidentals.NAT);},TypeError,'Explicit Null arguments');
assert.throws(function(){var sn = new SimpleNote(undefined,Accidentals.NAT);},TypeError,'Undefined arguments');
assert.throws(function(){var sn = new SimpleNote({},Accidentals.NAT);},TypeError,'Object arguments');
assert.throws(function(){var sn = new SimpleNote([],Accidentals.NAT);},TypeError,'Array arguments');
assert.throws(function(){var sn = new SimpleNote(function(){},Accidentals.NAT);},TypeError,'Function arguments');
assert.throws(function(){var sn = new SimpleNote(-1.5,Accidentals.NAT);},TypeError,'Numeric arguments');
assert.throws(function(){var sn = new SimpleNote('',Accidentals.NAT);},TypeError,'String arguments');

// Wrong accidentals get defaulted to Natural notes
assert.doesNotThrow(function(){var sn = new SimpleNote('A');},'Null accidentals');
assert.doesNotThrow(function(){var sn = new SimpleNote('A',-1.03);},'Numeric accidentals');
assert.doesNotThrow(function(){var sn = new SimpleNote('A',{});},'Object accidentals');
assert.doesNotThrow(function(){var sn = new SimpleNote('A',[]);},'Array accidentals');
assert.doesNotThrow(function(){var sn = new SimpleNote('A',function(){});},'Function accidentals');
assert.doesNotThrow(function(){var sn = new SimpleNote('A',"");},'String accidentals');

// And they show correctly
var sn;
sn = new SimpleNote('A');assert.equal(sn.getAccidentals(),Accidentals.NAT,'Null accidentals');
sn = new SimpleNote('A',-1.03);assert.equal(sn.getAccidentals(),Accidentals.NAT,'Numeric accidentals');
sn = new SimpleNote('A',{});assert.equal(sn.getAccidentals(),Accidentals.NAT,'Object accidentals');
sn = new SimpleNote('A',[]);assert.equal(sn.getAccidentals(),Accidentals.NAT,'Array accidentals');
sn = new SimpleNote('A',function(){});assert.equal(sn.getAccidentals(),Accidentals.NAT,'Function accidentals');
sn = new SimpleNote('A',"");assert.equal(sn.getAccidentals(),Accidentals.NAT,'String accidentals');

// Upper and lower case note names are accepted
['a','b','c','d','e','f','g','A','B','C','D','E','F','G'].forEach(function(it){
	assert.doesNotThrow(function(){var sn = new SimpleNote(it,Accidentals.NAT);},'Upper/lower case '+it);
});


/*
 * Testing note steps
 */
// Idem potent note steps
var re = new SimpleNote('D',Accidentals.NAT);
assert.equal(re.step().toString(),re.toString(),'Null step');
assert.equal(re.step(0).toString(),re.toString(),'Stepping 0 positions');
assert.equal(re.step(12).toString(),re.toString(),'Stepping 1 octave up');
assert.equal(re.step(-12).toString(),re.toString(),'Stepping 1 octave down');

// Note steps
assert.equal(re.step(1).equals(new SimpleNote('D',Accidentals.SHARP)),true,'Stepping 1 position up');
assert.equal(re.step(-1).equals(new SimpleNote('C',Accidentals.SHARP)),true,'Stepping 1 position down');
assert.equal(re.step(-1).equals(new SimpleNote('D',Accidentals.FLAT)),true,'Stepping 1 position down');

// Note steps from mibb
var mibb = new SimpleNote('E',Accidentals.DFLAT);
assert.equal(mibb.step().equals(new SimpleNote('C',Accidentals.DSHARP)),true,'DFLAT vs DSHARP');
assert.equal(mibb.step(11).equals(new SimpleNote('C',Accidentals.SHARP)),true,'Stepping 11 from D');
assert.equal(mibb.step(11).equals(new SimpleNote('D',Accidentals.FLAT)),true,'Stepping 11 from D');
assert.equal(mibb.step(-13).equals(new SimpleNote('C',Accidentals.SHARP)),true,'Stepping -13 from D');
assert.equal(mibb.step(-13).equals(new SimpleNote('D',Accidentals.FLAT)),true,'Stepping -13 from D');

// Some invalid equality tests
assert.throws(function(){var sn = new SimpleNote();sn.equals();},TypeError,'Null arguments');
assert.throws(function(){var sn = new SimpleNote();sn.equals({});},TypeError,'Object');
assert.throws(function(){var sn = new SimpleNote();sn.equals(function(){});},TypeError,'Function');
assert.throws(function(){var sn = new SimpleNote();sn.equals('');},TypeError,'String');
assert.throws(function(){var sn = new SimpleNote();sn.equals(-1.5);},TypeError,'Numeric');
assert.throws(function(){var sn = new SimpleNote();sn.equals([]);},TypeError,'Array');

/*
 * Testing note distance
 */
// Some invalid distance tests
assert.throws(function(){var sn = new SimpleNote();sn.distanceTo();},TypeError,'Null arguments');
assert.throws(function(){var sn = new SimpleNote();sn.distanceTo({});},TypeError,'Object');
assert.throws(function(){var sn = new SimpleNote();sn.distanceTo(function(){});},TypeError,'Function');
assert.throws(function(){var sn = new SimpleNote();sn.distanceTo('');},TypeError,'String');
assert.throws(function(){var sn = new SimpleNote();sn.distanceTo(-1.5);},TypeError,'Numeric');
assert.throws(function(){var sn = new SimpleNote();sn.distanceTo([]);},TypeError,'Array');

// Zero distance tests
assert.equal(mibb.distanceTo(mibb).toString(),[0,0].toString(),'Distance to self');
assert.equal(mibb.distanceTo(mibb.step(0)).toString(),[0,0].toString(),'Distance to zero step');
assert.equal(mibb.distanceTo(mibb.step(12)).toString(),[0,0].toString(),'Distance to 12 step');
assert.equal(mibb.distanceTo(mibb.step(-12)).toString(),[0,0].toString(),'Distance to -12 step');
assert.equal(mibb.distanceTo(mibb.step(24)).toString(),[0,0].toString(),'Distance to 24 step');
assert.equal(mibb.distanceTo(mibb.step(-24)).toString(),[0,0].toString(),'Distance to -24 step');
assert.equal(mibb.distanceTo(new SimpleNote('D',Accidentals.NAT)).toString(),[0,0].toString(),'Distance to alternate name');

// Ascending tests
////['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']
assert.equal(octave[0].distanceTo(octave[1]).toString(),[1,-11].toString(),'Distance to next is 1');
assert.equal(octave[11].distanceTo(octave[0]).toString(),[1,-11].toString(),'Distance to next is 1, even accorss scales');
assert.equal(octave[5].distanceTo(octave[1]).toString(),[8,-4].toString(),'Distance from D to A#');
assert.equal(octave[9].distanceTo(octave[2]).toString(),[5,-7].toString(),'Distance from F# to B');
assert.equal(octave[0].distanceTo(octave[7]).toString(),[7,-5].toString(),'Distance from A to E');
assert.equal(octave[7].distanceTo(octave[0]).toString(),[5,-7].toString(),'Distance from E to A');