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
		switch(name.toUpperCase()){
		case 'A':
		case 'B':
		case 'C':
		case 'D':
		case 'E':
		case 'F':
		case 'G':
			note_name = name;
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
		
		return 'Note: [ ' + note_name + ' ' + a + ' ]';
	};
	
	this.getName = function(){return note_name;};
	this.getAccidentals = function(){return note_accidentals;};
	
	this.step = function(sz){
		
		if(sz/sz !== 1 || sz % 12 === 0 ){
			return Object.create(this);
		}
		
		var pos = mcalc.add(mcalc.add((chrom_scale.indexOf(note_name) + 1),note_accidentals),sz);
		
		var nNm = chrom_scale[--pos];
		var nAc;
		
		if(/#/.test(nNm)){
			if(sz > 0){
				nNm = chrom_scale[--pos];
				nAc = Accidentals.SHARP;
			}
			else{
				pos = mcalc.add(++pos,1);
				nNm = chrom_scale[--pos];
				nAc = Accidentals.FLAT;
			}
		}
		
		return new SimpleNote(nNm,nAc);
	};
	
	this.equals = function(that){
		try{
			return this.step(1).toString() === that.step(1).toString();
		} catch(err){
			throw new TypeError("Wrong note: " + that);
		}
		
	};
	
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
};

module.exports = SimpleNote;