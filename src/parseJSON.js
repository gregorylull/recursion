// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

/*******************************************************************************

    Planning

  1. takes in a string
     - meaning each string character has to be iterated over and compared?
  2. Separators / containers 
     - quotes ""      ["hello"]       // if double quotes, content = string
     - brackets [ ]                   // contains commas
     - braces { }                     // contains colons

     - spaces
     - colon :       {"no":"yes"}
     - comma ,       [3, 4, 5]
  3. returns the object and its parse(contents)
  4. assuming valid JSON, always will have end bracket, braches, and double quotes.
  5. helper function: 
     - find index of other end of quote?
       case: [5]
             [3,[5]]
             [{yes, "no"}, "no", [[3]]] 
             [ [ [ 3 ] ] ]
     
       findEnd(doubleQuote / brace / bracket) {
           var withDoubleQuotes = false;      // if encounter double quote, set true
           
       }
  6. values
     - if string === 'true' 'false'   // NOT double quote
     - if string === 0 - 9        
     - if string === undefined        // NOT in valid JSON
     - if string === null
  
  *update* not working

  OR

  two step recursion, convert string to object with index values, then object to final obj

    '[3, [5], [["k"]], {}]';
    [012345678901234567890]

    separators on the same level: comma

    object = {type, value, open, close, inside}
    
    type = bracket, brace, primitive, boolean

    {type: brackets, value: null, open: 0, close: 20, inside: {
      {type: primitive, value: 3, open: null, close: null, inside: null},
      {type: brackets, value: null, open: 4, close: 6, }
    } } 

    {open: 9, close: 15},
    {open: 10, close: 14}

FURTHER refinement

  Assumptions
    1. json string input is valid json string
    2. it follows that the first and last character of the string can only be
       - [ ]
       - " "
       - { }
       - ' '
    3. need helper function that splits based on commas, and pushes to an array.
    4. recursive function is then called on each element of that split array

more refining: 
    1. object splitter, should split based on first level commas, i.e.:
       '[0, {"one":1, "two":2}, [3, 4]]'
    2. need to check if comma is within double quotes, arrays, and objects
       - return an array of comma index for the string
       - String.substring will take this result and split the string

*******************************************************************************/

var firstLevelCommas = function (jsonString) {
    // if first and last char is a double quote, and assuming it is a correctly
    // formatted JSON string, then the entire quote is a string
    if (jsonString[0] === '"') {
	return [jsonString.length];
    }

    // otherwise return an array of comma indexes
    var commaArray = [];
    var openArray = 0, closeArray = 0, openObj = 0, closeObj = 0;
    var withinDoubleQuotes = false;
    var openedEqualClosed = function () {
        return !withinDoubleQuotes &&
    	   openArray === closeArray &&
    	   openObj   === closeObj;
    };

    var openOrClose = function (jsonChar) {
        if (jsonChar === '[') { openArray++; }
        else if (jsonChar === ']') { closeArray++; }
        else if (jsonChar === '{') { openObj++; }
        else if (jsonChar === '}') { closeObj++; }
    };

    // assuming first and last char of string are open/close brackets or braces
    // then we just need to check the content in between, so index = 1, and len
    // is one less than the full string length
    for (var i = 1, len = jsonString.length - 1; i < len; i++) {
        var currentChar = jsonString[i];
	console.log('currentChar:', currentChar);
        console.log(openedEqualClosed());
        if (currentChar === '"') {
    	    withinDoubleQuotes = !withinDoubleQuotes;
        } else if (openedEqualClosed() && currentChar === ",") {
     	    commaArray.push(i);
	    console.log("comma array", commaArray);

        } else if (!withinDoubleQuotes) {
    	    openOrClose(currentChar);
        }
    }
    return commaArray;
};

var arraySplitter = function (jsonString) {
    var withinDoubleQuotes = false;
    var withinObject = false;
    var sstr = '';
    var sarray = [];

    for (var i = 0, length = jsonString.length; i < length; i++) {
	var currentChar = jsonString[i];
	if (!withinDoubleQuotes && !withinObject && currentChar === ',' || currentChar === undefined) {
	    sarray.push(sstr);
	    sstr = '';
	} else if (currentChar === '"') {
	    sstr += currentChar;
	    withinDoubleQuotes = !withinDoubleQuotes;
	} else if (currentChar === '{' || currentChar === '}') {
	    
	} else {
	    sstr += currentChar;
	}
    }

    return sarray;
};

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
}
