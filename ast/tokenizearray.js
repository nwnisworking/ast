import Token from "./token.js"

export default class TokenizeArray extends Array{
	/**
	 * Get the last token
	 * @returns {Token}
	 */
	last(){
		return this[this.length - 1]
	}

	/**
	 * Get the first token
	 * @returns {Token}
	 */
	first(){
		return this[0]
	}

	/**
	 * 
	 * @param  {...Token} data 
	 */
	push(...data){
		let cur_token = this.last()
		data.forEach(token=>{
			token.prev = cur_token
			if(cur_token)
				cur_token.next = token

			cur_token = token
			super.push(token)
		})
	}
}