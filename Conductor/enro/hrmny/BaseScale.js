/**
 * BaseScale models the things that a generic scale has and can do:
 * - A set of rules for deciding which notes belong to the scale
 * - A way to traverse the scale up and down
 * - 
 */
var BaseScale = function(t,s){
	var SimpleNote = require('./SimpleNote');
	var Scales = require('./Scales');
	var ModDoublyLinkedList = require('../utils/ModDoublyLinkedList');
	
	if(!(t instanceof SimpleNote)){
		throw new TypeError("Invalid tonic note: " + t);
	}
	
	if(Scales[s] === undefined){
		throw new TypeError("Invalid scale name: " + s);
	}
	
	var tonic = t;
	var scalePattern = Scales[s];
	var scale = new ModDoublyLinkedList(scalePattern[0]);
	
	for(var i=1;i<scalePattern.length;i++){
		scale.add(scalePattern[i]);
	}
	
	/*
	 * Find a note before specified note in the scale.
	 */
	var getNoteBefore = function(n){
		
		var it = scale.getHead().getItem();
		var nt = tonic.step(-1*(it[0]+it[1]));
		var prevDist = n.distanceTo(nt)[0];
		
		do{
			it = scale.prev().getItem();
			nt = nt.step(-1*(it[0]+it[1]));
			var dist = n.distanceTo(nt)[0];
			
			if(prevDist === 0 || dist > prevDist){
				break;
			}
			
			prevDist = dist;
		}
		while(true);
		
		return nt;
	};
	
	/*
	 * Find a note after the specified note in the scale.
	 */
	var getNoteAfter = function(n){
		
		var it = scale.getHead().getItem();
		var nt = tonic.step(it[0]+it[1]);
		var prevDist = nt.distanceTo(n)[0]; 
		
		do{
			it = scale.next().getItem();
			nt = nt.step(it[0]+it[1]);
			var dist = nt.distanceTo(n)[0];
			
			if(prevDist === 0 || dist > prevDist){
				break;
			}
			
			prevDist = dist;
		}
		while(true);
		
		return nt;
	};
	
	/*
	 * Move along the scale.
	 */
	var traverse = function(stepSz,numSteps,initNote){
		var sz = (stepSz/stepSz !== 1) ? 1 : stepSz;
		var steps = (numSteps/numSteps !== 1) ? 8 : ((numSteps<0) ? -1*numSteps : numSteps);
		var note = (initNote instanceof SimpleNote) ? initNote : tonic;
		var traversal = [note];
		var numStepCtr,stepSzCtr=0;
		var nt = note;
		
		for(numStepCtr=1;numStepCtr<steps;numStepCtr++){
			
			stepSzCtr = 0;
			
			do{
				nt = (sz < 0) ? getNoteBefore(nt) : getNoteAfter(nt);
				stepSzCtr++;
			}  while(stepSzCtr < Math.abs(sz));
			
			traversal.push(nt);
		
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
		return traverse(-1*stepSz,numSteps,initNote);
	};
};

module.exports = BaseScale;