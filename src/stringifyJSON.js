/*
  Author: Gregory Lull
  Sate: January 2014

  Subject: implementing JSON.Stringify() using recursion

*/

/*******************************************************************************

planning / thoughts:

-----

for a simple array ['a', 'b']

can create an empty parent array that holds values [index0, index1]  

index0 = stringified 'a', index1 = stringified 'b'

  // why not just bypass array creation? add to a string instead

base cases: 
  if string -> add string to result string  // result + ', ' + string;
  if number -> add number to result string  // result + ', ' + number;
  if array -> add to result string with brackets "[" + Func(arr) + "]", Func: create parent string (''), iterate through, call function on each element
  if object -> add to result string with braces "{" 

---

Can consider implementing using a reduce function?

function stringify() {
  return reduce (object,
          function () {},
          ''
         );
}

helper functions:

stringifyPrimitiveValue;
stringifyArray;
stringifyObject;

*******************************************************************************/

var stringifyJSON = function (obj, previousString) {

  // base cases
  if (typeof obj === 'string') {
     return '\"' + obj + '\"';
  }
  
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
      return String(obj);
  }

  // recursive cases
  previousString = previousString || '';  

  // if obj === array, iterate through array and call stringify on each element
  if (Array.isArray(obj)) {
      previousString += "[";

      for (var i = 0, length = obj.length; i < length; i++) {
          if (i > 0) {
              previousString += ',';
          }
          previousString += stringifyJSON(obj[i]);
      }

      previousString += "]";
  } else {
      // if object is not an array (nor primitive types), must be an object
      previousString += "{";

      // var 'addMoreProp' is defined outside of the for-in loop as a 'counter' 
      // to remember if there are more than one property in the object
      var addMoreProp = false;

      for (var propName in obj) {
	  var propValue = obj[propName];
          if (typeof propValue !== 'function' && propValue !== undefined) {
	     
              previousString += (addMoreProp ? ',' : '');
              previousString += '\"' + propName + '\"'+ ":";
              previousString += stringifyJSON(propValue);
           
              addMoreProp = true;
          }
      }
      previousString += "}";
  }
  return previousString;
};
