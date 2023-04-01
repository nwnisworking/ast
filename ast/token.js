import Node from "./node.js"

export default class Token{
	/**
	 * The text concatenated during tokenization
	 * @type {?string}
	 */
	#text = null
	
	/**
	 * The current token node that inhabits the token
	 * @type {Node}
	 */
	node

	/**
	 * Previous token reference
	 * @type {Token}
	 */
	prev

	/**
	 * Next token reference if any
	 * @type {?Token}
	 */
	next = null

	/**
	 * The current type token is behaving
	 * @type {number}
	 */
	get type(){
		return this.node.value
	}

	constructor(node){
		this.node = node
	}

	/**
	 * Change the token node
	 * @param {Node} node 
	 */
	changeNode(node){
		this.node = node
		return this
	}

	/**
	 * Check if token matches the node
	 * @returns {boolean}
	 */
	matchNode(){
		return this.node.match(this.text)
	}

	/**
	 * Add character/string to text
	 * @param {string} str 
	 * @returns {Token}
	 */
	text(str){
		if(!this.#text)
			this.#text = str
		else
			this.#text+= str

		return this
	}

}