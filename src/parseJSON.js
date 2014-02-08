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

  OR

  Create an array

*******************************************************************************/

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
    // currentIndex
    var currentIndex = 0;
    
    // helperfunctions
    
    // returns true if array or object container has opening and ending
    var hasContainerEnd = function (openBraceOrBracket, currentIndex) {
	var closedBraceOrBracket = (openBraceOrBracket === "[" ? "]" : "}");
	var currentChar = openBraceOrBracket;
	var withinDoubleQuotes = false;
	var containerOpened = 0, containerClosed = 0;

        do {
	    if (!withinDoubleQuotes) {
		if (currentChar === openBraceOrBracket) {
		    containerOpened++;
		} else if (currentChar === closedBraceOrBracket) {
		    containerClosed++;
		}
	    } else if (currentChar === '"') {
		withinDoubleQuotes = !withinDoubleQuotes;
	    }
	    
	    currentChar = json[++currentIndex];
	    
	} while (currentChar && containerOpened !== containerClosed);

	return containerOpened === containerClosed;
    };

    // [ [], [], [] ];
    var recursiveFunc (jsonChar, currentIndex, containerBegnningIndex, endOfContainerIndex) {
    // if beginng of array, check for an end, returns array and its contens
        if (jsonChar === "[" && hasContainerEnd(jsonChar, currentIndex)) {
            return [ recursiveFunc(json.substring(currentIndex + 1, ), currentIndex + 1 ];
        }
    };
};
