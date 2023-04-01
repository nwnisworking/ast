
// import { CLOSE_TAG, DBL_QUOTE, END_TAG, EQUALS, KEY, OPEN_TAG, QUOTE, TAG_NAME, VALUE } from "./ast/tokentype.js"
// import Tree from "./ast/tree.js"
// import Tokenize from "./ast/tokenize.js"
// import Token from "./ast/token.js"

// /**
//  * @typedef NodeEvent
//  * @property {object} detail
//  * @property {number} detail.index
//  * @property {Tokenize} detail.tokenize
//  * @property {Token} detail.new_token
//  */

// /**
//  * 
//  * @param {NodeEvent} param0 
//  */
// function open_tag({detail : {index, tokenize, new_token}} = {}){
// 	const {tokens, tree, value} = tokenize

// 	if(!tree.getNode(END_TAG).match(value[index + 1]))
// 		tokens.push(new_token, new Token(tree.getNode(TAG_NAME)))
// }

// function equals({detail : {index, tokenize, new_token}} = {}){
// 	const {tokens, tree, value} = tokenize

// 	if(!tree.getNode(DBL_QUOTE).match(value[index + 1]) && !tree.getNode(QUOTE).match(value[index + 1]))
// 		tokens.push(new_token, new Token(tree.getNode(VALUE)))
// }

// function quote({detail : {index, tokenize, new_token}} = {}){
// 	const {tokens, tree, value} = tokenize

// 	//if there is a slash before quote. It will be a word
// 	if(value[index - 1] === '\\')
// 		tokens.last().text(this.value === DBL_QUOTE ? '"' : "'")
// 	else if(value[index - 1] === '=')
// 		tokens.push(new_token, new Token(tree.getNode(VALUE)))
// 	else if(value[index + 1] !== ']')
// 		tokens.push(new_token, new Token(tree.getNode(KEY)).text(''))
// }

// /**
//  * 
//  * @param {NodeEvent} param0 
//  */
// function tag_name({detail : {index, tokenize}} = {}){
// 	const {value, tree, tokens} = tokenize

// 	if(!tree.getNode(CLOSE_TAG).match(value[index + 1]))
// 		tokens.push(new Token(tree.getNode(KEY)))
// }

// function value({detail : {index, tokenize}} = {}){
// 	const {value, tree, tokens} = tokenize

// 	if(!tree.getNode(CLOSE_TAG).match(value[index + 1]))
// 		tokens.push(new Token(tree.getNode(KEY)))
// }

// /**
//  * 
//  * @param {Tree} tree 
//  */
// export function treeHandler(tree){
// 	tree.getNode(OPEN_TAG).addEventListener('match', open_tag)
// 	tree.getNode(TAG_NAME).addEventListener('finished', tag_name)
// 	tree.getNode(EQUALS).addEventListener('match', equals)
// 	tree.getNode(VALUE).addEventListener('finished', value)
// 	tree.getNode(QUOTE).addEventListener('match', quote)
// 	tree.getNode(DBL_QUOTE).addEventListener('match', quote)
// }