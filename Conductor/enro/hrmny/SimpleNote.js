/**
 * New node file
 */
var Accidentals = require('./Accidentals');
var ModCalc = require('../utils/ModCalc');

var SimpleNote = function(name,accidentals){
	var note_name;
	var note_accidentals;
	var chrom_scale = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
	var mcalc = new ModCalc(12);
	
	try{
		switch((note_name = name.toUpperCase())){
		case 'A':
		case 'B':
		case 'C':
		case 'D':
		case 'E':
		case 'F':
		case 'G':
			break;
		default:
			throw new TypeError("Wrong note name: " + name);
		}
	}
	catch (err){
		throw new TypeError("Wrong note name: " + name);
	}
	
	switch(accidentals){
	case Accidentals.DFLAT:
	case Accidentals.FLAT:
	case Accidentals.NAT:
	case Accidentals.SHARP:
	case Accidentals.DSHARP:
		note_accidentals = accidentals;
		break;
	default:
		note_accidentals = Accidentals.NAT;
		break;
	}
	
	this.toString = function(){
		var a = 'NAT';
		
		for(var prop in Accidentals){
			if(Accidentals[prop] === note_accidentals){
				a = prop;
			}
		}
		
		return /*'Note: [ ' + */note_name + ' ' + a /*+ ' ]'*/;
	};
	
	this.getName = function(){return note_name;};
	this.getAccidentals = function(){return note_accidentals;};
	
	/*
	 * From a given note, move [sz] number of positions within the chromatic scale.
	 * sz can be any integer number.
	 */
	this.step = function(sz){
		
		// If invalid step size or step size is multiple of 12, return the same note.
		if(sz/sz !== 1 || sz % 12 === 0 ){
			return Object.create(this);
		}
		
		var pos = mcalc.add(mcalc.add((chrom_scale.indexOf(note_name) + 1),note_accidentals),sz);
		
		var nNm = chrom_scale[--pos];
		var nAc;
		
		if(/#/.test(nNm)){
			nNm = chrom_scale[--pos];
			nAc = Accidentals.SHARP;
		}
		
		return new SimpleNote(nNm,nAc);
	};
	
	/*
	 * For any given note, find its alternate name, for example:
	 * G# -> Aflat
	 */
	this.altName = function(acc){
		var nt = null;
		var self = this;
		var found = false;
		
		try{
			SimpleNote.alt_names.forEach(function(names){
				
				nt = names[acc + 2];
				
				if(nt!==null){
					if(self.equals(nt)===true){
						found = true;
						throw new Error(found);
					}
				}
			}); 
		} catch(ex){
			if(found){
				return nt.step(0);
			}
		}
		
		// If nothing found, return the same note
		return this;
	};
	
	/*
	 * Find out whether two notes are equivalent.
	 */
	this.equals = function(that){
		try{
			return this.step(1).toString() === that.step(1).toString();
		} catch(err){
			throw new TypeError("Wrong note: " + that);
		}
		
	};
	
	/*
	 * Strict equality test.
	 */
	this.equalsStrict = function(that){
		return ((this.getName() === that.getName()) && (this.getAccidentals() === that.getAccidentals()));
	};
	
	/*
	 * For any note, find its distance to another note.
	 */
	this.distanceTo = function(that){
		var dist = [0,0];
		
		if(!this.equals(that)){
			var myPos = mcalc.add(chrom_scale.indexOf(note_name)+1,note_accidentals);
			var yourPos = mcalc.add(chrom_scale.indexOf(that.getName()) + 1,that.getAccidentals());
			var offs = mcalc.add(yourPos,-1 * myPos);
			dist = [offs, -12 + offs];
		}
		
		return dist;
	};
	
	/*
	 * Compare this note with another note. Return values:
	 * negative when this is less than that.
	 * 0 when this equals that.
	 * positive when this is more than that.
	 * 
	 * By convention 'this' is less than 'that' when 'that' is up to the seventh degree of the
	 * chromatic scale above 'this'. When 'that' goes from the eighth to the twelfth degree, 
	 * 'this' is more than that.
	 */
	this.compare = function(that){
		
		if(this.equals(that)){
			return 0;
		}
		
		var dis = this.distanceTo(that);
		
		return (-1 * ((Math.abs(dis[1]) >= dis[0]) ? dis[0] : dis[1]));
	};
};

/*
 * Alternate names of all notes:
 * [DFLAT,FLAT,NAT,SHARP,DSHARP]
 */
Object.defineProperty(SimpleNote,"alt_names",{value:
[
[new SimpleNote('B',Accidentals.DFLAT),null,new SimpleNote('A'),null,new SimpleNote('G',Accidentals.DSHARP)],
[new SimpleNote('E',Accidentals.DFLAT),null,new SimpleNote('D'),null,new SimpleNote('C',Accidentals.DSHARP)],
[new SimpleNote('A',Accidentals.DFLAT),null,new SimpleNote('G'),null,new SimpleNote('F',Accidentals.DSHARP)],
[null,new SimpleNote('C',Accidentals.FLAT),new SimpleNote('B'),null,new SimpleNote('A',Accidentals.DSHARP)],
[null,new SimpleNote('F',Accidentals.FLAT),new SimpleNote('E'),null,new SimpleNote('D',Accidentals.DSHARP)],
[new SimpleNote('D',Accidentals.DFLAT),null,new SimpleNote('C'),new SimpleNote('B',Accidentals.SHARP),null],
[new SimpleNote('G',Accidentals.DFLAT),null,new SimpleNote('F'),new SimpleNote('E',Accidentals.SHARP),null],
[null,new SimpleNote('D',Accidentals.FLAT),null,new SimpleNote('C',Accidentals.SHARP),new SimpleNote('B',Accidentals.DSHARP)],
[null,new SimpleNote('G',Accidentals.FLAT),null,new SimpleNote('F',Accidentals.SHARP),new SimpleNote('E',Accidentals.DSHARP)],
[new SimpleNote('F',Accidentals.DFLAT),new SimpleNote('E',Accidentals.FLAT),null,new SimpleNote('D',Accidentals.SHARP),null],
[new SimpleNote('C',Accidentals.DFLAT),new SimpleNote('B',Accidentals.FLAT),null,new SimpleNote('A',Accidentals.SHARP),null],
[null,new SimpleNote('A',Accidentals.FLAT),null,new SimpleNote('G',Accidentals.SHARP),null],
],writable:false,enumerable:true,configurable:false});



module.exports = SimpleNote;