/**
 * New node file
 */
var Scales = function(){};
var Accidentals = require('./Accidentals');

/* 
 * Major scale. From tonic: F-F-H-F-F-F-H
 */
Object.defineProperty(Scales,"MAJORARR",{value:
	[[0,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.NAT,Accidentals.NAT]],writable:false,enumerable:true,configurable:false});

/*
 * Natural minor scale. From tonic: F-H-F-F-H-F-F
 */
Object.defineProperty(Scales,"NATMINARR",{value:
	[[0,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT]],writable:false,enumerable:true,configurable:false});

/*
 * Harmonic minor scale. From tonic: F-H-F-F-H-FH-H
 */
Object.defineProperty(Scales,"HRMMINARR",{value:
	[[0,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.SHARP,Accidentals.SHARP],
	 [2,Accidentals.FLAT,Accidentals.FLAT]],writable:false,enumerable:true,configurable:false});

/*
 * Melodic minor scale. From tonic: F-H-F-F-F-F-H on the way up. Same as natural minor scale
 * on the way down.
 */
Object.defineProperty(Scales,"MELMINARR",{value:
	[[0,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.SHARP,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.FLAT,Accidentals.NAT]],writable:false,enumerable:true,configurable:false});


Object.defineProperty(Scales,"MAJOR",{value:"MAJORARR",writable:false,enumerable:true,configurable:false});

Object.defineProperty(Scales,"NATMIN",{value:"NATMINARR",writable:false,enumerable:true,configurable:false});

Object.defineProperty(Scales,"HRMMIN",{value:"HRMMINARR",writable:false,enumerable:true,configurable:false});

Object.defineProperty(Scales,"MELMIN",{value:"MELMINARR",writable:false,enumerable:true,configurable:false});

module.exports = Scales;
