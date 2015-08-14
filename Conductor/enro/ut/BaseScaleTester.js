/**
 * New node file
 */
var BaseScale = require('../hrmny/BaseScale');
var Scales = require('../hrmny/Scales');
var SimpleNote = require('../hrmny/SimpleNote');
var Accidentals = require('../hrmny/Accidentals');

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

console.log('Major scales');
octave.forEach(function(it){
	console.log(it.toString());
	var scle = new BaseScale(it,Scales.MAJOR);
	console.log('Up:');
	scle.showTraversal(scle.ascend());
	console.log('Down:');
	scle.showTraversal(scle.descend());
	console.log('------------------------\n');
});

console.log('\n\n\nMinor scales');
octave.forEach(function(it){
	console.log(it.toString());
	var scle = new BaseScale(it,Scales.MINOR);
	console.log('Up:');
	scle.showTraversal(scle.ascend());
	console.log('Down:');
	scle.showTraversal(scle.descend());
	console.log('------------------------\n');
});

var hrmMinScle = new BaseScale(octave[0],Scales.HRMMIN);
hrmMinScle.showTraversal(hrmMinScle.ascend());
hrmMinScle.showTraversal(hrmMinScle.descend());
console.log('\n----------------------\n\n\n\n\n');
var melMinScle = new BaseScale(octave[0],Scales.MELMIN);
melMinScle.showTraversal(melMinScle.ascend());
melMinScle.showTraversal(melMinScle.ascend(1,7,octave[14]));
melMinScle.showTraversal(melMinScle.ascend(1,7,octave[15]));
melMinScle.showTraversal(melMinScle.ascend(1,7,octave[16]));
console.log('\n----------------------\n');
melMinScle.showTraversal(melMinScle.descend());
melMinScle.showTraversal(melMinScle.descend(1,7,octave[14]));
melMinScle.showTraversal(melMinScle.descend(1,7,octave[15]));
melMinScle.showTraversal(melMinScle.descend(1,7,octave[16]));
