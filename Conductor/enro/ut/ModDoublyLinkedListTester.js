/**
 * New node file
 */
var ModDoublyLinkedList = require('../utils/ModDoublyLinkedList');

var cmp = function (a,b){
	return a.toString() === b.toString();
};

var Link = function(name){
	this.name=name;
	this.toString = function(){return this.name;};
};

var links = [new Link("1"),new Link("2"),new Link('3'),new Link('4'),new Link('5')];

var mdll = new ModDoublyLinkedList(links[0]);
mdll.add(links[1]);
mdll.add(links[2]);
mdll.add(links[3]);

mdll.getTail();
for(var i=0, it=mdll.next();i<10;i++){
	console.log(it.toString());
	it = mdll.next();
}
console.log('-----------\n\n');

mdll.getHead();
for(var i=0, it=mdll.prev();i<10;i++){
	console.log(it.toString());
	it = mdll.prev();
}
console.log('-----------\n\n');

var idx = mdll.find(links[2],cmp);

console.log('idx: '+idx);
console.log(mdll.get(idx).toString()+'\n--------------\n');

var mdllBef = new ModDoublyLinkedList(links[4]);
mdllBef.addBefore(links[0],mdllBef.find(links[4],cmp));
mdllBef.addAfter(links[3],mdllBef.find(links[0],cmp));
mdllBef.addAfter(links[1],mdllBef.find(links[4],cmp));
mdllBef.add(links[2]);

mdllBef.getTail();

for(var i=0, it=mdllBef.next();i<10;i++){
	console.log(it.toString());
	it = mdllBef.next();
}
console.log('-----------\n\n');

mdllBef.getHead();
for(var i=0, it=mdllBef.prev();i<10;i++){
	console.log(it.toString());
	it = mdllBef.prev();
}
console.log('-----------\n\n');

console.log('\nmdllBef as string:\n');
console.log(mdllBef.convertToString(function(it){
	return ' '+it.toString();
}));