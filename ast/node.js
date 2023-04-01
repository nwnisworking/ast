import * as TokenType from './tokentype.js'

const token_name = value=>Object.keys(TokenType).find(e=>TokenType[e] === value)

export default class Node extends EventTarget{
	/**
	 * The character to match either by RegExp or character
	 * @type {string|RegExp}
	 */
	match

	/**
	 * Name of the node
	 * @type {string}
	 */
	name

	/**
	 * The value for the name
	 */
	value

	/**
	 * The precceding node before the current node 
	 * @type {Set<Node>} 
	 */
	prev = new Set

	/**
	 * The next node after the current node
	 * @type {Set<Node}
	 */
	next = new Set

	get type(){ return this.match.constructor.name === 'String' ? 'CHAR' : 'WORD'}

	static FINISHED(data){ return new CustomEvent('finished', {detail : data})}

	static MATCH(data){ return new CustomEvent('match', {detail : data}) }

	/**
	 * 
	 * @param {string|RegExp} match 
	 * @param {number} int_value 
	 */
	constructor(match, int_value){
		super()
		this.value = int_value
		this.match = match
		this.name = token_name(int_value)
	}

	/**
	 * Check if node is the correct match
	 * @param {Node|number} node
	 * @returns {boolean}
	 */
	is(node){
		if(typeof node === 'number')
			return this.value === node
		else
			return this === node
	}

	/**
	 * Find if value match the node
	 * @param {string} value
	 * @return {boolean}
	 */
	match(value){
		if(typeof this.match === 'string')
			return value === this.match
		else if(this.match instanceof RegExp)
			return this.match.test(value)
	}

	/**
	 * Set the next node after the current
	 * @param  {...Node} nodes 
	 */
	set(...nodes){
		nodes.forEach(node=>{
			this.next.add(node)
			node.prev.add(this)
		})

		return this
	}

	/**
	 * Find if node is contained in prev or next
	 * @param {'prev'|'next'} dir 
	 * @param {Node} node 
	 * @returns {boolean}
	 */
	contains(dir, node){
		if(dir !== 'prev' && dir !== 'next') 
			throw new Error('dir requires value to be "next" or "prev"')

		return this[dir].has(node)
	}
}

