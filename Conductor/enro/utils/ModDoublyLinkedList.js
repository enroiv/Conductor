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
	 * Get the list's head element node.
	 */
	var getHeadNode = function(){
		var elm = lst.filter(function(it){
			return it
			.getNodeProperties()
			.indexOf(ListNode.HEAD) >= 0 ? true : false;
		})[0];
		
		curr = elm.getSelf();
		
		return elm;
	};
	
	/*
	 * Get the list's head element.
	 */
	this.getHead = function(){
		return getHeadNode().getItem();
	};
	
	/*
	 * Get the list's tail element node.
	 */
	var getTailNode = function(){
		var elm = lst.filter(function(it){
			return it
			.getNodeProperties()
			.indexOf(ListNode.TAIL) >= 0 ? true : false;
		})[0];
		
		curr = elm.getSelf();
		
		return elm;
	};
	
	/*
	 * Get the list's tail element.
	 */
	this.getTail = function(){
		return getTailNode().getItem();
	};
	
	/*
	 * Add a node to the list at tail position. The node is an object of type ListNode.
	 */
	this.add = function(l){
		var n = new ListNode(l);
		
		var tail = getTailNode();
		var head = getHeadNode();
		
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
		return lst[curr].getItem();
	};
	
	/*
	 * Get the previous node in the list.
	 */
	this.prev = function(){
		
		curr = lst[curr].getPrev();
		return lst[curr].getItem();
	};
	
	/*
	 * Find the position of an element in the list.
	 * If the element is not found, -1 is returned.
	 * 
	 * l: Element ('link') to find.
	 * cmp: Comparator function that takes 2 elements and returns true if they are equal and false otherwise.
	 */
	this.find = function(needle,cmpFunc){
		this.getTail();
		
		var last = curr;
		var idx;
		
		var it;
		var pos = -1;
		
		do{
			
			it = this.next();
			idx = curr;
			
			if(cmpFunc(needle,it)){
				pos = curr;
				break;
			}
			
		}
		while(idx !== last);
		
		return pos;
	};
	
	/*
	 * Add an element before the specified index.
	 */
	this.addBefore=function(l,idx){
		if(idx < 0 || idx > lst.length){
			throw new Error("Index out of bounds");
		}
		
		var elm = lst[idx];
		var prv = lst[elm.getPrev()];
		var n = new ListNode(l);
		
		n.setNext(prv.getNext()).setPrev(elm.getPrev()).setSelf(lst.length);
		
		var elmProps = elm.getNodeProperties(); 
		
		if(elmProps.indexOf(ListNode.HEAD) >= 0){
			n.setNodeProperties(ListNode.HEAD);
			
			if(elmProps.indexOf(ListNode.TAIL) >= 0){
				elm.setNodeProperties(ListNode.TAIL);
			}
			else{
				elm.setNodeProperties(ListNode.LINK);
			}
			
		} else{
			n.setNodeProperties(ListNode.LINK);
		}
		
		elm.setPrev(n.getSelf());
		prv.setNext(n.getSelf());
		
		lst.push(n);
	};
	
	/*
	 * Add an element after the specified index.
	 */
	this.addAfter=function(l,idx){
		
		if(idx < 0 || idx > lst.length){
			throw new Error("Index out of bounds");
		}
		
		var elm = lst[idx];
		var nxt = lst[elm.getNext()];
		var n = new ListNode(l);
		
		n.setNext(elm.getNext()).setPrev(nxt.getPrev()).setSelf(lst.length);
		
		var elmProps = elm.getNodeProperties(); 
		if(elmProps.indexOf(ListNode.TAIL) >= 0){
			n.setNodeProperties(ListNode.TAIL);
			
			if(elmProps.indexOf(ListNode.HEAD) >= 0){
				elm.setNodeProperties(ListNode.HEAD);
			}
			else{
				elm.setNodeProperties(ListNode.LINK);
			}
			
		} else{
			n.setNodeProperties(ListNode.LINK);
		}
		
		elm.setNext(n.getSelf());
		nxt.setPrev(n.getSelf());
		
		lst.push(n);
		
	};
	
	/*
	 * Get the element indexed by the parameter.
	 */
	this.get=function(idx){
		if(idx < 0 || idx > lst.length){
			throw new Error("Index out of bounds");
		}
		
		curr = idx;
		return lst[idx].getItem();
	};
	
	this.convertToString = function(f){
		var it;
		var s='';
		
		this.getHead();
		
		do{
			it = lst[curr];
			curr = it.getNext();
			s = s+f(it.getItem());
		} while(it.getNodeProperties().indexOf(ListNode.TAIL)<0);
		
		return s;
		
	};
};

module.exports = ModDoublyLinkedList;