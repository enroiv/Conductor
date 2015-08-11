/**
 * New node file
 */
var BaseScale = require('../hrmny/BaseScale');
var Scales = require('../hrmny/Scales');
var SimpleNote = require('../hrmny/SimpleNote');
var Accidentals = require('../hrmny/Accidentals');


var cMaj = new BaseScale(new SimpleNote('C'),Scales.MAJOR);
cMaj.showTraversal(cMaj.ascend(2,9));
console.log('\n\n-------------------\n\n');
cMaj.showTraversal(cMaj.descend(2,8));
console.log('\n\n-------------------\n\n');
cMaj.showTraversal(cMaj.ascend(1,9,new SimpleNote('C',Accidentals.FLAT)));

var cFlatMaj = new BaseScale(new SimpleNote('C',Accidentals.FLAT),Scales.MAJOR);
cFlatMaj.showTraversal(cFlatMaj.ascend(1,9));


/*
console.log('Constructing major scale');
var cMajScale = new BaseScale(new SimpleNote('A',Accidentals.NAT),Scales.HRMMIN);
console.log('Constructing major scale done');
console.log('Ascending major scale');
var trv = cMajScale.ascend(1,10,new SimpleNote('G',Accidentals.NAT));
console.log('traversal created');
cMajScale.showTraversal(trv);
console.log('Ascending major scale done');*/


//Harmonic minor scale. From tonic: F-H-F-F-H-FH-H
//A B C D E F G# A -> G
//console.log('-----------------------');
//trv = cMajScale.descend(1,8,new SimpleNote('G'/*,Accidentals.NAT*/));
//cMajScale.showTraversal(trv);
//console.log('-----------------------');


/*
var fMajScale = new BaseScale(new SimpleNote('F'),Scales.MAJOR);
var fTrv = fMajScale.ascend(1,8);
cMajScale.showTraversal(fTrv);*/