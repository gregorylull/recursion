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
       findEnd(
  6. values
     - if string === 'true' 'false'   // NOT double quote
     - if string === 0 - 9        
     - if string === undefined        // NOT in valid JSON
     - if string === null

*******************************************************************************/

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // your code goes here
};
