export default class Node{
	/**@type {RegExp|string} */
	match
	
	/**@type {number} */
	value

	/**@type {string} */
	name

	/**@type {Node[]} */
	previous_node = []

	/**@type {Node[]} */
	next_node = []

	constructor(match, value, name){
		this.value = value
		this.match = match
		this.name = name
	}

	validate(str){
		if(typeof this.match === 'string')
			return this.match === str
		else
			return this.match.test(str)
	}

	/**
	 * 
	 * @param  {...Node} nodes 
	 */
	set(...nodes){
		nodes.forEach(node=>{
			this.next_node.push(node)
			node.previous_node.push(this)
		})
	}

	prevNode(node){
		return this.previous_node.indexOf(node) > -1
	}

	nextNode(node){
		return this.next_node.indexOf(node) > -1
	}
}

export const WORD = new Node(/[\w\d*~.]/, 1 << 0, 'WORD')

export const NEW_LINE = new Node('\n', 1 << 1, 'NEW_LINE')

export const OPEN_TAG = new Node('[', 1 << 2, 'OPEN_TAG')

export const END_TAG = new Node(':', 1 << 3, 'END_TAG')

export const TAG_NAME = new Node(/\w+/, 1 << 4 | WORD.value, 'TAG_NAME')

export const KEY = new Node(/\w+/, 1 << 5 | WORD.value, 'KEY')

export const EQUALS = new Node('=', 1 << 6, 'EQUALS')

export const VALUES = new Node(/\w+/, 1 << 7 | WORD.value, 'VALUES')

export const CLOSE_TAG = new Node(']', 1 << 8, 'CLOSE_TAG')

WORD.set(WORD, NEW_LINE, OPEN_TAG)
NEW_LINE.set(NEW_LINE, WORD, OPEN_TAG)
OPEN_TAG.set(END_TAG, TAG_NAME)
END_TAG.set(TAG_NAME)
TAG_NAME.set(CLOSE_TAG, KEY)
KEY.set(KEY, CLOSE_TAG, EQUALS)
EQUALS.set(VALUES)
VALUES.set(KEY, CLOSE_TAG)
CLOSE_TAG.set(NEW_LINE, WORD, OPEN_TAG)