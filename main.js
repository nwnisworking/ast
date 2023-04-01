import Node from "./ast/node.js"
import Token from "./ast/token.js"
import Tokenize from "./ast/tokenize.js"
import TokenizeArray from "./ast/tokenizearray.js"
import { CLOSE_TAG, END_TAG, EQUALS, NEW_LINE, OPEN_TAG, TAG_NAME, VALUE, WORD, KEY, QUOTE, DBL_QUOTE } from "./ast/tokentype.js"
import Tree from "./ast/tree.js"
import { treeHandler } from './func.js'
/**
 * @typedef NodeEvent
 * @property {object} detail
 * @property {number} detail.index
 * @property {TokenizeArray} detail.tokenize
 * @property {Token} detail.new_token
 */

const tree = new Tree()

tree
.createNode('\n', NEW_LINE)
.createNode('[', OPEN_TAG)
.createNode(']', CLOSE_TAG)
.createNode(':', END_TAG)
.createNode('=', EQUALS)
.createNode('"', DBL_QUOTE)
.createNode("'", QUOTE)
.createNode(/\w+/, WORD)
.createNode(/\w+/, TAG_NAME)
.createNode(/\w+/, KEY)
.createNode(/\w+/, VALUE)

tree.getNode(QUOTE)
.set(
	tree.getNode(VALUE),
	tree.getNode(KEY),
	tree.getNode(CLOSE_TAG)
)

tree.getNode(DBL_QUOTE)
.set(
	tree.getNode(VALUE),
	tree.getNode(KEY),
	tree.getNode(CLOSE_TAG)
)

tree
.getNode(NEW_LINE)
.set(
	tree.getNode(NEW_LINE), 
	tree.getNode(WORD),
	tree.getNode(OPEN_TAG)
)

tree.getNode(WORD)
.set(
	tree.getNode(NEW_LINE),
	tree.getNode(WORD),
	tree.getNode(OPEN_TAG)
)

tree.getNode(OPEN_TAG)
.set(
	tree.getNode(END_TAG),
	tree.getNode(TAG_NAME)
)

tree.getNode(END_TAG)
.set(
	tree.getNode(TAG_NAME)
)

tree.getNode(TAG_NAME)
.set(
	tree.getNode(CLOSE_TAG),
	tree.getNode(KEY)
)

tree.getNode(KEY)
.set(
	tree.getNode(KEY),
	tree.getNode(EQUALS),
	tree.getNode(CLOSE_TAG)
)

tree.getNode(EQUALS)
.set(
	tree.getNode(DBL_QUOTE),
	tree.getNode(QUOTE),
	tree.getNode(VALUE)
)

tree.getNode(VALUE)
.set(
	tree.getNode(KEY),
	tree.getNode(CLOSE_TAG)
)

tree.getNode(CLOSE_TAG)
.set(
	tree.getNode(NEW_LINE),
	tree.getNode(WORD)
)



const str = document.getElementById('sample-text')
const tokenize = new Tokenize(str.textContent, tree)

treeHandler(tree)

tokenize.create()
console.log(tokenize.tokens.slice(44, 81))
