/**
 * Modified Doubly Linked List
 * 
 * Used for navigating up and down a scale. Unlike a regular doubly linked list, the way up
 * need not be the same as the way down!
 * 
 */
var ListNode = require('./ListNode');
//traverse up
//traverse down
// indert before
//insert after
//remove
var ModDoublyLinkedList = function(link){
	
	var listNode = new ListNode(link);
	
	var lst = [listNode
	       	.setPrev(0)
	    	.setNext(0)
	    	.setSelf(0)
	    	.setNodeProperties(ListNode.HEAD,ListNode.TAIL)];
	
	var curr = 0;
	
	/*
	 * Get the list's head element.
	 */
	this.getHead = function(){
		var elm = lst.filter(function(it){
			return it
			.getNodeProperties()
			.indexOf(ListNode.HEAD) >= 0 ? true : false;
		})[0];
		
		curr = elm.getSelf();
		
		return elm;
	};
	
	/*
	 * Get the list's tail element.
	 */
	this.getTail = function(){
		var elm = lst.filter(function(it){
			return it
			.getNodeProperties()
			.indexOf(ListNode.TAIL) >= 0 ? true : false;
		})[0];
		
		curr = elm.getSelf();
		
		return elm;
	};
	
	/*
	 * Add a node to the list. The node is an object of type ListNode.
	 */
	this.add = function(l){
		var n = new ListNode(l);
		
		var tail = this.getTail();
		var head = this.getHead();
		
		n.setNext(tail.getNext()).setPrev(head.getPrev()).setSelf(lst.length).setNodeProperties(ListNode.TAIL);
		lst.push(n);
		
		tail.setNext(lst.length-1).setNodeProperties(ListNode.LINK);
		
		head.setPrev(lst.length-1).setNodeProperties(ListNode.HEAD);
	};
	
	/*
	 * Get the next node in the list.
	 */
	this.next = function(){
		curr = lst[curr].getNext();
		return lst[curr];
	};
	
	/*
	 * Get the previous node in the list.
	 */
	this.prev = function(){
		
		curr = lst[curr].getPrev();
		return lst[curr];
	};
};

module.exports = ModDoublyLinkedList;