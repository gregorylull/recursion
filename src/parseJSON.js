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

/*
   this helper function takes in a properly JSON stringifed string, and returns
   an array of first level comma indices. First level commas are commas that are 
   NOT within double quotes, array brackets, or object braces
   
// index      :  0123456789012345678901234567890123456789012
// jsonString : '[0, 1, "a, comma", {"an":2, "obj":3},[4,5]]'
// return     :  [2, 5, 17, 36]
*/
var firstLevelCommas = function (jsonString) {
    // if first and last char is a double quote, and assuming it is a correctly
    // formatted JSON string, then the entire quote is a string
    if (jsonString[0] === '"') {
	return 'string';
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
        if (currentChar === '"') {
    	    withinDoubleQuotes = !withinDoubleQuotes;
        } else if (openedEqualClosed() && currentChar === ",") {
     	    commaArray.push(i);

        } else if (!withinDoubleQuotes) {
    	    openOrClose(currentChar);
        }
    }
    return commaArray;
};

/*
  Takes in a json string and an array of index values. The json string is split
  at each index value and returns a new result object:
  {type: someType*, result: splittedArray**}

  * someType === "string" / "object" / "array"
  ** typeof splittedArray[0] === 'string'

*/
var customStringSplitter = function (jsonString, arrayOfSplitValues) {
    
    if (arrayOfSplitValues === 'string') {
	return {type: "string", result: jsonString};
    } else {
	var resultArray = [];
	var type       =  jsonString[0] === '[' || jsonString[0] === '{' ? 1 : 0;
	var startIndex = 0 + type;
	for (var i = 0, len = arrayOfSplitValues.length+1; i < len; i++) {
	    var end = arrayOfSplitValues[i] || jsonString.length - type;
	    resultArray.push(jsonString.substring(startIndex, end));
	    startIndex = end + 1;
        }
  
        var objType = jsonString[0] === '[' ? "array" : "object";
	return {type: objType, result: resultArray};
    }
};

// parses stringified object property and value and returns an object
var parseObj = function (jsonString) {
    var splitIndex = [jsonString.search(':')];
    var split = customStringSplitter(jsonString, splitIndex);
    console.log(split);
    return {property: split.result[0], value: split.result[1]};
}

// recursive function
var parseJSON = function (json) {
    if (json[0] === '"') {
	console.log('execute quote');
	return json.substring(1, json.length-1);
    } else if (json === 'true' || json === 'false') {
        console.log('execute boolean');
	return json === 'true';
    } else if (json === 'null') {
	console.log('execute null');
	return null;	
    } else if (json[0] === '[' || json[0] === '{') {
	if (json.length === 2) { return json[0] === '[' ? [] : {}; };
	var resultObj = json[0] === '[' ? [] : {};
	var commaIndex = firstLevelCommas(json);
	var afterSplit = customStringSplitter(json, commaIndex);
	var afterSplitResult = afterSplit.result;
	for (var i = 0, len = afterSplitResult.length; i < len; i++) {
	    var item = afterSplitResult[i];

            // for arrays
	    if (json[0] === '[') {
		console.log('execute arrayPush: ', item);
		resultObj.push(parseJSON(item));
	    } else {
	    // for objects
		var singleObj = parseObj(item);
		var itemProp = parseJSON(singleObj.property);
		var itemValue = parseJSON(singleObj.value);
                resultObj[itemProp] = itemValue;
		console.log('execute obj propValue: ', singleObj);
	    }
	}
	return resultObj;
	
    } else {
	console.log('execute allElse');
	return +json;
    }
};
