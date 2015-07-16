/**
 * New node file
 */
var BaseScale = require('../hrmny/BaseScale');
var Scales = require('../hrmny/Scales');
var SimpleNote = require('../hrmny/SimpleNote');
var Accidentals = require('../hrmny/Accidentals');

var cMajScale = new BaseScale(new SimpleNote('C',Accidentals.NAT),Scales.MAJOR);
var trv = cMajScale.ascend(4,8);
trv.forEach(function(it){console.log(it.toString());});
console.log('-----------------------');
trv = cMajScale.descend(2,8,new SimpleNote('A',Accidentals.FLAT));
trv.forEach(function(it){console.log(it.toString());});