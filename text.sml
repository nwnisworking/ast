The IEEE 754 is a standard for storing floating point number. It consists of ***Sign***, ***Exponent*** and ***Mantissa*** bits. The most commonly used bits are **32** and **64** bits which allows to store a decimal of up to ~7.2 to ~15.9 respectively.

Here are the 3 basic components:
[data id=secret_105735432 key="test" data="test hi" items=[hi there, good morning, how are you]]

[ol end=list]
[li]Sign - The sign bit represents whether the number is a negative or positive number. 0 represents a positive number while 1 represents a negative number.
[li]Exponent - The exponent bit represents both positive and negative exponents. A bias is added to the actual exponent in order to get the stored exponent.
[li]Mantissa - The mantissa bit represents a part of a number in scientific notation or a floating-point number.
[:list]

Below contains the internal representation of the rest of the value for 16, 32 and 64 bits
[table end=tbl col=Type,Bits,Exponent,Mantissa,Bias]
[tr data=Half,16,5,10,15]
[tr data=Single,32,8,23,127]
[tr data=Double,64,11,52,1023]
[:tbl]
By knowing the exponent value, you can use it to convert to the bias value. Below are 2 examples of converting to bias value.
**Bitwise Method**
[code](1 << (exponent - 1)) - 1
**Arithmetic Method**
[code]2 ** (exponent - 1) - 1
For the demonstration, we will be using JavaScript to convert the data from floating point to an integer and vice versa.
**Converting float to number**

[code end=convert_float2num]
[color blue]const[:color] float = -123.3 
[color blue]const[:color] bits = 32 
[color blue]const[:color] expo_bits = 8
[color blue]const[:color] mantissa_bits = bits - expo_bits - 1
[color blue]const[:color] sign = !(float > 0)

[color dark_green end=cm]
/**
* variable bin will look like this.
* \[
* '1', '1', '1', '1', '0', '1', '1', '.',
* '0', '1', '0', '0', '1', '1', '0', '0',
* '1', '1', '0', '0', '1', '1', '0', '0',
* '1', '1', '0', '0', '1', '1', '0', '0',
* '1', '1', '0', '0', '1', '1', '0', '0',
* '1', '1', '0', '0', '1', '1', '0', '0',
* '1', '1', '0', '0', '1', '1'
* \]
*/

/**
* Note: For float value that is less than 1, the 1st index will be 0.
* That would also mean that the 2nd index will be a dot
* For calculating the remainder if value is less than 1, we will need to find the index
* of 1 which is in the 4th index.
*
* Example below
* 1 2 3 4 5 6 7 8 9 10
* \[ 0, ., 0, 1, 0, 0, 1, 1, 0, 0 \]
*
* Note: For float value that is more than or equal to 1,
* we will need to find which index the dot is then find the preceeding index which is 5th index
*
* Example below
* 1 2 3 4 5 6 7 8 9 10 11 12
* \[ 1, 0, 0, 1, 1, ., 0, 0, 1, 1, 0, 0 \]
*
**/
[:cm]
[color crimson]if[:color](bin.[color yellow]indexOf[:color] === 0)
	bias-= bin.[color yellow]indexOf[:color](1, 1) - 1
[color crimson]else[:color]
	bias+= bin.[color yellow]indexOf[:color]('.') - 1

bin = bin
[color dark_green] // Remove the dot from bin
.[color yellow]replace('.', '')
[color dark_green] // Remove all the 0s 
.[color yellow]substring[:color](bin.[color yellow]indexOf[:color](1) - 1)
[color dark_green] // Start from 1st index
.[color yellow]substring(1)[:color]

[color crimson]for[:color]([color blue]let[:color] i = 0; i < mantissa_bits; i++)
	[color crimson]if[:color](bin\[i\] == 1)
		value+= 2 ** (mantissa_bits - i - 1)

[color dark_green] // Adding sign to value 
value+= sign ? 2 ** (bits - 1) : 0
[color dark_green] // Adding exponent bias to value
value+= 2 ** mantissa_bits * bias

[color crimson]if[:color](bin\[mantissa_bits\] == 1)
	value+= 1
[:convert_float2num]