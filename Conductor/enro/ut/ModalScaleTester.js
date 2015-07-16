/**
 * New node file
 */
var ModalScale = require('../hrmny/ModalScale');
var SimpleNote = require('../hrmny/SimpleNote');
var Accidentals = require('../hrmny/Accidentals');

var cIonianScale = new ModalScale(new SimpleNote('C'),ModalScale.IONIAN);
var trv = cIonianScale.ascend(1,8/*,new SimpleNote('G',Accidentals.NAT)*/);
trv.forEach(function(it){console.log(it.toString());});
console.log('-----------------------');
var cDorianScale = new ModalScale(new SimpleNote('C'),ModalScale.DORIAN);
trv = cDorianScale.ascend(1,8/*,new SimpleNote('G',Accidentals.NAT)*/);
trv.forEach(function(it){console.log(it.toString());});
