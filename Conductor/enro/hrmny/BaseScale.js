/**
 * BaseScale models the things that a generic scale has and can do:
 * - A set of rules for deciding which notes belong to the scale
 * - A way to traverse the scale up and down
 * - 
 */
var BaseScale = function(t,s){
	var Accidentals = require('./Accidentals');
	var SimpleNote = require('./SimpleNote');
	var Scales = require('./Scales');
	var ModDoublyLinkedList = require('../utils/ModDoublyLinkedList');
	
	// Throw error on invalid note.
	if(!(t instanceof SimpleNote)){
		throw new TypeError("Invalid tonic note: " + t);
	}
	
	// Throw error on invalid scale.
	if(Scales[s] === undefined){
		throw new TypeError("Invalid scale name: " + s);
	}
	
	var tonic = t;
	var scalePattern = Scales[s];
	
	// Add tonic note and accidentals (modifiers) to the scale.
	var scale = new ModDoublyLinkedList([tonic.step(scalePattern[0][0]),	// Tonic note.
	                                     scalePattern[0][1],				// Accidentals on the way up.
	                                     scalePattern[0][2]]);				// Accidentals on the way down.
	
	for(var i=1;i<scalePattern.length;i++){
		
		// Add remaining note and accidentals to the scale.
		scale.add([scale.getTail()[0].step(scalePattern[i][0]),
		           scalePattern[i][1],
		           scalePattern[i][2]]);
		
	}
	
	console.log(scale.convertToString(function(it){
		return ' [' + it[0].toString()+','+it[1].toString()+','+it[2].toString()+'] ';
	}));
	
	/*
	 * Simple note comparison auxiliary function.
	 */
	var scaleElemComp = function(needle,link){
		var ntNeedle = needle[0];
		var ntLink = (needle[1]===0)?link[0].step(link[2]):link[0].step(link[1]);
		
		return ntNeedle.equals(ntLink);
	};
	
	/*
	 * Find the initial note of a scale traversal.
	 * 
	 */
	var getInitialNote = function(note,sz){
		// Find the first element of the traversal
		var pos;
		var stepSz = 0;
		
		do{
			
			var needle = (sz < 0) ? [note.step(stepSz),0,1] : [note.step(stepSz),1,0];
			pos = scale.find(needle,scaleElemComp);
			stepSz++;
			
		} while(pos < 0 && stepSz < 12);
		
		if(pos < 0){
			pos = 0;
		} 
		
		return scale.get(pos)[0].altName(note.getAccidentals());
	};
	
	var addNextNote = function(trv,sz){
		
		var nt;
		
		for(var count=0;count<Math.abs(sz);count++){
			var lnk = (sz < 0) ? scale.prev() : scale.next();
			console.log('Next scale element is: '+lnk);
			nt = (sz < 0) ? lnk[0].step(lnk[2]) : lnk[0].step(lnk[1]);
			
		}
		console.log('Got note: '+nt+'\ttrv so far is: '+trv);
		
		var last = new SimpleNote(trv[trv.length-1].getName());
		var cand = new SimpleNote(nt.getName());
		
		if(Math.abs(last.distanceTo(cand)) > 2){
			nt = (sz < 0) ? nt.altName(Accidentals.FLAT) : nt.altName(Accidentals.SHARP);
		} else if(nt.getName() === trv[trv.length-1].getName()){
			nt = (sz < 0) ? nt.altName(Accidentals.SHARP) : nt.altName(Accidentals.FLAT) ;
		}
		
		var nAcc = nt.getAccidentals();
		
		var isAccCorrect = trv.reduce(function(accu,it,idx,arr){
			var acc = it.getAccidentals();
			return accu && (acc === Accidentals.NAT || acc === nAcc);
		},true);
		
		if(!isAccCorrect){
			trv = trv.map(function(it,idx,arr){
				var acc = it.getAccidentals();
				if(acc !== nAcc && acc !== Accidentals.NAT){
					return it.altName(nAcc);
				}
				return it;
			});
		}
		
		trv.push(nt);
		return trv;
	};
	
	/*
	 * Move along the scale.
	 */
	var traverse = function(stepSz,numSteps,initNote){
		/* Some initializations:
		 * If invalid traversal size, default it to 1.
		 * If invalid number of steps, default it to 8 (1 octave traversal).
		 * If number of steps is negative, make it positive.
		 * If initial note is invalid, default it to the tonic.
		 */
		var sz = (stepSz/stepSz !== 1) ? 1 : stepSz;
		var steps = (numSteps/numSteps !== 1) ? 8 : ((numSteps<0) ? -1*numSteps : numSteps);
		var note = (initNote instanceof SimpleNote) ? initNote : tonic;
		// Initialization is complete.
		console.log('Getting initial note from: '+note+' with size: '+sz);
		note = getInitialNote(note,sz);
		console.log('First note is: '+note+' and size is: '+sz);
		var traversal = [note];
		
		console.log('Traversal is now: '+traversal+'\n---------------------\n');
		for(var count = 1;count<steps;count++){
			traversal = addNextNote(traversal,sz);
			console.log('Traversal is now: '+traversal+'\n---------------------\n');
		}
		
		return traversal;
		
	};
	
	/*
	 * Traverse the scale upwards.
	 */
	this.ascend = function(stepSz,numSteps,/*optional*/initNote){
		return traverse(stepSz,numSteps,initNote);
	};
	
	/*
	 * Traverse the scale downwards.
	 */
	this.descend = function(stepSz,numSteps,/*optional*/initNote){
		return traverse((stepSz===null || stepSz === undefined) ? -1 : (-1*stepSz),numSteps,initNote);
	};
	
	this.showTraversal = function(trv){
		console.log(trv.reduce(function(acc,it,idx,arr){
			return acc + it.toString()/*it.getName()+ ' '+it.getAccidentals()*/+((idx===arr.length-1)?']':',');
		},'['));
	};
};

module.exports = BaseScale;