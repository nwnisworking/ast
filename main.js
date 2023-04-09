// import Node from "./ast/node.js"
// import Token from "./ast/token.js"
// import Tokenize from "./ast/tokenize.js"
// import TokenizeArray from "./ast/tokenizearray.js"
// import { CLOSE_TAG, END_TAG, EQUALS, NEW_LINE, OPEN_TAG, TAG_NAME, VALUE, WORD, KEY, QUOTE, DBL_QUOTE } from "./ast/tokentype.js"
// import Tree from "./ast/tree.js"
// import { treeHandler } from './func.js'
// /**
//  * @typedef NodeEvent
//  * @property {object} detail
//  * @property {number} detail.index
//  * @property {TokenizeArray} detail.tokenize
//  * @property {Token} detail.new_token
//  */

// const tree = new Tree()

// tree
// .createNode('\n', NEW_LINE)
// .createNode('[', OPEN_TAG)
// .createNode(']', CLOSE_TAG)
// .createNode(':', END_TAG)
// .createNode('=', EQUALS)
// .createNode('"', DBL_QUOTE)
// .createNode("'", QUOTE)
// .createNode(/\w+/, WORD)
// .createNode(/\w+/, TAG_NAME)
// .createNode(/\w+/, KEY)
// .createNode(/\w+/, VALUE)

// tree.getNode(QUOTE)
// .set(
// 	tree.getNode(VALUE),
// 	tree.getNode(KEY),
// 	tree.getNode(CLOSE_TAG)
// )

// tree.getNode(DBL_QUOTE)
// .set(
// 	tree.getNode(VALUE),
// 	tree.getNode(KEY),
// 	tree.getNode(CLOSE_TAG)
// )

// tree
// .getNode(NEW_LINE)
// .set(
// 	tree.getNode(NEW_LINE), 
// 	tree.getNode(WORD),
// 	tree.getNode(OPEN_TAG)
// )

// tree.getNode(WORD)
// .set(
// 	tree.getNode(NEW_LINE),
// 	tree.getNode(WORD),
// 	tree.getNode(OPEN_TAG)
// )

// tree.getNode(OPEN_TAG)
// .set(
// 	tree.getNode(END_TAG),
// 	tree.getNode(TAG_NAME)
// )

// tree.getNode(END_TAG)
// .set(
// 	tree.getNode(TAG_NAME)
// )

// tree.getNode(TAG_NAME)
// .set(
// 	tree.getNode(CLOSE_TAG),
// 	tree.getNode(KEY)
// )

// tree.getNode(KEY)
// .set(
// 	tree.getNode(KEY),
// 	tree.getNode(EQUALS),
// 	tree.getNode(CLOSE_TAG)
// )

// tree.getNode(EQUALS)
// .set(
// 	tree.getNode(DBL_QUOTE),
// 	tree.getNode(QUOTE),
// 	tree.getNode(VALUE)
// )

// tree.getNode(VALUE)
// .set(
// 	tree.getNode(KEY),
// 	tree.getNode(CLOSE_TAG)
// )

// tree.getNode(CLOSE_TAG)
// .set(
// 	tree.getNode(NEW_LINE),
// 	tree.getNode(WORD)
// )



// const str = document.getElementById('sample-text')
// const tokenize = new Tokenize(str.textContent, tree)

// treeHandler(tree)

// tokenize.create()
// console.log(tokenize.tokens.slice(44, 81))

import Node, {
	CLOSE_TAG,
	END_TAG,
	EQUALS,
	KEY,
	NEW_LINE,
	OPEN_TAG,
	TAG_NAME,
	VALUES,
	WORD
} from './ast/node.js'
import * as fs from 'fs'

const nodes = [
	OPEN_TAG,
	END_TAG,
	EQUALS,
	CLOSE_TAG,
	NEW_LINE,
	WORD,
	TAG_NAME,
	KEY,
	VALUES,
]
const str = fs.readFileSync('text.sml', {encoding : 'utf-8'}).replace(/\r/g, '')
const arr = []

for(let i = 0; i < str.length; i++){
	const chr = str[i],
	token = arr.at(-1)

	if(chr === ' '){
		const next_node = token.node?.next_node.find(e=>e.validate(str[i + 1]))

		arr.push({text : '', node : next_node})
	}

	for(let node of nodes){
		if(node.validate(chr)){
			switch(node){
				case WORD : 
					if(!token)
						arr.push({text : chr, node})
					else
						token.text+= chr
				break
				case NEW_LINE : 
					arr.push({text : chr, node})
				break
			}
		}

	}

}

console.log(arr)

// console.log(arr)

// for(let c of str){

// 	for(let node of nodes)
// 		if(node.validate(c)){
// 			switch(node){
// 				case OPEN_TAG : 
// 				break
// 				case NEW_LINE : 
// 					arr.push(node)
// 				break
				

// 			}
// 		}
// }