/**
 * New node file
 */
var ModDoublyLinkedList = require('../utils/ModDoublyLinkedList');

var Link = function(name){
	this.name=name;
	this.toString = function(){return this.name;};
};

var mdll = new ModDoublyLinkedList(new Link("Uno"));
mdll.add(new Link('dos'));
mdll.add(new Link('tres'));
mdll.add(new Link('quattro'));


for(var i=0, it=mdll.next();i<10;i++){
	console.log('----------------------\n'+it.toString());
	console.log(it.getItem().toString());
	it = mdll.next(it);
}/**/

for(var i=0, it=mdll.prev();i<10;i++){
	console.log('----------------------\n'+it.toString());
	console.log(it.getItem().toString());
	it = mdll.prev(it);
}/**/