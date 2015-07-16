/**
 * ModalScale models the modal scales:
 * Ionian
 * Dorian
 * Phrygian
 * Lydian
 * Mixolydian
 * Aeolian
 * Locrian
 */
var ModalScale = function(t,m){
	var SimpleNote = require('./SimpleNote');
	var Scales = require('./Scales');
	var BaseScale = require('./BaseScale');
	
	if(!(t instanceof SimpleNote)){
		throw new TypeError("Invalid tonic note: " + t);
	}
	
	switch(m){
	case ModalScale.IONIAN:
	case ModalScale.DORIAN:
	case ModalScale.PHRYGIAN:
	case ModalScale.LYDIAN:
	case ModalScale.MIXOLYDIAN:
	case ModalScale.AEOLIAN:
	case ModalScale.LOCRIAN:
		break;
	default:
			throw new TypeError('Invalid mode: '+m);
	}
	
	var tonic = t;
	var note = t.step(m);
	var scale = new BaseScale(note,Scales.MAJOR);
	
	
	this.ascend = function(stepSz,numSteps,initNote){
		var nt = (initNote instanceof SimpleNote) ? initNote : tonic;
		return scale.ascend(stepSz,numSteps,nt);
	};
	
	this.descend = function(stepSz,numSteps,initNote){
		var nt = (initNote instanceof SimpleNote) ? initNote : tonic;
		return scale.descend(stepSz,numSteps,nt);
	};
};

Object.defineProperty(ModalScale,"IONIAN",{value:0,writable:false,enumerable:true,configurable:false});
Object.defineProperty(ModalScale,"DORIAN",{value:-2,writable:false,enumerable:true,configurable:false});
Object.defineProperty(ModalScale,"PHRYGIAN",{value:-4,writable:false,enumerable:true,configurable:false});
Object.defineProperty(ModalScale,"LYDIAN",{value:-5,writable:false,enumerable:true,configurable:false});
Object.defineProperty(ModalScale,"MIXOLYDIAN",{value:5,writable:false,enumerable:true,configurable:false});
Object.defineProperty(ModalScale,"AEOLIAN",{value:3,writable:false,enumerable:true,configurable:false});
Object.defineProperty(ModalScale,"LOCRIAN",{value:1,writable:false,enumerable:true,configurable:false});

module.exports = ModalScale;