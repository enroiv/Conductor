/**
 * New node file
 */
var ModCalc = function(n){
	if(n/n !== 1){
		throw new TypeError("Invalid modulus: " + n);
	}
};

module.exports = ModCalc;