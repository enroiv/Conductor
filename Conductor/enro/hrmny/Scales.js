/**
 * New node file
 */
var Scales = function(){};
var Accidentals = require('./Accidentals');

Object.defineProperty(Scales,"MAJORARR",{value:
	[[0,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [2,Accidentals.NAT,Accidentals.NAT],
	 [1,Accidentals.NAT,Accidentals.NAT]],writable:false,enumerable:true,configurable:false});

Object.defineProperty(Scales,"MAJOR",{value:"MAJORARR",writable:false,enumerable:true,configurable:false});

Object.defineProperty(Scales,"NATMIN",{value:"NATMINARR",writable:false,enumerable:true,configurable:false});

Object.defineProperty(Scales,"HRMMIN",{value:"HRMMINARR",writable:false,enumerable:true,configurable:false});

Object.defineProperty(Scales,"MELMIN",{value:"MELMINARR",writable:false,enumerable:true,configurable:false});

module.exports = Scales;
