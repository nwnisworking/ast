import Node from "./node.js"
import Token from "./token.js"
import TokenizeArray from "./tokenizearray.js"
import { WORD } from "./tokentype.js"
import Tree from "./tree.js"

export default class Tokenize{
	/**
	 * Node tree 
	 * @type {Tree}
	 */
	#tree

	/**
	 * The value to tokenize
	 * @type {string}
	 */
	value

	/**
	 * The tokens created from tokenize
	 * @type {TokenizeArray}
	 */
	tokens = new TokenizeArray

	get tree(){return this.#tree}

	constructor(str, tree){
		this.#tree = tree
		this.value = str
	}

	create(){
		
	}

	// create(){
	// 	const { value, tokens, tree } = this,
	// 	nodes = tree.getAllNodes(),
	// 	char_nodes = nodes.filter(e=>e.type === 'CHAR')

	// 	for(let i = 0; i < value.length; i++){
	// 		const chr = value[i],
	// 		token = tokens.last(),
	// 		is_match = char_nodes.findIndex(node=>node.match(chr))

	// 		if(is_match === -1){
	// 			if(chr !== ' ')
	// 				if(token && token.type & WORD)
	// 					token.text(chr)
	// 				else
	// 					tokens.push(new Token(tree.getNode(WORD)).text(chr))
	// 			else{
	// 				tokens.last().node.dispatchEvent(Node.FINISHED({index : i, tokenize : this}))
	// 				console.log(tokens.last(), token)
	// 				if(tokens.last() === token)
	// 					tokens.push(new Token(tree.getNode(WORD)))
	// 			}

	// 		}
	// 		else{
	// 			const len = tokens.length,
	// 			new_token = new Token(char_nodes[is_match]).text(chr)
	// 			new_token.node.dispatchEvent(Node.MATCH({index : i, tokenize : this, new_token}))
	// 			if(len === tokens.length)
	// 				tokens.push(new_token)
	// 		}
	// 	}

	// }
}