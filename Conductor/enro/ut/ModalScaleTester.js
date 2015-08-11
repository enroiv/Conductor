/**
 * New node file
 */
var ModalScale = require('../hrmny/ModalScale');
var SimpleNote = require('../hrmny/SimpleNote');
var Accidentals = require('../hrmny/Accidentals');

var cPhrygianScale = new ModalScale(new SimpleNote('F'),ModalScale.PHRYGIAN);
var trv = cPhrygianScale.ascend(1,8/*,new SimpleNote('G',Accidentals.NAT)*/);
trv.forEach(function(it){console.log(it.toString());});
console.log('-----------------------');
var cLocrianScale = new ModalScale(new SimpleNote('G'),ModalScale.MIXOLYDIAN);
trv = cLocrianScale.ascend(1,8/*,new SimpleNote('G',Accidentals.NAT)*/);
trv.forEach(function(it){console.log(it.toString());});
