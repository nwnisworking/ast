import Node from "./node.js"

export default class Tree{
	/** 
	 * All the nodes from token type
	 * @type {Map<value, Node>}
	 */
	#nodes = new Map

	/**
	 * Create node and add them to the tree
	 * @param {string|RegExp} match 
	 * @param {number} value 
	 * @returns {Tree}
	 */
	createNode(match, value){
		this.#nodes.set(value, new Node(match, value))
		return this
	}

	/**
	 * Get available node from the tree
	 * @param {string|number} node
	 * @returns {Node}
	 */
	getNode(node){
		if(typeof node === 'string')
			return [...this.#nodes.values()].find(e=>e.name === node)
		else
			return this.#nodes.get(node)
	}

	getAllNodes(){
		return [...this.#nodes.values()]
	}
}