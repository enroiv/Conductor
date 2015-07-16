/**
 * New node file
 */
var BaseScale = require('../hrmny/BaseScale');
var Scales = require('../hrmny/Scales');
var SimpleNote = require('../hrmny/SimpleNote');
var Accidentals = require('../hrmny/Accidentals');

var cMajScale = new BaseScale(new SimpleNote('A',Accidentals.NAT),Scales.HRMMIN);
var trv = cMajScale.ascend(1,8,new SimpleNote('G',Accidentals.NAT));
trv.forEach(function(it){console.log(it.toString());});
console.log('-----------------------');
trv = cMajScale.descend(1,8,new SimpleNote('G'/*,Accidentals.NAT*/));
trv.forEach(function(it){console.log(it.toString());});