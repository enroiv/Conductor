/**
 * New node file
 */
var ListNode = function(it){
		
	if(!(it instanceof Object)){
		throw new TypeError("Invalid node: "+it);
	}
	
	var item = it;
	var node_props = [];
	var node_links = [null,			// Link to previous element. 
	                  null,			// Current element.
	                  null];		// Link to next element.
		
	this.getItem = function(){return item;};
	this.getNodeProperties = function(){return node_props;};
	this.AddNodeProperty = function(p){node_props.push(p);return this;};
	this.getPrev = function(){return node_links[0];};
	this.getSelf = function(){return node_links[1];};
	this.getNext = function(){return node_links[2];};
	this.setPrev = function(l){node_links[0] = l;return this;};
	this.setSelf = function(l){node_links[1] = l;return this;};
	this.setNext = function(l){node_links[2] = l;return this;};
		
	this.setNodeProperties = function(){
		node_props = [];
		for(var i=0;i<arguments.length;i++){
			node_props[i]=arguments[i];
		}
		return this;
	};
	
	this.toString = function(){
		return it.toString()+
		'[prev:'+node_links[0]+
		',next:'+node_links[1]+
		'] ==> '+node_props.reduce(function(acc,it){
			
			if(it===ListNode.HEAD){
				return acc+'HEAD ';
			} 
			else if(it===ListNode.TAIL){
				return acc+'TAIL ';
			} 
			else{
				return acc+'LINK ';
			}
		},'');
	};
		
};

ListNode.HEAD = 0;
ListNode.LINK = 1;
ListNode.TAIL = 2;

module.exports = ListNode;
