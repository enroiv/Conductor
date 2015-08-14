/**
 * New node file
 */

/*
 * each circle node has:
 * Major scale name/enharmonic
 * parallel minor scale name/enharmonic
 * number of sharps
 * number of flats
 * 
 * it tells which notes are sharp/flat in each signature
 */

var ModDoublyLinkedList = require('../utils/ModDoublyLinkedList');
var SimpleNote = require('./SimpleNote');
var Accidentals = require('./Accidentals');

var sigAccs = new ModDoublyLinkedList('F');
sigAccs.add('C');
sigAccs.add('G');
sigAccs.add('D');
sigAccs.add('A');
sigAccs.add('E');
sigAccs.add('B');

var CircleNode = function(idx){
	var majNms = [];	// Major scale name(s).
	var minNms = [];	// Minor scale name(s).
	var nShrps = 0;		// Number of sharps in the signature.
	var nFlats = 0;		// Number of flats in the signature.
	
	if(idx <= 0){
		majNms.push(new SimpleNote('C'));
		minNms.push(new SimpleNote('A'));
	}
	else{
		var cnt;
		var ntNm;
		var nt;
		
		// Get the number of sharps
		nShrps = (idx<=7)?idx:0;
		
		// Get the number of flats
		nFlats = (idx<=4)?0:12-idx;
		
		if(nShrps > 0){
			// Extract the last sharp for the signature
			sigAccs.getTail();
			for(cnt=0;cnt<nShrps;cnt++){
				ntNm = sigAccs.next();
			}
			
			// Add the sharp note name
			nt = new SimpleNote(ntNm,Accidentals.SHARP);
			majNms.push(nt.step(1));
		}
		
		if(nFlats > 0){
			// Extract the name of the flat signature
			ntNm = sigAccs.getHead();
			cnt = 1;
			
			while(cnt<nFlats){
				ntNm = sigAccs.prev();
				cnt++;
			}
			
			nt = (nFlats > 1) ? new SimpleNote(ntNm,Accidentals.FLAT) : new SimpleNote(ntNm);
			majNms.push(nt);
		}
		
		minNms = majNms.map(function(it,idx){
			return it.step(-3).altName(it.getAccidentals());
		});
		
	}
	
	this.getMajNms = function(){return majNms;};
	this.getMinNms = function(){return minNms;};
	
	this.toString = function(){
		var s = '';
		
		s += majNms.reduce(function(acc,it){
			return acc + ' '+it.toString();
		},'Major Key Names:\t');
		
		s += minNms.reduce(function(acc,it){
			return acc + ' '+it.toString();
		},'\nMinor Key Names:\t');
		
		s += '\n'+nShrps+' Sharps. '+nFlats+' Flats.\n';
		
		return s;
	};
};

var CircleOfFifths = function(){
	
	var circle;
	
	for(var cnt = 0;cnt<12;cnt++){
		if(cnt===0){
			circle = new ModDoublyLinkedList(new CircleNode(cnt));
		}
		else{
			circle.add(new CircleNode(cnt));
		}
	}
	
	this.show = function(){
		/*circle.getTail();
		
		for(var c=0;c<circle.size();c++){
			console.log(circle.next().toString());
		}*/
		console.log(this.toString());
	};
	
	
	this.toString = function(){
		return circle.convertToString(function(it){return ' '+it.toString();});
	};
	
	this.validate = function(n,s){
		
		var dflt = new SimpleNote('C');
		
		if (!(n instanceof SimpleNote) || (s/s !== 1)){
			// When bad data, return default C Major scale.
			return dflt;
		}
		
		// Find corresponding note name for the requested scale. 
		var pos = circle.find(n,function(needle,item){
			
			// Find scale type.
			var nmArr = (s <= CircleOfFifths.MAJ) ? 
				item.getMajNms() : 
				item.getMinNms();
			
			// Find equivalent note names in the scale.
			var ntArr = nmArr.filter(function(x){
				return x.equals(n);
			});
			
			// And return appropriate one.
			if(ntArr.length > 0){
				
				dflt = (ntArr.length === 1) ? ntArr[0] : ntArr.filter(function(x){
					return x.equalsStrict(n);
				})[0];
					
				return true;
			}
			else{
				return false;
			}
			
		});
		
		// Note was not found. This should never happen!
		if(pos < 0){
			console.log('Note was not found. This should never happen!');
		}
		
		return dflt;
	};
};

CircleOfFifths.MAJ = 1;
CircleOfFifths.MIN = 2;

var circleOfFifths = {
	MAJ: CircleOfFifths.MAJ,
	MIN: CircleOfFifths.MIN,
	cof: new CircleOfFifths()
};



module.exports = circleOfFifths;