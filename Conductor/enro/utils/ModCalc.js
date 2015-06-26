/**
 * New node file
 */
var ModCalc = function(n){
	
	var checkNumber = function(args,skip){
		
		if(args[0]===undefined || args[0] === null){
			throw new TypeError("Invalid arguments");
		}
		
		for(var i=0;i<args.length;i++){
			
			if(args[i]!==skip){
				if(args[i]/args[i] !== 1){
					throw new TypeError("Invalid argument: " + args[i]);
				}
				
				if(args[i] % 1 !== 0){
					throw new TypeError("Invalid argument: " + args[i]);
				}
			}
			
		}
	};
	
	checkNumber([n]);
	var modulus = n;
	
	this.add = function(a, b){
		checkNumber([a,b],0);
		
		if(a <= 0){
			throw new Error("Invalid argument: " + a);
		}
		
		var rs = ((a % modulus) + (b % modulus)) % modulus;
		
		if(rs <= 0){
			rs = modulus + rs;
		}
		
		return rs;
	};
};

module.exports = ModCalc;