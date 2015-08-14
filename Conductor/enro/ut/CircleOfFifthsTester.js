/**
 * New node file
 */
var SimpleNote = require('../hrmny/SimpleNote');
var Accidentals = require('../hrmny/Accidentals');
var circle = require('../hrmny/CircleOfFifths');
circle.cof.show();

//One octave
var octave = [new SimpleNote('A',Accidentals.NAT),
              new SimpleNote('A',Accidentals.SHARP),
              new SimpleNote('B',Accidentals.FLAT),
              new SimpleNote('B',Accidentals.NAT),
              new SimpleNote('B',Accidentals.SHARP),
              new SimpleNote('C',Accidentals.FLAT),
              new SimpleNote('C',Accidentals.NAT),
              new SimpleNote('C',Accidentals.SHARP),
              new SimpleNote('D',Accidentals.FLAT),
              new SimpleNote('D',Accidentals.NAT),
              new SimpleNote('D',Accidentals.SHARP),
              new SimpleNote('E',Accidentals.FLAT),
              new SimpleNote('E',Accidentals.NAT),
              new SimpleNote('E',Accidentals.SHARP),
              new SimpleNote('F',Accidentals.FLAT),
              new SimpleNote('F',Accidentals.NAT),
              new SimpleNote('F',Accidentals.SHARP),
              new SimpleNote('G',Accidentals.FLAT),
              new SimpleNote('G',Accidentals.NAT),
              new SimpleNote('G',Accidentals.SHARP),
              new SimpleNote('A',Accidentals.FLAT)];

octave.forEach(function(it){
	console.log('Major scale for ['+it+']: '+circle.cof.validate(it,circle.MAJ));
	console.log('Minor scale for ['+it+']: '+circle.cof.validate(it,circle.MIN));
});